from app.core.schemas import AuditLogEntry


class AuditLogRepository:
    """Append-only audit log. Never edit, never delete."""

    def __init__(self) -> None:
        self._entries: list[AuditLogEntry] = []

    def append(self, entry: AuditLogEntry) -> None:
        self._entries.append(entry)

    def for_incident(self, incident_id: str) -> list[AuditLogEntry]:
        return [e for e in self._entries if e.incident_id == incident_id]

    def all(self) -> list[AuditLogEntry]:
        return list(self._entries)


_repo = AuditLogRepository()


def get_audit_repo() -> AuditLogRepository:
    return _repo
