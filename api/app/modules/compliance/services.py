from app.modules.audit.db import AuditLogRepository
from app.modules.compliance.db import CompliancePackRepository
from app.modules.compliance.schemas import NCCPack
from app.modules.incidents.db import IncidentRepository


class ComplianceService:
    def __init__(
        self,
        incidents: IncidentRepository,
        audit: AuditLogRepository,
        packs: CompliancePackRepository,
    ) -> None:
        self._incidents = incidents
        self._audit = audit
        self._packs = packs

    def build_pack(self, incident_id: str) -> NCCPack | None:
        incident = self._incidents.get(incident_id)
        if incident is None:
            return None
        pack = NCCPack(
            incident=incident,
            timeline=[],
            affected_services=[],
            kpis={},
            impacted_subscribers=incident.impact.affected_subscribers,
            root_cause="",
            corrective_actions=[],
            approval_history=self._audit.for_incident(incident_id),
            evidence_logs=[],
        )
        self._packs.upsert(pack)
        return pack
