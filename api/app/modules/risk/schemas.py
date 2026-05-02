from pydantic import BaseModel

from app.core.schemas import RiskScore


class RiskMapResponse(BaseModel):
    scores: list[RiskScore]
