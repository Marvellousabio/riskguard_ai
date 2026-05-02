"""Shared Pydantic shapes that cross domain boundaries.

These are the contracts named in docs/MVP_BLUEPRINT.md §5. They live here so
every module imports the same definition. Module-specific request/response
shapes belong in each module's `schemas.py`.
"""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


Severity = Literal["green", "amber", "red"]
IncidentPhase = Literal["active", "mitigating", "recovery", "resolved"]


class SignalEvent(BaseModel):
    event_id: str
    lga_id: str
    domain: Literal["network", "bts", "billing", "complaints", "recharge", "device_sessions"]
    kpi: str
    value: float
    timestamp: datetime


class RiskScore(BaseModel):
    lga_id: str
    score: float = Field(ge=0, le=100)
    severity: Severity
    confidence: float = Field(ge=0, le=1)
    time_to_breach_minutes: int | None = None
    updated_at: datetime


class IncidentImpact(BaseModel):
    affected_subscribers: int
    enterprise_lines: int
    revenue_at_risk_ngn: float
    compensation_exposure_ngn: float
    ncc_exposure_summary: str


class Incident(BaseModel):
    incident_id: str
    lga_id: str
    cause: str
    phase: IncidentPhase
    opened_at: datetime
    impact: IncidentImpact


class AuditLogEntry(BaseModel):
    entry_id: str
    incident_id: str
    operator: str
    action_id: str
    expected_impact: str
    rationale: str
    timestamp: datetime


class AgentFact(BaseModel):
    claim: str
    evidence_id: str


class AgentInference(BaseModel):
    claim: str
    confidence: float = Field(ge=0, le=1)


class AgentRecommendation(BaseModel):
    action: str
    requires_approval: bool = True


class AgentResponse(BaseModel):
    agent_role: str
    incident_id: str
    facts: list[AgentFact] = []
    inferences: list[AgentInference] = []
    recommendations: list[AgentRecommendation] = []
    tools_called: list[str] = []
    validation_status: Literal["passed", "revised", "rejected"] = "passed"
