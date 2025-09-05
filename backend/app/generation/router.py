from fastapi import APIRouter, HTTPException

from app.generation.client import GeminiClient
from app.generation.models import PromptRequest, TextResponse

router = APIRouter(prefix="/generate", tags=["generation"])
gemini_client = GeminiClient()


@router.post("/text", response_model=TextResponse)
async def generate_text(request: PromptRequest):
    try:
        response = await gemini_client.generate_text(request.prompt)
        return TextResponse(generated_text=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
