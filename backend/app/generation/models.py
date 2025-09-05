from pydantic import BaseModel


class PromptRequest(BaseModel):
    prompt: str


class TextResponse(BaseModel):
    generated_text: str
