# RiskGuard AI Functional Requirements

RiskGuard AI is an early-warning and decision-support system for operational telecom risk. The functional requirements below focus on what users must be able to do in the product.

## Functional Requirements

1. Users should be able to detect emerging operational risk before breach.

   The system continuously ingests multi-domain signals, correlates abnormal patterns by LGA or cluster, predicts breach probability, estimates time-to-breach, and surfaces high-risk areas on a live risk radar.

2. Users should be able to review an AI-led incident investigation.

   When risk crosses a threshold, the system opens an incident, gathers supporting evidence across network, BTS, billing, complaints, device sessions, and recharge data, identifies likely root cause, and separates facts from inferences.

3. Users should be able to quantify business, customer, and regulatory impact.

   The system estimates affected subscribers, enterprise lines, revenue at risk, compensation exposure, NCC exposure, severity, confidence, and likely escalation path.

4. Users should be able to compare mitigation options before acting.

   The system retrieves relevant playbooks, runs pre-action simulations, compares each action against a do-nothing baseline, ranks actions by projected risk reduction, confidence, and time-to-effect, and presents an approval-ready recommendation.

5. Users should be able to approve mitigation while retaining control.

   The system requires human approval before any mitigation is logged or simulated as executed, records the operator, timestamp, selected action, expected impact, and rationale, then shifts the incident into recovery tracking.

6. Users should be able to monitor whether mitigation worked.

   After approval, the system tracks actual risk trajectory against the projected trajectory, shows before and after risk reduction, and recommends escalation if the risk does not fall as expected.

7. Users should be able to ask role-specific copilot questions grounded in evidence.

   Operators can ask Network Risk, Revenue Assurance, Customer Experience, Compliance, or Mitigation agents questions, and the system answers only from structured incident context with facts, inferences, and recommendations separated.

8. Users should be able to generate an NCC-ready evidence pack.

   The system produces a compliance pack with incident timeline, affected services, KPIs, impacted subscribers, compensation estimate, root cause, corrective actions, approval history, and evidence logs.

## Non-Functional Requirements

1. The system should detect emerging risk in near real time.

   Target: detect the Ikeja incident within 30 seconds of trigger. Dashboard risk state should refresh every 5 seconds. Risk scoring should complete in under 50ms per LGA.

2. The system should provide low-latency operator workflows.

   Target API latency: p99 under 300ms for dashboard and incident APIs. Pre-action simulation should complete in under 800ms. NCC pack generation should complete in under 10 seconds.

3. The system should produce grounded, auditable AI outputs.

   The copilot must only answer from structured incident context, not raw unconstrained data. Every AI response should separate facts, inferences, and recommendations. Any claim about KPIs, subscribers, sites, money, or actions should be traceable to evidence.

4. The system should preserve human control over mitigation.

   No mitigation should execute automatically. Every action must require explicit operator approval, with the selected action, expected impact, rationale, timestamp, and actor recorded.

5. The system should maintain a complete compliance-grade audit trail.

   Every incident, risk score change, recommendation, simulation result, approval, mitigation action, and generated NCC pack should be logged in append-only form so the organization can prove what happened and when.

6. The system should protect sensitive customer and network data.

   The MVP should use no real customer PII. Data should be aggregated by LGA, cluster, segment, or enterprise count. In production, access should be role-based, secrets should be isolated, and customer-level data should only be exposed where explicitly authorized.

7. The system should run reliably without external dependencies for the demo.

   The MVP must be fully runnable offline with synthetic data. External systems like live MTN integrations, real NCC services, production OSS, or real billing systems should not be required for the demo path.

8. The system should be modular enough to replace synthetic sources with production integrations.

   Ingestion should be adapter-based so the demo generator can later be replaced by real network KPI feeds, BTS alarms, billing/CDR systems, customer complaint systems, and recharge data without rewriting the risk engine.
