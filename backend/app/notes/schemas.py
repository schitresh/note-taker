import datetime as dt

from beanie import PydanticObjectId

from app.notes.models import NoteBase


class NoteRead(NoteBase):
    id: PydanticObjectId


class NoteCreate(NoteBase):
    title: str = ""
    content: str = ""
    created_at: dt.datetime = dt.datetime.now()
    updated_at: dt.datetime = dt.datetime.now()


class NoteUpdate(NoteBase):
    title: str = ""
    content: str = ""
    updated_at: dt.datetime = dt.datetime.now()
