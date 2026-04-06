from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, status, Request
from sqlmodel import select
from typing import Optional, Dict

from config import settings
from database.schema import User, Session as UserSession
from database.engine import async_session_maker

# Redis client removed in favor of DB sessions


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRATION_DAYS)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """Decode a JWT access token."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


async def get_current_user(request: Request) -> Dict[str, str]:
    """Get current user from JWT cookie. Returns fullname and email."""
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid user"
        )

    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid user"
        )

    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid user"
        )

    async with async_session_maker() as session:
        # Validate session from database
        result = await session.execute(
            select(UserSession).where(
                UserSession.access_token == token,
                UserSession.expires_at > datetime.utcnow()
            )
        )
        db_session = result.scalars().first()

        if db_session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="invalid user"
            )

        # Get full user info
        result = await session.execute(select(User).where(User.id == db_session.user_id))
        user = result.scalars().first()

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="invalid user"
            )

        return {"fullname": user.fullname, "email": user.email, "user_id": user.id, "role": user.role}
