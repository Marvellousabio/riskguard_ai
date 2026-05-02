from pydantic import BaseModel

from app.core.schemas import AuditLogEntry


class ActionSimulateRequest(BaseModel):
    incident_id: str
    action_ids: list[str]


class ActionProjection(BaseModel):
    action_id: str
    projected_score_curve: list[float]
    confidence: float
    time_to_effect_minutes: int


class ActionSimulateResponse(BaseModel):
    incident_id: str
    do_nothing_curve: list[float]
    actions: list[ActionProjection]


class ActionApproveRequest(BaseModel):
    incident_id: str
    action_id: str
    operator: str
    expected_impact: str
    rationale: str


class ActionApproveResponse(BaseModel):
    ok: bool
    audit_entry: AuditLogEntry
