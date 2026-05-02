from fastapi import APIRouter, Depends

from app.modules.risk.db import RiskScoreRepository, get_risk_repo
from app.modules.risk.schemas import RiskMapResponse
from app.modules.risk.services import RiskService

router = APIRouter(prefix="/risk", tags=["risk"])


def get_service(repo: RiskScoreRepository = Depends(get_risk_repo)) -> RiskService:
    return RiskService(repo)


@router.get("/map", response_model=RiskMapResponse)
def get_map(service: RiskService = Depends(get_service)) -> RiskMapResponse:
    return RiskMapResponse(scores=service.get_map())
