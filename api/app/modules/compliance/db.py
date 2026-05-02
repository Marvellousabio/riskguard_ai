from app.modules.compliance.schemas import NCCPack


class CompliancePackRepository:
    def __init__(self) -> None:
        self._packs: dict[str, NCCPack] = {}

    def upsert(self, pack: NCCPack) -> None:
        self._packs[pack.incident.incident_id] = pack

    def get(self, incident_id: str) -> NCCPack | None:
        return self._packs.get(incident_id)


_repo = CompliancePackRepository()


def get_compliance_repo() -> CompliancePackRepository:
    return _repo
