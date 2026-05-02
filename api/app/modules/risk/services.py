from app.core.schemas import RiskScore
from app.modules.risk.db import RiskScoreRepository


class RiskService:
    def __init__(self, repo: RiskScoreRepository) -> None:
        self._repo = repo

    def get_map(self) -> list[RiskScore]:
        return self._repo.list_all()
