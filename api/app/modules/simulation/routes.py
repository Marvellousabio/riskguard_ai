from fastapi import APIRouter, Depends

from app.modules.simulation.db import SimulationRepository, get_simulation_repo
from app.modules.simulation.schemas import SimulationCommandResponse
from app.modules.simulation.services import SimulationService

router = APIRouter(prefix="/simulation", tags=["simulation"])


def get_service(repo: SimulationRepository = Depends(get_simulation_repo)) -> SimulationService:
    return SimulationService(repo)


@router.post("/start", response_model=SimulationCommandResponse)
def start(service: SimulationService = Depends(get_service)) -> SimulationCommandResponse:
    return SimulationCommandResponse(ok=True, status=service.start())


@router.post("/trigger/ikeja", response_model=SimulationCommandResponse)
def trigger_ikeja(service: SimulationService = Depends(get_service)) -> SimulationCommandResponse:
    return SimulationCommandResponse(ok=True, status=service.trigger_ikeja())


@router.post("/mitigate", response_model=SimulationCommandResponse)
def mitigate(service: SimulationService = Depends(get_service)) -> SimulationCommandResponse:
    return SimulationCommandResponse(ok=True, status=service.mitigate())


@router.post("/reset", response_model=SimulationCommandResponse)
def reset(service: SimulationService = Depends(get_service)) -> SimulationCommandResponse:
    return SimulationCommandResponse(ok=True, status=service.reset())
