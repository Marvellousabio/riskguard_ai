import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // --- Simulation State ---
  let simulationState = {
    status: "idle", // "idle" | "active" | "mitigating" | "recovered"
    activeIncidents: [] as { id: string; lgaId: string }[],
    startTime: Date.now(),
  };

  const LGAS = [
    { id: "agege", name: "Agege", risk: 5, timeToBreach: "N/A" },
    { id: "alimosho", name: "Alimosho", risk: 20, timeToBreach: "N/A" },
    { id: "apapa", name: "Apapa", risk: 18, timeToBreach: "N/A" },
    { id: "badagry", name: "Badagry", risk: 3, timeToBreach: "N/A" },
    { id: "epe", name: "Epe", risk: 6, timeToBreach: "N/A" },
    { id: "eti_osa", name: "Eti-Osa", risk: 10, timeToBreach: "N/A" },
    { id: "ibeju_lekki", name: "Ibeju-Lekki", risk: 4, timeToBreach: "N/A" },
    { id: "ifako_ijaiye", name: "Ifako-Ijaiye", risk: 11, timeToBreach: "N/A" },
    { id: "ikeja", name: "Ikeja", risk: 12, timeToBreach: "N/A" },
    { id: "ikorodu", name: "Ikorodu", risk: 7, timeToBreach: "N/A" },
    { id: "kosofe", name: "Kosofe", risk: 9, timeToBreach: "N/A" },
    { id: "lagos_island", name: "Lagos Island", risk: 22, timeToBreach: "N/A" },
    { id: "lagos_mainland", name: "Lagos Mainland", risk: 19, timeToBreach: "N/A" },
    { id: "mushin", name: "Mushin", risk: 14, timeToBreach: "N/A" },
    { id: "ogun_state", name: "Ogun State Border", risk: 2, timeToBreach: "N/A" },
    { id: "oshodi", name: "Oshodi", risk: 16, timeToBreach: "N/A" },
    { id: "oyo_state", name: "Oyo State Border", risk: 1, timeToBreach: "N/A" },
    { id: "shomolu", name: "Shomolu", risk: 13, timeToBreach: "N/A" },
    { id: "surulere", name: "Surulere", risk: 15, timeToBreach: "N/A" },
    { id: "yaba", name: "Yaba", risk: 17, timeToBreach: "N/A" },
  ];

  // --- API Endpoints ---

  // Simulation Controls
  app.post("/api/simulation/start", (req, res) => {
    simulationState = { status: "idle", activeIncidents: [], startTime: Date.now() };
    res.json({ status: "ok", message: "Simulation initialized" });
  });

  app.post("/api/simulation/trigger", (req, res) => {
    simulationState.status = "active";
    simulationState.activeIncidents = LGAS.map(lga => ({ id: `INC-${lga.id.toUpperCase()}-001`, lgaId: lga.id }));
    res.json({ status: "ok", message: "Incidents triggered in all LGAs" });
  });

  app.post("/api/simulation/mitigate", (req, res) => {
    simulationState.status = "mitigating";
    setTimeout(() => {
      simulationState.status = "recovered";
    }, 5000); // Transition to recovered after 5 seconds
    res.json({ status: "ok", message: "Mitigation applied" });
  });

  app.post("/api/simulation/reset", (req, res) => {
    simulationState = { status: "idle", activeIncidents: [], startTime: Date.now() };
    res.json({ status: "ok", message: "System reset" });
  });

  // Risk Radar
  app.get("/api/risk/map", (req, res) => {
    const updatedLGAs = LGAS.map((lga) => {
      const incident = simulationState.activeIncidents.find(inc => inc.lgaId === lga.id);
      if (incident && simulationState.status === "active") {
        return { ...lga, risk: 87, timeToBreach: "42m" };
      }
      if (incident && simulationState.status === "mitigating") {
        return { ...lga, risk: 45, timeToBreach: "125m" };
      }
      if (incident && simulationState.status === "recovered") {
        return { ...lga, risk: 42, timeToBreach: "N/A" };
      }
      return lga;
    });
    res.json(updatedLGAs);
  });

  // Incident Panel
  app.get("/api/incidents/:id", (req, res) => {
    const incident = simulationState.activeIncidents.find(inc => inc.id === req.params.id);
    if (!incident) {
      return res.status(404).json({ error: "No such incident" });
    }
    const lga = LGAS.find(l => l.id === incident.lgaId);
    const lgaName = lga ? lga.name : "Unknown";

    // Generate varied incident data based on LGA
    const incidentScenarios = {
      agege: {
        cause: "Power Supply Failure - Grid Transformer Overload",
        affectedSubscribers: 87500,
        enterpriseLines: 456,
        revenueAtRisk: "$8,750/hr",
        nccExposure: "High (Tier 2 Violation)",
        timeline: [
          { time: "21:45", event: "Voltage fluctuations detected at Agege Central Substation" },
          { time: "21:52", event: "Transformer temperature exceeded 85°C threshold" },
          { time: "21:58", event: "Emergency generator failed to engage automatically" },
          { time: "22:02", event: "Incident triggered: NCC Alert Level Yellow" },
          { time: "22:08", event: "Backup power source activated manually" }
        ]
      },
      alimosho: {
        cause: "Cable Theft - Copper Wire Vandals",
        affectedSubscribers: 156200,
        enterpriseLines: 892,
        revenueAtRisk: "$15,620/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "22:15", event: "Signal loss detected on Alimosho feeder line" },
          { time: "22:18", event: "Ground crew reported cable damage 3km from exchange" },
          { time: "22:22", event: "Security cameras captured vandalism incident" },
          { time: "22:25", event: "Incident triggered: NCC Alert Level Red" },
          { time: "22:30", event: "Emergency fiber restoration team dispatched" }
        ]
      },
      apapa: {
        cause: "Port Crane Accident - Heavy Equipment Damage",
        affectedSubscribers: 98400,
        enterpriseLines: 1247,
        revenueAtRisk: "$18,480/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "21:30", event: "Container crane malfunction reported at APM Terminal" },
          { time: "21:35", event: "Fiber optic cables severed by falling container" },
          { time: "21:40", event: "Port operations suspended pending safety inspection" },
          { time: "21:45", event: "Incident triggered: NCC Alert Level Red" },
          { time: "22:00", event: "Alternative routing established via satellite link" }
        ]
      },
      badagry: {
        cause: "Weather Related - Heavy Rain Flooding",
        affectedSubscribers: 32100,
        enterpriseLines: 89,
        revenueAtRisk: "$3,210/hr",
        nccExposure: "Medium (Tier 3 Violation)",
        timeline: [
          { time: "23:10", event: "Heavy rainfall detected in Badagry area" },
          { time: "23:15", event: "Water ingress reported at underground junction box" },
          { time: "23:20", event: "Lightning strike damaged surge protector" },
          { time: "23:25", event: "Incident triggered: NCC Alert Level Yellow" },
          { time: "23:35", event: "Drainage team dispatched to clear water accumulation" }
        ]
      },
      epe: {
        cause: "Undersea Cable Fault - Marine Activity",
        affectedSubscribers: 45200,
        enterpriseLines: 234,
        revenueAtRisk: "$6,780/hr",
        nccExposure: "High (Tier 2 Violation)",
        timeline: [
          { time: "20:45", event: "Subsea cable monitoring system reported anomalies" },
          { time: "20:50", event: "Signal degradation detected on Epe-Lagos underwater link" },
          { time: "20:55", event: "Marine vessel activity confirmed in cable zone" },
          { time: "21:00", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "21:15", event: "Divers deployed for underwater cable inspection" }
        ]
      },
      eti_osa: {
        cause: "VIP Area Congestion - Event Overload",
        affectedSubscribers: 187600,
        enterpriseLines: 2156,
        revenueAtRisk: "$28,140/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "19:00", event: "Massive data surge detected in Eti-Osa district" },
          { time: "19:05", event: "VIP event at Eko Atlantic caused bandwidth saturation" },
          { time: "19:10", event: "DDoS-like traffic patterns identified" },
          { time: "19:15", event: "Incident triggered: NCC Alert Level Red" },
          { time: "19:25", event: "Emergency bandwidth allocation from reserve pools" }
        ]
      },
      ibeju_lekki: {
        cause: "Construction Damage - Road Works",
        affectedSubscribers: 28600,
        enterpriseLines: 145,
        revenueAtRisk: "$2,860/hr",
        nccExposure: "Low (Tier 4 Violation)",
        timeline: [
          { time: "14:30", event: "Road construction crew damaged overhead cables" },
          { time: "14:35", event: "Fiber optic strands severed by excavator" },
          { time: "14:40", event: "Local traffic disruption reported" },
          { time: "14:45", event: "Incident triggered: NCC Alert Level Yellow" },
          { time: "15:00", event: "Temporary wireless backup established" }
        ]
      },
      ifako_ijaiye: {
        cause: "Equipment Failure - Router Overheating",
        affectedSubscribers: 72300,
        enterpriseLines: 378,
        revenueAtRisk: "$7,230/hr",
        nccExposure: "Medium (Tier 3 Violation)",
        timeline: [
          { time: "16:20", event: "Temperature sensors reported overheating in Ifako-Ijaiye exchange" },
          { time: "16:25", event: "Router CPU utilization exceeded 95%" },
          { time: "16:30", event: "Automatic failover failed due to configuration error" },
          { time: "16:35", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "16:45", event: "Cooling system maintenance crew dispatched" }
        ]
      },
      ikeja: {
        cause: "Backbone Fiber Link Cut (Main-One Subsea Secondary)",
        affectedSubscribers: 145800,
        enterpriseLines: 967,
        revenueAtRisk: "$14,580/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "22:04", event: "Anomalous latency detected on Ikeja Node-4" },
          { time: "22:06", event: "Packet loss exceeded 15% threshold" },
          { time: "22:08", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "22:12", event: "Redundancy systems engaged automatically" },
          { time: "22:18", event: "Microwave backup link activated" }
        ]
      },
      ikorodu: {
        cause: "Animal Damage - Rodent Infestation",
        affectedSubscribers: 56800,
        enterpriseLines: 267,
        revenueAtRisk: "$5,680/hr",
        nccExposure: "Medium (Tier 3 Violation)",
        timeline: [
          { time: "03:15", event: "Cable damage detected in underground duct" },
          { time: "03:20", event: "Rodent activity confirmed by inspection camera" },
          { time: "03:25", event: "Multiple fiber strands chewed through" },
          { time: "03:30", event: "Incident triggered: NCC Alert Level Yellow" },
          { time: "03:45", event: "Pest control team dispatched for eradication" }
        ]
      },
      kosofe: {
        cause: "Software Bug - Routing Protocol Flap",
        affectedSubscribers: 89400,
        enterpriseLines: 523,
        revenueAtRisk: "$8,940/hr",
        nccExposure: "High (Tier 2 Violation)",
        timeline: [
          { time: "11:30", event: "BGP routing instability detected in Kosofe network" },
          { time: "11:35", event: "Route flapping causing intermittent connectivity" },
          { time: "11:40", event: "Software update deployment identified as cause" },
          { time: "11:45", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "12:00", event: "Emergency rollback to previous software version" }
        ]
      },
      lagos_island: {
        cause: "Multiple Failures - Cascading Outage",
        affectedSubscribers: 203400,
        enterpriseLines: 1847,
        revenueAtRisk: "$30,510/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "08:00", event: "Primary power failure at Lagos Island central exchange" },
          { time: "08:05", event: "Backup generator failed to start" },
          { time: "08:10", event: "Cooling system shutdown caused equipment overheating" },
          { time: "08:15", event: "Incident triggered: NCC Alert Level Red" },
          { time: "08:25", event: "Emergency evacuation of data center initiated" },
          { time: "08:35", event: "Mobile command center established" }
        ]
      },
      lagos_mainland: {
        cause: "Human Error - Configuration Change",
        affectedSubscribers: 167300,
        enterpriseLines: 1234,
        revenueAtRisk: "$16,730/hr",
        nccExposure: "High (Tier 2 Violation)",
        timeline: [
          { time: "13:20", event: "Network configuration change deployed by mistake" },
          { time: "13:25", event: "ACL rules blocked legitimate traffic" },
          { time: "13:30", event: "Change management protocol violated" },
          { time: "13:35", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "13:45", event: "Configuration rollback initiated" }
        ]
      },
      mushin: {
        cause: "Fire Incident - Electrical Fault",
        affectedSubscribers: 112600,
        enterpriseLines: 678,
        revenueAtRisk: "$11,260/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "17:45", event: "Smoke detected in Mushin equipment room" },
          { time: "17:48", event: "Automatic fire suppression system activated" },
          { time: "17:50", event: "Electrical fire caused by faulty wiring" },
          { time: "17:52", event: "Incident triggered: NCC Alert Level Red" },
          { time: "18:00", event: "Fire department arrived on scene" },
          { time: "18:15", event: "Water damage assessment initiated" }
        ]
      },
      oshodi: {
        cause: "Traffic Accident - Utility Pole Collision",
        affectedSubscribers: 138900,
        enterpriseLines: 756,
        revenueAtRisk: "$13,890/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "07:30", event: "Commercial vehicle collided with utility pole" },
          { time: "07:32", event: "Overhead fiber cables severed by impact" },
          { time: "07:35", event: "Emergency services responded to accident scene" },
          { time: "07:37", event: "Incident triggered: NCC Alert Level Red" },
          { time: "07:45", event: "Traffic diversion implemented by local authorities" },
          { time: "08:00", event: "Temporary cable repair completed" }
        ]
      },
      shomolu: {
        cause: "Hardware Failure - Switch Failure",
        affectedSubscribers: 76200,
        enterpriseLines: 423,
        revenueAtRisk: "$7,620/hr",
        nccExposure: "Medium (Tier 3 Violation)",
        timeline: [
          { time: "10:15", event: "Core switch failed in Shomolu data center" },
          { time: "10:20", event: "Redundant switch failed simultaneously" },
          { time: "10:25", event: "Hardware diagnostics revealed manufacturing defect" },
          { time: "10:30", event: "Incident triggered: NCC Alert Level Orange" },
          { time: "10:45", event: "Hot swap replacement initiated" }
        ]
      },
      surulere: {
        cause: "Cyber Attack - DDoS Assault",
        affectedSubscribers: 129400,
        enterpriseLines: 891,
        revenueAtRisk: "$12,940/hr",
        nccExposure: "Critical (Tier 1 Violation)",
        timeline: [
          { time: "04:00", event: "Unusual traffic patterns detected globally" },
          { time: "04:05", event: "DDoS attack confirmed targeting Surulere infrastructure" },
          { time: "04:10", event: "Traffic volume exceeded 10Gbps threshold" },
          { time: "04:15", event: "Incident triggered: NCC Alert Level Red" },
          { time: "04:25", event: "DDoS mitigation systems activated" },
          { time: "04:40", event: "Attack source tracing initiated" }
        ]
      },
      yaba: {
        cause: "Building Collapse - Structural Damage",
        affectedSubscribers: 95600,
        enterpriseLines: 567,
        revenueAtRisk: "$9,560/hr",
        nccExposure: "High (Tier 2 Violation)",
        timeline: [
          { time: "12:30", event: "Building collapse reported in Yaba commercial district" },
          { time: "12:32", event: "Underground fiber ducts crushed by debris" },
          { time: "12:35", event: "Emergency rescue operations commenced" },
          { time: "12:37", event: "Incident triggered: NCC Alert Level Red" },
          { time: "13:00", event: "Structural engineers assessed damage extent" },
          { time: "13:15", event: "Cable recovery operations planned" }
        ]
      }
    };

    const scenario = incidentScenarios[lga?.id as keyof typeof incidentScenarios] || incidentScenarios.ikeja;

    res.json({
      id: req.params.id,
      cause: scenario.cause,
      riskScore: simulationState.status === "active" ? 87 : (simulationState.status === "mitigating" ? 45 : 24),
      timeToBreach: simulationState.status === "active" ? "42m" : (simulationState.status === "mitigating" ? "125m" : "N/A"),
      affectedSubscribers: scenario.affectedSubscribers,
      enterpriseLines: scenario.enterpriseLines,
      revenueAtRisk: scenario.revenueAtRisk,
      nccExposure: scenario.nccExposure,
      phase: simulationState.status === "recovered" ? "recovery" : "active",
      timeline: scenario.timeline
    });
  });

  // Copilot Panel
  app.post("/api/copilot/query", (req, res) => {
    const { role, query } = req.body;
    const firstIncident = simulationState.activeIncidents[0];
    const lga = firstIncident ? LGAS.find(l => l.id === firstIncident.lgaId) : null;
    const lgaName = lga ? lga.name : "Ikeja";

    const copilotResponses = {
      agege: {
        facts: `Agege Central Substation is experiencing complete power failure. Backup generators offline. ${lgaName} network serving 87,500 subscribers completely down. Temperature monitoring shows transformer at 95°C before shutdown.`,
        inferences: "Power grid overload likely caused by simultaneous high-demand events in multiple districts. Emergency protocols failed to engage backup systems. Risk of permanent equipment damage if power not restored within 2 hours.",
        recommendations: "1. Deploy mobile generator units to Agege substation immediately. 2. Implement rolling power restoration starting with critical infrastructure. 3. Coordinate with local electricity distribution company for grid stabilization. 4. Prepare contingency plans for extended outage scenario.",
        tools_called: ["power_grid_monitor", "thermal_imaging", "backup_system_diagnostics", "load_balancing_analyzer"],
        validation_status: "Critical systems validation pending - manual override recommended"
      },
      alimosho: {
        facts: `Cable theft incident confirmed in Alimosho district. Multiple copper and fiber optic cables severed. Security footage shows organized vandalism. ${lgaName} network connectivity at 12% capacity. 156,200 subscribers affected including major enterprise clients.`,
        inferences: "Coordinated cable theft operation targeting infrastructure. Similar incidents reported in neighboring areas suggest organized criminal activity. Secondary routes compromised by physical damage to junction boxes.",
        recommendations: "1. Deploy armed security patrols to all cable routes. 2. Establish temporary wireless mesh network for critical communications. 3. File police report and coordinate with local law enforcement. 4. Implement fiber optic cable burial program in high-risk areas.",
        tools_called: ["security_camera_analysis", "cable_route_mapping", "emergency_response_coordinator", "crime_pattern_analyzer"],
        validation_status: "Validated by field security team - immediate action required"
      },
      apapa: {
        facts: `Port operations incident at APM Terminal. Container crane accident severed primary and backup fiber links. Port operations suspended. ${lgaName} serving 98,400 subscribers with 85% packet loss. Enterprise MPLS services completely down.`,
        inferences: "Heavy equipment malfunction combined with inadequate cable protection. Port safety protocols violated. Risk of secondary incidents from suspended operations. Economic impact estimated at $500K/hour including port fees.",
        recommendations: "1. Establish satellite communication backup for port operations. 2. Coordinate with port authority for crane inspection and cable protection. 3. Implement redundant cable routing around heavy machinery zones. 4. Develop incident response protocol for port-related infrastructure damage.",
        tools_called: ["port_operations_monitor", "equipment_failure_analysis", "economic_impact_calculator", "safety_protocol_reviewer"],
        validation_status: "Cross-validated with port authority systems"
      },
      badagry: {
        facts: `Severe weather event affecting Badagry coastal area. Heavy rainfall and lightning strikes caused multiple infrastructure failures. ${lgaName} network experiencing intermittent connectivity. 32,100 subscribers affected with degraded service quality.`,
        inferences: "Climate change exacerbated storm intensity. Lightning protection systems inadequate for current weather patterns. Flooding compromised underground infrastructure. Risk of secondary failures from water ingress.",
        recommendations: "1. Deploy weather monitoring and early warning systems. 2. Upgrade lightning protection across all infrastructure. 3. Implement flood-resistant cable routing and junction boxes. 4. Develop weather contingency plans with meteorological department coordination.",
        tools_called: ["weather_data_analyzer", "lightning_strike_mapper", "flood_risk_assessment", "climate_impact_model"],
        validation_status: "Correlated with meteorological data - high confidence"
      },
      epe: {
        facts: `Undersea cable fault detected off Epe coastline. Marine vessel activity confirmed in protected cable zone. ${lgaName} experiencing 67% signal degradation. 45,200 subscribers affected with intermittent service loss.`,
        inferences: "Unauthorized marine operations in restricted waters. Cable protection inadequate against anchor damage. Environmental monitoring systems failed to detect vessel approach. Risk of complete cable severance if vessel movement continues.",
        recommendations: "1. Deploy marine patrol vessels to cable protection zone. 2. Establish underwater cable monitoring buoys. 3. Coordinate with maritime authorities for vessel tracking. 4. Develop subsea cable burial and protection program.",
        tools_called: ["marine_traffic_monitor", "underwater_sensor_network", "cable_integrity_scanner", "maritime_law_enforcement"],
        validation_status: "Confirmed by underwater inspection team"
      },
      eti_osa: {
        facts: `Massive bandwidth surge in Eti-Osa district. Eko Atlantic development event causing network saturation. ${lgaName} experiencing 92% capacity utilization. 187,600 subscribers affected with severe service degradation.`,
        inferences: "Unplanned high-density event overwhelmed infrastructure. Bandwidth allocation algorithms failed under extreme load. VIP security protocols conflicting with network optimization. Risk of cascading failures if load continues.",
        recommendations: "1. Implement dynamic bandwidth allocation for event zones. 2. Deploy additional capacity through satellite and microwave links. 3. Coordinate event planning with infrastructure capacity assessment. 4. Develop premium service tiers for high-density areas.",
        tools_called: ["bandwidth_utilization_tracker", "event_impact_analyzer", "capacity_planning_model", "traffic_engineering_optimizer"],
        validation_status: "Real-time monitoring validation - critical capacity exceeded"
      },
      ibeju_lekki: {
        facts: `Road construction damage to overhead infrastructure. Excavator operations severed fiber optic cables. ${lgaName} network partially down. 28,600 subscribers affected with localized outages.`,
        inferences: "Construction coordination failure. Cable marking and protection inadequate. Emergency response delayed by traffic congestion. Risk of secondary accidents from exposed infrastructure.",
        recommendations: "1. Implement construction permit coordination system. 2. Deploy underground cable conversion program. 3. Establish utility marking and protection standards. 4. Develop emergency response protocols for construction incidents.",
        tools_called: ["construction_permit_tracker", "infrastructure_mapping", "emergency_response_coordinator", "risk_assessment_model"],
        validation_status: "Field inspection confirmed - construction damage verified"
      },
      ifako_ijaiye: {
        facts: `Equipment overheating incident at Ifako-Ijaiye exchange. Router temperature exceeded safe limits. ${lgaName} experiencing service degradation. 72,300 subscribers affected with intermittent connectivity.`,
        inferences: "Cooling system failure combined with high ambient temperatures. Maintenance schedules inadequate for current load. Redundant systems failed simultaneously. Risk of permanent hardware damage if not addressed immediately.",
        recommendations: "1. Deploy emergency cooling systems to affected exchange. 2. Implement temperature monitoring and automated shutdown protocols. 3. Upgrade cooling infrastructure for climate resilience. 4. Develop predictive maintenance schedules based on usage patterns.",
        tools_called: ["thermal_monitoring_system", "equipment_health_tracker", "climate_data_analyzer", "maintenance_scheduler"],
        validation_status: "Temperature sensors validated - immediate cooling required"
      },
      ikeja: {
        facts: `${lgaName} Node-4 experiencing critical fiber link failure. Primary and secondary routes compromised. 145,800 subscribers affected with 85% packet loss. Enterprise traffic completely down for 967 accounts.`,
        inferences: "Physical fiber cut likely from construction or vandalism. Redundancy systems failing due to configuration issues. Geographic location makes ${lgaName} a critical network hub. Risk of regional outage if not contained.",
        recommendations: "1. Activate microwave failover systems immediately. 2. Dispatch emergency repair crews to affected cable routes. 3. Implement traffic rerouting through alternative network paths. 4. Notify enterprise customers with SLA compensation protocols.",
        tools_called: ["fiber_route_analyzer", "traffic_redirection_engine", "emergency_response_dispatcher", "sla_impact_calculator"],
        validation_status: "Cross-validated with multiple monitoring systems"
      },
      ikorodu: {
        facts: `Rodent infestation causing cable damage in underground ducts. Multiple fiber strands compromised. ${lgaName} network experiencing signal loss. 56,800 subscribers affected with degraded service quality.`,
        inferences: "Environmental conditions favorable for rodent proliferation. Cable protection inadequate for pest intrusion. Previous similar incidents indicate systemic vulnerability. Risk of complete cable failure if infestation spreads.",
        recommendations: "1. Deploy pest control specialists for comprehensive eradication. 2. Implement rodent-proof cable ducting systems. 3. Install pest monitoring and early warning systems. 4. Develop environmental controls for cable infrastructure.",
        tools_called: ["pest_detection_sensors", "cable_integrity_scanner", "environmental_monitor", "biological_impact_analyzer"],
        validation_status: "Pest activity confirmed by inspection cameras"
      },
      kosofe: {
        facts: `Routing protocol instability affecting Kosofe network segment. BGP route flapping causing connectivity issues. ${lgaName} experiencing intermittent service loss. 89,400 subscribers affected with 45% packet loss.`,
        inferences: "Software bug in routing protocol implementation. Configuration change introduced instability. Network convergence problems amplified by high traffic load. Risk of network partition if instability persists.",
        recommendations: "1. Implement route dampening to stabilize BGP convergence. 2. Roll back recent configuration changes. 3. Deploy network segmentation to contain instability. 4. Conduct comprehensive routing protocol audit and testing.",
        tools_called: ["bgp_route_analyzer", "protocol_debugger", "configuration_auditor", "network_stability_monitor"],
        validation_status: "Protocol analysis confirmed - routing instability verified"
      },
      lagos_island: {
        facts: `Critical infrastructure failure at Lagos Island central exchange. Complete power and cooling system failure. ${lgaName} network completely down. 203,400 subscribers affected including financial district and government offices.`,
        inferences: "Cascading failure from initial power outage. Backup systems inadequately maintained. Critical infrastructure concentration creates single point of failure. Economic impact estimated at $2M/hour including stock exchange downtime.",
        recommendations: "1. Establish emergency command center with redundant power. 2. Implement geographic distribution of critical infrastructure. 3. Develop comprehensive disaster recovery protocols. 4. Coordinate with emergency services for priority restoration.",
        tools_called: ["infrastructure_monitor", "economic_impact_calculator", "disaster_recovery_planner", "emergency_coordination_system"],
        validation_status: "Critical infrastructure status confirmed - national priority"
      },
      lagos_mainland: {
        facts: `Configuration error causing traffic blocking in Lagos Mainland. ACL rules misconfigured during maintenance. ${lgaName} experiencing selective service outages. 167,300 subscribers affected with blocked access to key services.`,
        inferences: "Change management process violated. Configuration testing inadequate. Human error compounded by lack of peer review. Risk of widespread service disruption if configuration errors propagate.",
        recommendations: "1. Implement configuration rollback to last known good state. 2. Establish mandatory change review and testing protocols. 3. Deploy automated configuration validation systems. 4. Conduct comprehensive security and access control audit.",
        tools_called: ["configuration_validator", "change_management_tracker", "access_control_analyzer", "security_audit_system"],
        validation_status: "Configuration analysis confirmed - human error identified"
      },
      mushin: {
        facts: `Fire incident in Mushin equipment room. Electrical fault caused ignition. ${lgaName} network severely compromised. 112,600 subscribers affected with complete service loss in affected areas.`,
        inferences: "Electrical system failure combined with inadequate fire suppression. Maintenance neglect contributed to fault conditions. Smoke and water damage risk to adjacent equipment. Potential for building evacuation and safety concerns.",
        recommendations: "1. Coordinate with fire department for scene assessment. 2. Implement equipment salvage and data recovery protocols. 3. Establish temporary service restoration through mobile units. 4. Conduct comprehensive electrical and fire safety audit.",
        tools_called: ["fire_damage_assessment", "electrical_fault_analyzer", "equipment_salvage_coordinator", "safety_inspection_system"],
        validation_status: "Fire department coordination confirmed - safety protocols active"
      },
      oshodi: {
        facts: `Traffic accident involving utility pole collision. Commercial vehicle impact severed overhead cables. ${lgaName} network down in affected corridor. 138,900 subscribers affected with localized outages.`,
        inferences: "High-risk corridor with inadequate pole protection. Vehicle operator error compounded by road conditions. Emergency response delayed by traffic congestion. Risk of secondary accidents from exposed live wires.",
        recommendations: "1. Coordinate with traffic authorities for accident investigation. 2. Implement pole reinforcement and cable burial programs. 3. Deploy temporary cable repair and service restoration. 4. Develop accident prevention protocols for infrastructure corridors.",
        tools_called: ["traffic_incident_analyzer", "infrastructure_protection_planner", "emergency_repair_coordinator", "accident_prevention_model"],
        validation_status: "Traffic authority coordination confirmed - accident reconstruction initiated"
      },
      shomolu: {
        facts: `Hardware failure in Shomolu data center. Core switch malfunction affecting network routing. ${lgaName} experiencing service degradation. 76,200 subscribers affected with intermittent connectivity.`,
        inferences: "Manufacturing defect in switch hardware. Quality control failure in procurement process. Redundant systems failed due to shared component issues. Risk of data center-wide failure if problem propagates.",
        recommendations: "1. Perform hot swap of failed hardware components. 2. Implement hardware redundancy and monitoring upgrades. 3. Conduct comprehensive equipment quality audit. 4. Develop predictive failure detection and prevention systems.",
        tools_called: ["hardware_diagnostic_system", "failure_analysis_engine", "quality_control_auditor", "predictive_maintenance_model"],
        validation_status: "Hardware diagnostics confirmed - component failure verified"
      },
      surulere: {
        facts: `Cybersecurity incident affecting Surulere network infrastructure. DDoS attack overwhelming capacity. ${lgaName} experiencing 78% packet loss. 129,400 subscribers affected with severe service degradation.`,
        inferences: "Coordinated cyber attack targeting network infrastructure. Attack vectors include multiple botnets and amplification techniques. Security systems overwhelmed by attack volume. Risk of lateral movement to other network segments.",
        recommendations: "1. Activate DDoS mitigation systems and traffic scrubbing. 2. Implement network segmentation to contain attack spread. 3. Coordinate with cybersecurity authorities for attack attribution. 4. Conduct comprehensive security audit and hardening.",
        tools_called: ["cyber_threat_analyzer", "ddos_mitigation_engine", "network_segmentation_tool", "security_incident_response"],
        validation_status: "Cybersecurity team validation - attack signature identified"
      },
      yaba: {
        facts: `Building collapse incident in Yaba commercial district. Structural failure compromised underground infrastructure. ${lgaName} network severely damaged. 95,600 subscribers affected with complete service loss.`,
        inferences: "Construction quality failure leading to structural collapse. Underground utilities inadequately protected. Emergency response complicated by building debris. Risk of secondary structural failures in surrounding buildings.",
        recommendations: "1. Coordinate with emergency services for structural assessment. 2. Implement cable recovery and repair protocols. 3. Establish temporary service through wireless networks. 4. Conduct infrastructure resilience audit for earthquake-prone areas.",
        tools_called: ["structural_damage_assessor", "emergency_response_coordinator", "infrastructure_recovery_planner", "resilience_audit_system"],
        validation_status: "Emergency services coordination confirmed - structural assessment initiated"
      }
    };

    const response = copilotResponses[lga?.id as keyof typeof copilotResponses] || copilotResponses.ikeja;

    res.json({
      facts: response.facts,
      inferences: response.inferences,
      recommendations: response.recommendations,
      tools_called: response.tools_called,
      validation_status: response.validation_status
    });
  });

  // Mitigation Panel
  app.post("/api/actions/simulate", (req, res) => {
    const firstIncident = simulationState.activeIncidents[0];
    const lga = firstIncident ? LGAS.find(l => l.id === firstIncident.lgaId) : null;
    const lgaName = lga ? lga.name : "Ikeja";

    const mitigationActions = {
      agege: [
        {
          id: "power-generator-deployment",
          name: "Mobile Generator Deployment",
          riskReduction: 78,
          confidence: 0.95,
          timeToEffect: "15m",
          description: "Deploy 2MW mobile diesel generators to Agege substation with automatic failover."
        },
        {
          id: "grid-stabilization",
          name: "Grid Stabilization Coordination",
          riskReduction: 45,
          confidence: 0.88,
          timeToEffect: "30m",
          description: "Coordinate with electricity distribution company for voltage regulation and load balancing."
        },
        {
          id: "cooling-system-bypass",
          name: "Emergency Cooling Bypass",
          riskReduction: 32,
          confidence: 0.76,
          timeToEffect: "8m",
          description: "Install portable air conditioning units for critical equipment protection."
        },
        {
          id: "load-shedding-protocol",
          name: "Controlled Load Shedding",
          riskReduction: 25,
          confidence: 0.92,
          timeToEffect: "5m",
          description: "Implement selective service degradation to prevent complete system collapse."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Maintain current state. Risk projected to hit 100 in 42 minutes with permanent damage likely."
        }
      ],
      alimosho: [
        {
          id: "security-response-team",
          name: "Armed Security Response",
          riskReduction: 82,
          confidence: 0.91,
          timeToEffect: "20m",
          description: "Deploy specialized security teams to protect cable infrastructure and deter further vandalism."
        },
        {
          id: "wireless-mesh-network",
          name: "Temporary Wireless Mesh",
          riskReduction: 65,
          confidence: 0.84,
          timeToEffect: "45m",
          description: "Establish 5G wireless mesh network covering affected areas with 10Gbps aggregate capacity."
        },
        {
          id: "satellite-backup",
          name: "Satellite Communication Backup",
          riskReduction: 58,
          confidence: 0.79,
          timeToEffect: "25m",
          description: "Activate VSAT terminals for critical enterprise and government communications."
        },
        {
          id: "fiber-repair-kit",
          name: "Mobile Fiber Repair Unit",
          riskReduction: 35,
          confidence: 0.67,
          timeToEffect: "60m",
          description: "Deploy specialized repair vehicles with fusion splicing equipment for rapid cable restoration."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Maintain current state. Risk of complete infrastructure loss within 2 hours."
        }
      ],
      apapa: [
        {
          id: "satellite-port-link",
          name: "Satellite Port Connectivity",
          riskReduction: 75,
          confidence: 0.89,
          timeToEffect: "12m",
          description: "Establish dedicated satellite link for port operations and shipping communications."
        },
        {
          id: "marine-cable-repair",
          name: "Underwater Cable Repair",
          riskReduction: 68,
          confidence: 0.73,
          timeToEffect: "180m",
          description: "Deploy specialized diving team for underwater cable splicing and repair operations."
        },
        {
          id: "port-contingency-plan",
          name: "Port Operations Contingency",
          riskReduction: 52,
          confidence: 0.85,
          timeToEffect: "30m",
          description: "Implement backup communication protocols for port cranes and container tracking systems."
        },
        {
          id: "microwave-failover",
          name: "Microwave Failover Network",
          riskReduction: 45,
          confidence: 0.92,
          timeToEffect: "8m",
          description: "Activate pre-positioned microwave links for immediate traffic rerouting."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Port operations suspended. Economic loss estimated at $500K/hour."
        }
      ],
      badagry: [
        {
          id: "weather-monitoring-system",
          name: "Advanced Weather Monitoring",
          riskReduction: 55,
          confidence: 0.87,
          timeToEffect: "10m",
          description: "Deploy Doppler radar and lightning detection systems for early warning."
        },
        {
          id: "lightning-protection-upgrade",
          name: "Lightning Protection Grid",
          riskReduction: 42,
          confidence: 0.81,
          timeToEffect: "45m",
          description: "Install enhanced lightning rods and surge protectors across all infrastructure."
        },
        {
          id: "flood-resistant-routing",
          name: "Flood-Resistant Cable Routing",
          riskReduction: 38,
          confidence: 0.74,
          timeToEffect: "90m",
          description: "Elevate and protect cable routes above projected flood levels."
        },
        {
          id: "drainage-system-activation",
          name: "Emergency Drainage Systems",
          riskReduction: 28,
          confidence: 0.69,
          timeToEffect: "15m",
          description: "Activate backup pumps and drainage systems to prevent water accumulation."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Weather conditions deteriorating. Multiple failure points identified."
        }
      ],
      epe: [
        {
          id: "marine-patrol-deployment",
          name: "Marine Patrol Deployment",
          riskReduction: 72,
          confidence: 0.88,
          timeToEffect: "25m",
          description: "Deploy patrol vessels and underwater monitoring systems to cable protection zone."
        },
        {
          id: "underwater-sensor-network",
          name: "Underwater Sensor Network",
          riskReduction: 48,
          confidence: 0.76,
          timeToEffect: "35m",
          description: "Activate seabed sensors for real-time cable integrity monitoring."
        },
        {
          id: "vessel-tracking-coordination",
          name: "Maritime Coordination",
          riskReduction: 35,
          confidence: 0.82,
          timeToEffect: "20m",
          description: "Coordinate with Nigerian Ports Authority for vessel movement restrictions."
        },
        {
          id: "cable-burial-program",
          name: "Emergency Cable Burial",
          riskReduction: 29,
          confidence: 0.65,
          timeToEffect: "120m",
          description: "Deploy cable burial equipment for immediate protection of exposed segments."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Cable integrity deteriorating. Complete severance risk within 1 hour."
        }
      ],
      eti_osa: [
        {
          id: "dynamic-bandwidth-allocation",
          name: "Dynamic Bandwidth Scaling",
          riskReduction: 85,
          confidence: 0.94,
          timeToEffect: "3m",
          description: "Automatically allocate additional bandwidth from reserve pools to high-demand areas."
        },
        {
          id: "satellite-capacity-boost",
          name: "Satellite Capacity Augmentation",
          riskReduction: 68,
          confidence: 0.87,
          timeToEffect: "10m",
          description: "Activate additional transponder capacity for immediate bandwidth increase."
        },
        {
          id: "traffic-shaping-protocols",
          name: "Intelligent Traffic Shaping",
          riskReduction: 52,
          confidence: 0.91,
          timeToEffect: "5m",
          description: "Implement QoS policies to prioritize critical traffic during congestion."
        },
        {
          id: "premium-service-tier",
          name: "VIP Service Escalation",
          riskReduction: 35,
          confidence: 0.78,
          timeToEffect: "8m",
          description: "Automatically upgrade VIP customers to premium service guarantees."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Network saturation at 95%. Complete collapse imminent within 30 minutes."
        }
      ],
      ibeju_lekki: [
        {
          id: "construction-coordination",
          name: "Construction Halt Protocol",
          riskReduction: 78,
          confidence: 0.89,
          timeToEffect: "5m",
          description: "Immediate cessation of construction activities in cable corridor zones."
        },
        {
          id: "temporary-wireless-network",
          name: "Mobile Wireless Towers",
          riskReduction: 65,
          confidence: 0.83,
          timeToEffect: "30m",
          description: "Deploy portable cell towers for immediate service restoration in affected areas."
        },
        {
          id: "underground-conversion",
          name: "Emergency Cable Burial",
          riskReduction: 42,
          confidence: 0.71,
          timeToEffect: "180m",
          description: "Convert overhead cables to underground routing in construction zones."
        },
        {
          id: "utility-marking-system",
          name: "Enhanced Utility Marking",
          riskReduction: 28,
          confidence: 0.76,
          timeToEffect: "15m",
          description: "Deploy GPS-guided utility marking systems for construction crews."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Construction activities continuing. Risk of additional cable damage high."
        }
      ],
      ifako_ijaiye: [
        {
          id: "emergency-cooling-deployment",
          name: "Portable Cooling Systems",
          riskReduction: 82,
          confidence: 0.96,
          timeToEffect: "8m",
          description: "Deploy industrial cooling units to prevent equipment overheating and failure."
        },
        {
          id: "thermal-management-protocol",
          name: "Automated Thermal Shutdown",
          riskReduction: 58,
          confidence: 0.88,
          timeToEffect: "2m",
          description: "Implement temperature-based automatic shutdown to protect hardware integrity."
        },
        {
          id: "ventilation-system-repair",
          name: "HVAC System Restoration",
          riskReduction: 45,
          confidence: 0.79,
          timeToEffect: "25m",
          description: "Repair and restart air conditioning systems with backup power supply."
        },
        {
          id: "equipment-redistribution",
          name: "Load Redistribution",
          riskReduction: 32,
          confidence: 0.72,
          timeToEffect: "12m",
          description: "Automatically redistribute processing load to unaffected equipment."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Equipment temperature rising. Permanent damage risk within 20 minutes."
        }
      ],
      ikeja: [
        {
          id: "microwave-failover-zone5",
          name: "Microwave Failover (Zone 5)",
          riskReduction: 75,
          confidence: 0.94,
          timeToEffect: "4m",
          description: "Redirect critical traffic through Lagos-Island microwave links with 10Gbps capacity."
        },
        {
          id: "fiber-repair-team-dispatch",
          name: "Emergency Fiber Repair",
          riskReduction: 68,
          confidence: 0.87,
          timeToEffect: "45m",
          description: "Dispatch specialized repair crews with fusion splicing equipment to damaged cable routes."
        },
        {
          id: "traffic-rerouting-protocol",
          name: "Network Traffic Rerouting",
          riskReduction: 52,
          confidence: 0.91,
          timeToEffect: "6m",
          description: "Implement automated traffic engineering to bypass affected network segments."
        },
        {
          id: "satellite-enterprise-backup",
          name: "Enterprise Satellite Backup",
          riskReduction: 38,
          confidence: 0.83,
          timeToEffect: "12m",
          description: "Activate VSAT terminals for critical enterprise customers with SLA guarantees."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Multiple cable cuts confirmed. Complete network failure within 42 minutes."
        }
      ],
      ikorodu: [
        {
          id: "pest-control-intervention",
          name: "Specialized Pest Control",
          riskReduction: 72,
          confidence: 0.85,
          timeToEffect: "30m",
          description: "Deploy certified pest control teams with rodent-specific eradication protocols."
        },
        {
          id: "rodent-proof-ducting",
          name: "Rodent-Proof Infrastructure",
          riskReduction: 55,
          confidence: 0.78,
          timeToEffect: "120m",
          description: "Install hardened conduit systems resistant to rodent intrusion and chewing."
        },
        {
          id: "pest-monitoring-system",
          name: "Automated Pest Detection",
          riskReduction: 38,
          confidence: 0.69,
          timeToEffect: "45m",
          description: "Deploy ultrasonic sensors and cameras for early pest activity detection."
        },
        {
          id: "environmental-controls",
          name: "Habitat Modification",
          riskReduction: 25,
          confidence: 0.62,
          timeToEffect: "60m",
          description: "Implement environmental controls to make infrastructure less attractive to pests."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Rodent activity increasing. Risk of complete cable destruction within 3 hours."
        }
      ],
      kosofe: [
        {
          id: "bgp-route-dampening",
          name: "BGP Route Dampening",
          riskReduction: 78,
          confidence: 0.93,
          timeToEffect: "3m",
          description: "Implement aggressive route dampening to stabilize BGP convergence and prevent flapping."
        },
        {
          id: "configuration-rollback",
          name: "Configuration Rollback",
          riskReduction: 65,
          confidence: 0.89,
          timeToEffect: "5m",
          description: "Revert to last known stable configuration state before instability began."
        },
        {
          id: "network-segmentation",
          name: "Network Isolation Protocol",
          riskReduction: 48,
          confidence: 0.84,
          timeToEffect: "8m",
          description: "Isolate affected network segments to prevent instability propagation."
        },
        {
          id: "routing-protocol-audit",
          name: "Protocol Configuration Audit",
          riskReduction: 32,
          confidence: 0.76,
          timeToEffect: "25m",
          description: "Conduct comprehensive review of routing protocol configurations and parameters."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Route flapping intensifying. Network partition risk within 15 minutes."
        }
      ],
      lagos_island: [
        {
          id: "emergency-command-center",
          name: "Emergency Command Center",
          riskReduction: 75,
          confidence: 0.91,
          timeToEffect: "20m",
          description: "Establish fully redundant command center with independent power and communications."
        },
        {
          id: "geographic-distribution",
          name: "Infrastructure Distribution",
          riskReduction: 62,
          confidence: 0.78,
          timeToEffect: "300m",
          description: "Activate geographically distributed backup infrastructure across multiple sites."
        },
        {
          id: "disaster-recovery-activation",
          name: "Disaster Recovery Protocols",
          riskReduction: 55,
          confidence: 0.86,
          timeToEffect: "15m",
          description: "Execute comprehensive disaster recovery plan with predefined escalation procedures."
        },
        {
          id: "priority-restoration",
          name: "Critical Systems Priority",
          riskReduction: 42,
          confidence: 0.89,
          timeToEffect: "25m",
          description: "Implement selective restoration prioritizing financial and government systems."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Critical infrastructure down. Economic impact exceeding $2M/hour."
        }
      ],
      lagos_mainland: [
        {
          id: "configuration-rollback-mainland",
          name: "Configuration State Rollback",
          riskReduction: 82,
          confidence: 0.95,
          timeToEffect: "3m",
          description: "Immediate rollback to last verified configuration state with access control restoration."
        },
        {
          id: "change-management-review",
          name: "Change Management Audit",
          riskReduction: 58,
          confidence: 0.88,
          timeToEffect: "20m",
          description: "Conduct emergency review of change management processes and approval workflows."
        },
        {
          id: "automated-validation-system",
          name: "Configuration Validation",
          riskReduction: 45,
          confidence: 0.82,
          timeToEffect: "10m",
          description: "Deploy automated configuration validation and syntax checking systems."
        },
        {
          id: "security-access-review",
          name: "Access Control Audit",
          riskReduction: 32,
          confidence: 0.75,
          timeToEffect: "35m",
          description: "Comprehensive review of user permissions and access control policies."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Configuration errors propagating. Risk of widespread access control failure."
        }
      ],
      mushin: [
        {
          id: "fire-department-coordination",
          name: "Fire Department Coordination",
          riskReduction: 75,
          confidence: 0.92,
          timeToEffect: "8m",
          description: "Coordinate with fire services for damage assessment and safety clearance."
        },
        {
          id: "equipment-salvage-protocol",
          name: "Data Recovery Operations",
          riskReduction: 58,
          confidence: 0.79,
          timeToEffect: "45m",
          description: "Execute equipment salvage and data recovery protocols for damaged systems."
        },
        {
          id: "mobile-service-units",
          name: "Mobile Service Deployment",
          riskReduction: 42,
          confidence: 0.85,
          timeToEffect: "30m",
          description: "Deploy mobile communication units for temporary service restoration."
        },
        {
          id: "safety-system-audit",
          name: "Fire Safety Audit",
          riskReduction: 28,
          confidence: 0.71,
          timeToEffect: "60m",
          description: "Conduct comprehensive audit of electrical and fire suppression systems."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Fire damage spreading. Risk of building evacuation and total equipment loss."
        }
      ],
      oshodi: [
        {
          id: "traffic-authority-coordination",
          name: "Traffic Management Coordination",
          riskReduction: 68,
          confidence: 0.87,
          timeToEffect: "10m",
          description: "Coordinate with traffic authorities for accident scene management and investigation."
        },
        {
          id: "pole-reinforcement-program",
          name: "Infrastructure Reinforcement",
          riskReduction: 52,
          confidence: 0.79,
          timeToEffect: "90m",
          description: "Implement pole reinforcement and cable protection measures in high-risk corridors."
        },
        {
          id: "temporary-cable-repair",
          name: "Emergency Cable Restoration",
          riskReduction: 45,
          confidence: 0.83,
          timeToEffect: "25m",
          description: "Deploy aerial repair teams for temporary cable splicing and pole restoration."
        },
        {
          id: "accident-prevention-protocol",
          name: "Corridor Safety Measures",
          riskReduction: 32,
          confidence: 0.74,
          timeToEffect: "45m",
          description: "Install traffic barriers and warning systems to prevent future incidents."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Traffic congestion increasing. Risk of secondary accidents and prolonged outage."
        }
      ],
      shomolu: [
        {
          id: "hot-swap-hardware-replacement",
          name: "Hardware Hot Swap",
          riskReduction: 78,
          confidence: 0.94,
          timeToEffect: "5m",
          description: "Perform live hardware replacement of failed components without service interruption."
        },
        {
          id: "redundancy-system-upgrade",
          name: "Redundancy Enhancement",
          riskReduction: 55,
          confidence: 0.81,
          timeToEffect: "60m",
          description: "Upgrade redundant systems and monitoring to prevent similar failures."
        },
        {
          id: "equipment-quality-audit",
          name: "Hardware Quality Audit",
          riskReduction: 38,
          confidence: 0.73,
          timeToEffect: "45m",
          description: "Conduct comprehensive audit of equipment procurement and quality control processes."
        },
        {
          id: "predictive-monitoring-system",
          name: "Predictive Failure Detection",
          riskReduction: 25,
          confidence: 0.68,
          timeToEffect: "30m",
          description: "Implement advanced monitoring systems for early failure detection and prevention."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Hardware failure cascading. Risk of data center-wide outage within 20 minutes."
        }
      ],
      surulere: [
        {
          id: "ddos-mitigation-activation",
          name: "DDoS Mitigation Systems",
          riskReduction: 82,
          confidence: 0.96,
          timeToEffect: "3m",
          description: "Activate global DDoS scrubbing centers and traffic filtering systems."
        },
        {
          id: "network-segmentation-security",
          name: "Network Security Segmentation",
          riskReduction: 68,
          confidence: 0.89,
          timeToEffect: "8m",
          description: "Implement emergency network segmentation to contain attack spread and isolate threats."
        },
        {
          id: "cyber-threat-intelligence",
          name: "Cyber Threat Coordination",
          riskReduction: 52,
          confidence: 0.84,
          timeToEffect: "15m",
          description: "Coordinate with cybersecurity authorities for attack attribution and mitigation support."
        },
        {
          id: "security-hardening-protocol",
          name: "Emergency Security Hardening",
          riskReduction: 35,
          confidence: 0.77,
          timeToEffect: "25m",
          description: "Deploy additional security measures and update threat detection signatures."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Attack intensity increasing. Complete network compromise within 30 minutes."
        }
      ],
      yaba: [
        {
          id: "structural-assessment-coordination",
          name: "Emergency Structural Assessment",
          riskReduction: 65,
          confidence: 0.88,
          timeToEffect: "20m",
          description: "Coordinate with structural engineers and emergency services for building assessment."
        },
        {
          id: "cable-recovery-operations",
          name: "Infrastructure Recovery",
          riskReduction: 52,
          confidence: 0.79,
          timeToEffect: "120m",
          description: "Execute cable recovery and repair operations under emergency conditions."
        },
        {
          id: "wireless-network-deployment",
          name: "Emergency Wireless Network",
          riskReduction: 45,
          confidence: 0.83,
          timeToEffect: "35m",
          description: "Deploy temporary wireless infrastructure for immediate service restoration."
        },
        {
          id: "resilience-infrastructure-audit",
          name: "Infrastructure Resilience Review",
          riskReduction: 28,
          confidence: 0.71,
          timeToEffect: "90m",
          description: "Conduct comprehensive audit of infrastructure resilience against structural failures."
        },
        {
          id: "baseline",
          name: "Do-Nothing Baseline",
          riskReduction: 0,
          confidence: 1.0,
          timeToEffect: "0m",
          description: "Building debris compromising infrastructure. Risk of secondary structural failures."
        }
      ]
    };

    const actions = mitigationActions[lga?.id as keyof typeof mitigationActions] || mitigationActions.ikeja;

    res.json(actions);
  });

  app.post("/api/actions/approve", (req, res) => {
    simulationState.status = "mitigating";
    setTimeout(() => {
      simulationState.status = "recovered";
    }, 10000);
    res.json({ status: "ok", message: "Action approved and deploying" });
  });

  // Compliance Pack
  app.get("/api/compliance/pack/:id", (req, res) => {
    const incident = simulationState.activeIncidents.find(inc => inc.id === req.params.id);
    const lga = incident ? LGAS.find(l => l.id === incident.lgaId) : null;
    const lgaName = lga ? lga.name : "Ikeja";
    const siteCode = lga ? `Site-${incident.lgaId.toUpperCase()}-4` : "Site-IK-4";

    const complianceData = {
      agege: {
        timeline: "2026-05-03T21:45:00Z - 23:30:00Z",
        affectedServices: ["Power Distribution", "Network Infrastructure", "Data Centers"],
        kpis: "Power Availability: 0% | Network Uptime: 12% | Temperature Control: Failed",
        impactedSubscribers: 87500,
        rootCause: "Grid transformer overload causing cascading power failure. Emergency generators failed due to maintenance neglect. Cooling systems compromised by power loss.",
        correctiveActions: `Deployed 2MW mobile generators; Stabilized grid voltage at 225V; Restored cooling systems with backup power; Implemented automated failover protocols.`,
        evidenceLogs: "Log-ID: PWR-AGE-001 | Sensor: Voltage_Monitor_Down | Action: Generator_Activation_Successful | Log-ID: TMP-AGE-002 | Sensor: Thermal_Overload | Action: Cooling_Restoration_Complete"
      },
      alimosho: {
        timeline: "2026-05-03T22:15:00Z - 24:00:00Z",
        affectedServices: ["Copper Infrastructure", "Fiber Optics", "Wireless Backup"],
        kpis: "Cable Integrity: 23% | Signal Strength: 15% | Security Incidents: 3 Recorded",
        impactedSubscribers: 156200,
        rootCause: "Organized cable theft targeting infrastructure corridors. Security monitoring inadequate. Emergency response delayed by 45 minutes due to coordination failures.",
        correctiveActions: `Established armed security patrols; Deployed 5G wireless mesh network with 10Gbps capacity; Coordinated with law enforcement for investigation; Implemented GPS tracking for all cable routes.`,
        evidenceLogs: "Log-ID: SEC-ALM-001 | Camera: Corridor_7_Damage | Action: Security_Response_Activated | Log-ID: NET-ALM-002 | Sensor: Fiber_Loss_Complete | Action: Wireless_Failover_Engaged"
      },
      apapa: {
        timeline: "2026-05-03T21:30:00Z - 23:45:00Z",
        affectedServices: ["Port Communications", "Container Tracking", "Maritime Data"],
        kpis: "Port Operations: 0% | Container Throughput: 0 TEU | Communication Uptime: 8%",
        impactedSubscribers: 98400,
        rootCause: "Container crane malfunction causing cable severance. Port safety protocols violated. Emergency communications failed due to single point of failure in infrastructure design.",
        correctiveActions: `Activated satellite communication links for port operations; Deployed marine repair team for underwater cable restoration; Implemented redundant cable routing around heavy machinery; Enhanced safety protocols with automated shutdown systems.`,
        evidenceLogs: "Log-ID: PRT-APA-001 | Sensor: Crane_Malfunction | Action: Emergency_Shutdown_Initiated | Log-ID: NET-APA-002 | Sensor: Cable_Severance_Detected | Action: Satellite_Backup_Activated"
      },
      badagry: {
        timeline: "2026-05-03T23:10:00Z - 01:30:00Z",
        affectedServices: ["Coastal Infrastructure", "Weather Monitoring", "Emergency Communications"],
        kpis: "Signal Quality: 45% | Weather Data: Intermittent | Lightning Protection: 67% Effective",
        impactedSubscribers: 32100,
        rootCause: "Severe weather event with lightning strikes and flooding. Infrastructure not designed for current climate patterns. Drainage systems overwhelmed by unprecedented rainfall intensity.",
        correctiveActions: `Deployed advanced weather monitoring systems; Enhanced lightning protection across all sites; Implemented flood-resistant cable routing; Activated emergency drainage protocols with backup pumping systems.`,
        evidenceLogs: "Log-ID: WTH-BAD-001 | Sensor: Rainfall_150mm/hr | Action: Drainage_Activation | Log-ID: LGT-BAD-002 | Sensor: Lightning_Strike_7 | Action: Protection_System_Upgrade_Initiated"
      },
      epe: {
        timeline: "2026-05-03T20:45:00Z - 22:30:00Z",
        affectedServices: ["Undersea Communications", "Maritime Navigation", "Coastal Surveillance"],
        kpis: "Cable Integrity: 33% | Signal Loss: 67% | Marine Traffic: Disrupted",
        impactedSubscribers: 45200,
        rootCause: "Unauthorized marine vessel activity in protected cable zone. Subsea monitoring systems failed to detect vessel approach. Cable protection inadequate against anchor damage from commercial shipping.",
        correctiveActions: `Deployed marine patrol vessels to protection zone; Activated underwater sensor network for real-time monitoring; Coordinated with maritime authorities for vessel restrictions; Initiated cable burial program for vulnerable segments.`,
        evidenceLogs: "Log-ID: MAR-EPE-001 | Sensor: Vessel_Detection_Unknown | Action: Patrol_Deployment | Log-ID: CAB-EPE-002 | Sensor: Cable_Integrity_Breach | Action: Burial_Program_Initiated"
      },
      eti_osa: {
        timeline: "2026-05-03T19:00:00Z - 21:15:00Z",
        affectedServices: ["High-Density Data", "VIP Communications", "Event Infrastructure"],
        kpis: "Bandwidth Utilization: 95% | Latency: 250ms | Service Quality: Degraded",
        impactedSubscribers: 187600,
        rootCause: "Unplanned mass event in Eko Atlantic causing network saturation. Dynamic bandwidth allocation failed under extreme load. VIP service protocols conflicted with general traffic management.",
        correctiveActions: `Implemented dynamic bandwidth scaling with 300% capacity increase; Activated satellite augmentation for immediate relief; Deployed intelligent traffic shaping protocols; Established event coordination procedures with capacity assessment.`,
        evidenceLogs: "Log-ID: EVT-ETI-001 | Sensor: Bandwidth_Saturation | Action: Scaling_Protocol_Activated | Log-ID: VIP-ETI-002 | Sensor: Priority_Traffic_Delay | Action: Satellite_Backup_Engaged"
      },
      ibeju_lekki: {
        timeline: "2026-05-03T14:30:00Z - 16:45:00Z",
        affectedServices: ["Construction Zone Infrastructure", "Temporary Services", "Utility Coordination"],
        kpis: "Cable Integrity: 0% | Service Restoration: 35% | Construction Delay: 2 hours",
        impactedSubscribers: 28600,
        rootCause: "Road construction crew damaged overhead infrastructure. Utility marking systems inadequate. Emergency response delayed by traffic congestion and lack of coordination protocols.",
        correctiveActions: `Implemented immediate construction cessation in cable corridors; Deployed mobile wireless towers for service restoration; Initiated underground cable conversion program; Enhanced utility marking and coordination systems.`,
        evidenceLogs: "Log-ID: CON-IBE-001 | Sensor: Cable_Damage_Detected | Action: Construction_Halt | Log-ID: RES-IBE-002 | Sensor: Wireless_Network_Online | Action: Service_Restoration_Initiated"
      },
      ifako_ijaiye: {
        timeline: "2026-05-03T16:20:00Z - 18:00:00Z",
        affectedServices: ["Data Center Operations", "Temperature Control", "Hardware Integrity"],
        kpis: "Equipment Temperature: 85°C | System Uptime: 45% | Cooling Efficiency: 0%",
        impactedSubscribers: 72300,
        rootCause: "Cooling system failure combined with high ambient temperatures. Maintenance schedules inadequate for current climate conditions. Automated shutdown protocols failed to engage properly.",
        correctiveActions: `Deployed emergency portable cooling systems; Implemented automated thermal management protocols; Restored HVAC systems with redundant power supplies; Enhanced predictive maintenance schedules based on environmental data.`,
        evidenceLogs: "Log-ID: TMP-IFI-001 | Sensor: Temperature_Critical | Action: Emergency_Cooling_Deployed | Log-ID: SYS-IFI-002 | Sensor: Shutdown_Protocol_Failed | Action: Manual_Intervention_Required"
      },
      ikeja: {
        timeline: "2026-05-03T22:04:00Z - 23:45:00Z",
        affectedServices: ["Backbone Infrastructure", "Enterprise Networks", "Government Communications"],
        kpis: "Network Uptime: 15% | Latency: 450ms | Packet Loss: 85%",
        impactedSubscribers: 145800,
        rootCause: "Physical fiber cut accompanied by logic failure on secondary failover controller. Construction activity in unauthorized zone. Redundancy systems not adequately tested for simultaneous failure scenarios.",
        correctiveActions: `Activated microwave failover network with 10Gbps capacity; Dispatched emergency fiber repair teams with fusion splicing equipment; Implemented automated traffic rerouting protocols; Enhanced infrastructure protection and monitoring systems.`,
        evidenceLogs: "Log-ID: FIB-IKE-001 | Sensor: Optical_Loss_High | Action: Microwave_Failover_Triggered | Log-ID: NET-IKE-002 | Sensor: Route_Convergence_Failed | Action: Manual_Rerouting_Initiated"
      },
      ikorodu: {
        timeline: "2026-05-03T03:15:00Z - 05:30:00Z",
        affectedServices: ["Underground Infrastructure", "Pest Control Systems", "Environmental Monitoring"],
        kpis: "Cable Integrity: 45% | Pest Activity: High | Environmental Control: Inadequate",
        impactedSubscribers: 56800,
        rootCause: "Rodent infestation in underground duct systems. Environmental conditions favorable for pest proliferation. Cable protection inadequate for biological threats. Monitoring systems not designed for pest detection.",
        correctiveActions: `Deployed specialized pest control intervention teams; Installed rodent-proof ducting systems; Implemented automated pest monitoring with ultrasonic sensors; Enhanced environmental controls to reduce pest attraction.`,
        evidenceLogs: "Log-ID: PST-IKO-001 | Camera: Duct_Inspection_Rodent | Action: Pest_Control_Activated | Log-ID: CAB-IKO-002 | Sensor: Cable_Damage_Pattern | Action: Protection_Upgrade_Initiated"
      },
      kosofe: {
        timeline: "2026-05-03T11:30:00Z - 13:15:00Z",
        affectedServices: ["Routing Infrastructure", "Network Stability", "Configuration Management"],
        kpis: "Route Stability: 12% | Convergence Time: 450s | Packet Loss: 78%",
        impactedSubscribers: 89400,
        rootCause: "Software routing protocol bug introduced in recent update. Configuration change deployed without adequate testing. Network convergence algorithms overwhelmed by route flapping. Change management protocols violated.",
        correctiveActions: `Implemented BGP route dampening with aggressive parameters; Executed configuration rollback to stable state; Isolated affected network segments to prevent propagation; Conducted comprehensive routing protocol audit and validation.`,
        evidenceLogs: "Log-ID: BGP-KOS-001 | Sensor: Route_Flapping_Detected | Action: Dampening_Activated | Log-ID: CFG-KOS-002 | Sensor: Configuration_Change_Invalid | Action: Rollback_Initiated"
      },
      lagos_island: {
        timeline: "2026-05-03T08:00:00Z - 12:00:00Z",
        affectedServices: ["Financial Infrastructure", "Government Systems", "Critical Communications"],
        kpis: "System Availability: 0% | Economic Impact: $2M/hour | Critical Services: Down",
        impactedSubscribers: 203400,
        rootCause: "Cascading infrastructure failure from power outage. Backup systems inadequately maintained. Critical concentration of services in single geographic area. Emergency response protocols not designed for total facility failure.",
        correctiveActions: `Established emergency command center with full redundancy; Activated geographically distributed backup infrastructure; Executed comprehensive disaster recovery protocols; Coordinated priority restoration of financial and government systems.`,
        evidenceLogs: "Log-ID: PWR-LAG-001 | Sensor: Total_Power_Failure | Action: Emergency_Center_Activated | Log-ID: SYS-LAG-002 | Sensor: Critical_Systems_Down | Action: Disaster_Recovery_Initiated"
      },
      lagos_mainland: {
        timeline: "2026-05-03T13:20:00Z - 15:00:00Z",
        affectedServices: ["Access Control Systems", "Configuration Management", "Network Security"],
        kpis: "Access Success Rate: 35% | Configuration Integrity: Compromised | Security Violations: Multiple",
        impactedSubscribers: 167300,
        rootCause: "Human error in configuration change deployment. Access control lists misconfigured blocking legitimate traffic. Change management procedures bypassed. Peer review and testing protocols not followed.",
        correctiveActions: `Executed immediate configuration rollback to verified state; Implemented mandatory change review and testing protocols; Deployed automated configuration validation systems; Conducted comprehensive access control and security audit.`,
        evidenceLogs: "Log-ID: CFG-LAM-001 | Sensor: ACL_Change_Invalid | Action: Rollback_Executed | Log-ID: SEC-LAM-002 | Sensor: Access_Violations_Detected | Action: Audit_Initiated"
      },
      mushin: {
        timeline: "2026-05-03T17:45:00Z - 20:00:00Z",
        affectedServices: ["Equipment Integrity", "Fire Suppression", "Data Recovery"],
        kpis: "Equipment Status: 25% Operational | Fire Damage: Extensive | Data Integrity: At Risk",
        impactedSubscribers: 112600,
        rootCause: "Electrical fault causing fire ignition. Fire suppression systems failed to activate. Equipment protection inadequate. Emergency response delayed by building access issues.",
        correctiveActions: `Coordinated with fire department for damage assessment and safety clearance; Executed equipment salvage and data recovery protocols; Deployed mobile service units for temporary restoration; Conducted comprehensive electrical and fire safety audit.`,
        evidenceLogs: "Log-ID: FIR-MUS-001 | Sensor: Smoke_Detection_Activated | Action: Fire_Response_Coordinated | Log-ID: EQP-MUS-002 | Sensor: Equipment_Damage_Assessed | Action: Salvage_Operations_Initiated"
      },
      oshodi: {
        timeline: "2026-05-03T07:30:00Z - 10:15:00Z",
        affectedServices: ["Utility Infrastructure", "Traffic Management", "Emergency Response"],
        kpis: "Infrastructure Integrity: 0% | Traffic Flow: Blocked | Emergency Access: Restricted",
        impactedSubscribers: 138900,
        rootCause: "Commercial vehicle collision with utility pole. Infrastructure not designed to withstand impact. Emergency response complicated by accident scene congestion. Secondary safety incidents from exposed infrastructure.",
        correctiveActions: `Coordinated with traffic authorities for accident investigation and scene management; Implemented pole reinforcement and cable protection programs; Deployed emergency cable repair teams for temporary restoration; Enhanced corridor safety measures and accident prevention protocols.`,
        evidenceLogs: "Log-ID: ACC-OSH-001 | Sensor: Impact_Detection | Action: Traffic_Coordination_Initiated | Log-ID: INF-OSH-002 | Sensor: Infrastructure_Damage | Action: Repair_Teams_Dispatched"
      },
      shomolu: {
        timeline: "2026-05-03T10:15:00Z - 12:00:00Z",
        affectedServices: ["Hardware Systems", "Redundancy Infrastructure", "Quality Control"],
        kpis: "Hardware Reliability: 0% | System Uptime: 35% | Redundancy Effectiveness: Failed",
        impactedSubscribers: 76200,
        rootCause: "Manufacturing defect in core hardware components. Quality control failure in procurement process. Redundant systems failed simultaneously due to shared component vulnerabilities. Predictive monitoring systems inadequate.",
        correctiveActions: `Performed hot swap hardware replacement of failed components; Enhanced redundancy systems with diverse component sourcing; Conducted comprehensive equipment quality audit; Implemented advanced predictive failure detection and monitoring.`,
        evidenceLogs: "Log-ID: HW-SHO-001 | Sensor: Component_Failure_Detected | Action: Hot_Swap_Initiated | Log-ID: RED-SHO-002 | Sensor: Redundancy_Failure | Action: System_Upgrade_Planned"
      },
      surulere: {
        timeline: "2026-05-03T04:00:00Z - 06:30:00Z",
        affectedServices: ["Network Security", "Cyber Defense", "Threat Intelligence"],
        kpis: "Security Effectiveness: 15% | Attack Volume: 10Gbps | Threat Containment: Partial",
        impactedSubscribers: 129400,
        rootCause: "Coordinated DDoS attack overwhelming security infrastructure. Attack vectors exploited multiple vulnerabilities. Security systems not scaled for current threat levels. Response protocols delayed by multi-vector attack complexity.",
        correctiveActions: `Activated global DDoS mitigation and traffic scrubbing systems; Implemented emergency network segmentation to contain attack spread; Coordinated with cybersecurity authorities for threat intelligence and attribution; Enhanced security hardening and threat detection capabilities.`,
        evidenceLogs: "Log-ID: DDoS-SUR-001 | Sensor: Attack_Volume_Spike | Action: Mitigation_Activated | Log-ID: SEC-SUR-002 | Sensor: Threat_Containment_Initiated | Action: Authority_Coordination_Established"
      },
      yaba: {
        timeline: "2026-05-03T12:30:00Z - 16:00:00Z",
        affectedServices: ["Structural Integrity", "Infrastructure Protection", "Emergency Recovery"],
        kpis: "Structural Stability: Critical | Infrastructure Access: Blocked | Recovery Progress: 0%",
        impactedSubscribers: 95600,
        rootCause: "Building collapse compromising underground infrastructure. Construction quality failure leading to structural failure. Emergency response complicated by debris field and access restrictions. Risk assessment inadequate for urban density.",
        correctiveActions: `Coordinated with structural engineers and emergency services for assessment; Executed infrastructure recovery operations under emergency conditions; Deployed temporary wireless networks for service restoration; Conducted comprehensive infrastructure resilience audit.`,
        evidenceLogs: "Log-ID: STR-YAB-001 | Sensor: Structural_Failure_Detected | Action: Emergency_Assessment_Initiated | Log-ID: INF-YAB-002 | Sensor: Infrastructure_Compromised | Action: Recovery_Operations_Started"
      }
    };

    const data = complianceData[lga?.id as keyof typeof complianceData] || complianceData.ikeja;

    res.json({
      timeline: data.timeline,
      affectedServices: data.affectedServices,
      kpis: data.kpis,
      impactedSubscribers: data.impactedSubscribers,
      rootCause: data.rootCause,
      correctiveActions: data.correctiveActions,
      evidenceLogs: data.evidenceLogs
    });
  });

  // --- Vite & Production Server Setup ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
