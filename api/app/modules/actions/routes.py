from fastapi import APIRouter, Depends

from app.modules.actions.schemas import (
    ActionApproveRequest,
    ActionApproveResponse,
    ActionSimulateRequest,
    ActionSimulateResponse,
)
from app.modules.actions.services import ActionService
from app.modules.audit.db import AuditLogRepository, get_audit_repo

router = APIRouter(prefix="/actions", tags=["actions"])


def get_service(audit_repo: AuditLogRepository = Depends(get_audit_repo)) -> ActionService:
    return ActionService(audit_repo)


@router.post("/simulate", response_model=ActionSimulateResponse)
def simulate(
    request: ActionSimulateRequest,
    service: ActionService = Depends(get_service),
) -> ActionSimulateResponse:
    return service.simulate(request)


@router.post("/approve", response_model=ActionApproveResponse)
def approve(
    request: ActionApproveRequest,
    service: ActionService = Depends(get_service),
) -> ActionApproveResponse:
    entry = service.approve(request)
    return ActionApproveResponse(ok=True, audit_entry=entry)
