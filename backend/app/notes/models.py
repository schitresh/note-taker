import datetime as dt

from beanie import Document
from pydantic import BaseModel, Field


class NoteBase(BaseModel):
    title: str = Field(max_length=100)
    content: str = Field(max_length=1000)
    created_at: dt.datetime
    updated_at: dt.datetime


class Note(NoteBase, Document):
    pass
