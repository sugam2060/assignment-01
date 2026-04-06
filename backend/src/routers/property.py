from fastapi import APIRouter
from typing import List

from routers.property_details import HARDCODED_PROPERTIES

router = APIRouter(prefix="/api/properties", tags=["properties"])


@router.get("", response_model=List[dict])
async def get_properties():
    """Get all hardcoded properties."""
    return list(HARDCODED_PROPERTIES.values())
