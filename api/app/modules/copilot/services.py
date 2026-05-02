from app.core.schemas import AgentResponse
from app.modules.copilot.schemas import CopilotQueryRequest


class CopilotService:
    """Stub orchestrator. Engineer 4 replaces this with the real agent runtime."""

    def query(self, request: CopilotQueryRequest) -> AgentResponse:
        return AgentResponse(
            agent_role=request.role,
            incident_id=request.incident_id,
            facts=[],
            inferences=[],
            recommendations=[],
            tools_called=[],
            validation_status="passed",
        )
