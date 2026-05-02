from app.core.schemas import AuditLogEntry
from app.modules.audit.db import AuditLogRepository


class AuditService:
    def __init__(self, repo: AuditLogRepository) -> None:
        self._repo = repo

    def for_incident(self, incident_id: str) -> list[AuditLogEntry]:
        return self._repo.for_incident(incident_id)
