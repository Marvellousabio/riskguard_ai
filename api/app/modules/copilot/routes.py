from fastapi import APIRouter, Depends

from app.modules.copilot.schemas import CopilotQueryRequest, CopilotQueryResponse
from app.modules.copilot.services import CopilotService

router = APIRouter(prefix="/copilot", tags=["copilot"])


def get_service() -> CopilotService:
    return CopilotService()


@router.post("/query", response_model=CopilotQueryResponse)
def query(
    request: CopilotQueryRequest,
    service: CopilotService = Depends(get_service),
) -> CopilotQueryResponse:
    return service.query(request)
