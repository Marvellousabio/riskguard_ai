from app.core.schemas import Incident
from app.modules.incidents.db import IncidentRepository


class IncidentService:
    def __init__(self, repo: IncidentRepository) -> None:
        self._repo = repo

    def get(self, incident_id: str) -> Incident | None:
        return self._repo.get(incident_id)
