from fastapi import APIRouter, Depends, HTTPException

from app.modules.incidents.db import IncidentRepository, get_incident_repo
from app.modules.incidents.schemas import IncidentResponse
from app.modules.incidents.services import IncidentService

router = APIRouter(prefix="/incidents", tags=["incidents"])


def get_service(repo: IncidentRepository = Depends(get_incident_repo)) -> IncidentService:
    return IncidentService(repo)


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(
    incident_id: str,
    service: IncidentService = Depends(get_service),
) -> IncidentResponse:
    incident = service.get(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="incident not found")
    return incident
