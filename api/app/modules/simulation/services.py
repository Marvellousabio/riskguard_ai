from app.modules.simulation.db import SimulationRepository
from app.modules.simulation.schemas import SimulationStatus


class SimulationService:
    def __init__(self, repo: SimulationRepository) -> None:
        self._repo = repo

    def start(self) -> SimulationStatus:
        status = SimulationStatus(mode="baseline", incident_id=None)
        self._repo.set(status)
        return status

    def trigger_ikeja(self) -> SimulationStatus:
        status = SimulationStatus(mode="incident", incident_id="INC-2025-IKEJA-001")
        self._repo.set(status)
        return status

    def mitigate(self) -> SimulationStatus:
        current = self._repo.get()
        status = SimulationStatus(mode="recovery", incident_id=current.incident_id)
        self._repo.set(status)
        return status

    def reset(self) -> SimulationStatus:
        status = SimulationStatus(mode="idle", incident_id=None)
        self._repo.set(status)
        return status
