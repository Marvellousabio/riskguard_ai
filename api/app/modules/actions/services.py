from datetime import datetime, timezone
from uuid import uuid4

from app.core.schemas import AuditLogEntry
from app.modules.actions.schemas import (
    ActionApproveRequest,
    ActionProjection,
    ActionSimulateRequest,
    ActionSimulateResponse,
)
from app.modules.audit.db import AuditLogRepository


class ActionService:
    def __init__(self, audit_repo: AuditLogRepository) -> None:
        self._audit_repo = audit_repo

    def simulate(self, request: ActionSimulateRequest) -> ActionSimulateResponse:
        return ActionSimulateResponse(
            incident_id=request.incident_id,
            do_nothing_curve=[],
            actions=[
                ActionProjection(
                    action_id=action_id,
                    projected_score_curve=[],
                    confidence=0.0,
                    time_to_effect_minutes=0,
                )
                for action_id in request.action_ids
            ],
        )

    def approve(self, request: ActionApproveRequest) -> AuditLogEntry:
        entry = AuditLogEntry(
            entry_id=str(uuid4()),
            incident_id=request.incident_id,
            operator=request.operator,
            action_id=request.action_id,
            expected_impact=request.expected_impact,
            rationale=request.rationale,
            timestamp=datetime.now(timezone.utc),
        )
        self._audit_repo.append(entry)
        return entry
