from app.modules.simulation.schemas import SimulationStatus


class SimulationRepository:
    def __init__(self) -> None:
        self._status = SimulationStatus(mode="idle", incident_id=None)

    def get(self) -> SimulationStatus:
        return self._status

    def set(self, status: SimulationStatus) -> None:
        self._status = status


_repo = SimulationRepository()


def get_simulation_repo() -> SimulationRepository:
    return _repo
