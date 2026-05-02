from pydantic import BaseModel

from app.core.schemas import AuditLogEntry, Incident


class NCCPack(BaseModel):
    incident: Incident
    timeline: list[str] = []
    affected_services: list[str] = []
    kpis: dict[str, float] = {}
    impacted_subscribers: int = 0
    root_cause: str = ""
    corrective_actions: list[str] = []
    approval_history: list[AuditLogEntry] = []
    evidence_logs: list[str] = []
