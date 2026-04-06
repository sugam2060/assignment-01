from fastapi import APIRouter, HTTPException, status, Request, Depends
from sqlmodel import select
from typing import List

from database.schema import Favourite
from database.engine import get_session, AsyncSession
from utilities.jwt_utils import get_current_user
from routers.property_details import HARDCODED_PROPERTIES

router = APIRouter(prefix="/api/favourites", tags=["favourites"])


@router.get("", response_model=List[dict])
async def get_favourites(
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    """Get all favourites for the current user."""
    result = await session.execute(
        select(Favourite)
        .where(Favourite.user_id == current_user["user_id"])
    )
    favourites = result.scalars().all()
    # Return only the favorite entry ID and the property details to avoid redundancy
    response = []
    for f in favourites:
        property_details = HARDCODED_PROPERTIES.get(f.property_id)
        if property_details:
            response.append({
                "id": f.id,
                "property": property_details
            })
    return response


from pydantic import BaseModel

class FavouriteRequest(BaseModel):
    property_id: int

@router.post("", response_model=dict)
async def add_favourite(
    request: FavouriteRequest,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    """Add a property to favourites."""
    property_id = request.property_id

    # Check if property exists in hardcoded dict
    if property_id not in HARDCODED_PROPERTIES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )

    # Check if already favourited
    existing = await session.execute(
        select(Favourite)
        .where(Favourite.user_id == current_user["user_id"])
        .where(Favourite.property_id == property_id)
    )
    existing_entry = existing.scalars().first()

    if existing_entry:
        return {"success": True, "message": "Property already in favourites"}

    # Add to favourites
    favourite = Favourite(user_id=current_user["user_id"], property_id=property_id)
    session.add(favourite)
    await session.commit()

    return {"success": True, "message": "Property added to favourites"}


@router.delete("/{property_id}", response_model=dict)
async def remove_favourite(
    property_id: int,
    current_user: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    """Remove a property from favourites."""

    # Check if favourite exists
    result = await session.execute(
        select(Favourite)
        .where(Favourite.user_id == current_user["user_id"])
        .where(Favourite.property_id == property_id)
    )
    favourite = result.scalars().first()

    if not favourite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Favourite not found"
        )

    await session.delete(favourite)
    await session.commit()

    return {"success": True, "message": "Property removed from favourites"}
