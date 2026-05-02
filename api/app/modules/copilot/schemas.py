from typing import Literal

from pydantic import BaseModel

from app.core.schemas import AgentResponse


AgentRole = Literal[
    "network_risk",
    "revenue_assurance",
    "customer_experience",
    "mitigation",
    "compliance",
]


class CopilotQueryRequest(BaseModel):
    role: AgentRole
    incident_id: str
    query: str


CopilotQueryResponse = AgentResponse
