from datetime import datetime, timedelta
from database.schema import User, Session as SessionModel
from database.engine import get_session, AsyncSession
from schemas.auth_schema import RegisterRequest, LoginRequest, SuccessResponse
from utilities.auth_utils import hash_password, verify_password
from utilities.jwt_utils import create_access_token, get_current_user
from fastapi import APIRouter, HTTPException, status, Depends, Response, Request
from sqlmodel import select, delete
from config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=SuccessResponse)
async def signup(
    request: RegisterRequest,
    session: AsyncSession = Depends(get_session)
):
    """Register a new user."""
    # Check if user already exists
    result = await session.execute(select(User).where(User.email == request.email))
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="user already exist"
        )

    # Create new user
    hashed_pw = hash_password(request.password)
    user = User(
        email=request.email,
        hashed_password=hashed_pw,
        fullname=request.fullname,
        role=request.role
    )

    session.add(user)
    await session.commit()

    return SuccessResponse(success=True, message="User registered successfully")


@router.post("/signin", response_model=SuccessResponse)
async def signin(
    request: LoginRequest,
    session: AsyncSession = Depends(get_session)
):
    """Login and receive JWT token as HTTPOnly cookie."""
    # Find user by email
    result = await session.execute(select(User).where(User.email == request.email))
    user = result.scalars().first()

    if not user or not verify_password(request.password, user.hashed_password):
        return SuccessResponse(success=False, message="Invalid credentials")

    # Generate access token
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=timedelta(days=settings.ACCESS_TOKEN_EXPIRATION_DAYS)
    )
 
    # Store token in Database instead of Redis
    db_session = SessionModel(
        user_id=user.id,
        access_token=access_token,
        expires_at=datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRATION_DAYS)
    )
    session.add(db_session)
    await session.commit()

    # Create response with HTTPOnly cookie
    response = Response(
        content='{"success": true, "message": "Login successful"}',
        media_type="application/json"
    )
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRATION_DAYS * 86400,
    )

    return response


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Validate current user session and return user info."""
    return {
        "success": True,
        "user": current_user
    }


@router.post("/logout")
async def logout(
    response: Response, 
    request: Request, 
    session: AsyncSession = Depends(get_session)
):
    """Logout current user by deleting the access_token cookie and DB session."""
    token = request.cookies.get("access_token")
    if token:
        # Delete session from database
        await session.execute(
            delete(SessionModel).where(SessionModel.access_token == token)
        )
        await session.commit()

    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
    )
    return {"success": True, "message": "Logged out successfully"}
