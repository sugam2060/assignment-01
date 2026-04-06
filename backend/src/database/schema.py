from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    fullname: str
    role: str = Field(default="user")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    favourites: list["Favourite"] = Relationship(back_populates="user")


class Favourite(SQLModel, table=True):
    __tablename__ = "favourites"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    property_id: int = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="favourites")

    # Unique constraint on (user_id, property_id)
    __table_args__ = (
        None,
    )


class Session(SQLModel, table=True):
    __tablename__ = "sessions"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    access_token: str = Field(index=True)
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
