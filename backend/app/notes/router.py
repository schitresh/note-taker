from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from app.notes.models import Note
from app.notes.schemas import NoteCreate, NoteRead, NoteUpdate

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("", response_model=list[NoteRead])
async def list_notes():
    notes = await Note.find().to_list()
    return notes


@router.get("/{note_id}", response_model=NoteRead)
async def read_note(note_id: PydanticObjectId):
    note = await Note.find_one(Note.id == note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.post("", response_model=NoteRead)
async def create_note(note_data: NoteCreate):
    note = Note(**note_data.model_dump())
    await note.insert()
    return note


@router.put("/{note_id}", response_model=NoteRead)
async def update_note(note_id: PydanticObjectId, note_data: NoteUpdate):
    note = await read_note(note_id)
    note_data = note_data.model_dump(exclude_unset=True)
    await note.set(note_data)
    return note


@router.delete("/{note_id}")
async def delete_note(note_id: PydanticObjectId):
    note = await read_note(note_id)
    await note.delete()
