// Mock API for Vercel deployment
const getSimulationState = () => {
  try {
    const stored = localStorage.getItem('simulationState');
    return stored ? JSON.parse(stored) : {
      status: "idle",
      activeIncidents: [],
      startTime: Date.now(),
    };
  } catch (e) {
    console.warn('Failed to load simulation state from localStorage:', e);
    return {
      status: "idle",
      activeIncidents: [],
      startTime: Date.now(),
    };
  }
};

const setSimulationState = (state: any) => {
  try {
    localStorage.setItem('simulationState', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save simulation state to localStorage:', e);
  }
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
  { id: "oshodi", name: "Oshodi", risk: 16, timeToBreach: "N/A" },
  { id: "shomolu", name: "Shomolu", risk: 13, timeToBreach: "N/A" },
  { id: "surulere", name: "Surulere", risk: 15, timeToBreach: "N/A" },
  { id: "yaba", name: "Yaba", risk: 17, timeToBreach: "N/A"   },
];

const mockIncidents: Record<string, Incident> = {
  agege: {
    id: "INC-AGEGE-001",
    cause: "Power Supply Failure - Grid Transformer Overload",
    riskScore: 82,
    timeToBreach: "35m",
    affectedSubscribers: 87500,
    enterpriseLines: 456,
    revenueAtRisk: "$8,750/hr",
    nccExposure: "High (Tier 2 Violation)",
    phase: "active",
    timeline: [
      { time: "21:45", event: "Voltage fluctuations detected at Agege Central Substation" },
      { time: "21:52", event: "Transformer temperature exceeded 85°C threshold" },
      { time: "21:58", event: "Emergency generator failed to engage automatically" },
      { time: "22:02", event: "Incident triggered: NCC Alert Level Yellow" },
      { time: "22:08", event: "Backup power source activated manually" }
    ]
  },
  alimosho: {
    id: "INC-ALIMOSHO-001",
    cause: "Cable Theft - Copper Wire Vandals",
    riskScore: 89,
    timeToBreach: "28m",
    affectedSubscribers: 156200,
    enterpriseLines: 892,
    revenueAtRisk: "$15,620/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
    timeline: [
      { time: "22:15", event: "Signal loss detected on Alimosho feeder line" },
      { time: "22:18", event: "Ground crew reported cable damage 3km from exchange" },
      { time: "22:22", event: "Security cameras captured vandalism incident" },
      { time: "22:25", event: "Incident triggered: NCC Alert Level Red" },
      { time: "22:30", event: "Emergency fiber restoration team dispatched" }
    ]
  },
  apapa: {
    id: "INC-APAPA-001",
    cause: "Port Crane Accident - Heavy Equipment Damage",
    riskScore: 91,
    timeToBreach: "22m",
    affectedSubscribers: 98400,
    enterpriseLines: 1247,
    revenueAtRisk: "$18,480/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
    timeline: [
      { time: "21:30", event: "Container crane malfunction reported at APM Terminal" },
      { time: "21:35", event: "Fiber optic cables severed by falling container" },
      { time: "21:40", event: "Port operations suspended pending safety inspection" },
      { time: "21:45", event: "Incident triggered: NCC Alert Level Red" },
      { time: "22:00", event: "Alternative routing established via satellite link" }
    ]
  },
  badagry: {
    id: "INC-BADAGRY-001",
    cause: "Weather Related - Heavy Rain Flooding",
    riskScore: 65,
    timeToBreach: "85m",
    affectedSubscribers: 32100,
    enterpriseLines: 89,
    revenueAtRisk: "$3,210/hr",
    nccExposure: "Medium (Tier 3 Violation)",
    phase: "active",
    timeline: [
      { time: "23:10", event: "Heavy rainfall detected in Badagry area" },
      { time: "23:15", event: "Water ingress reported at underground junction box" },
      { time: "23:20", event: "Lightning strike damaged surge protector" },
      { time: "23:25", event: "Incident triggered: NCC Alert Level Yellow" },
      { time: "23:35", event: "Drainage team dispatched to clear water accumulation" }
    ]
  },
  epe: {
    id: "INC-EPE-001",
    cause: "Undersea Cable Fault - Marine Activity",
    riskScore: 78,
    timeToBreach: "52m",
    affectedSubscribers: 45200,
    enterpriseLines: 234,
    revenueAtRisk: "$6,780/hr",
    nccExposure: "High (Tier 2 Violation)",
    phase: "active",
    timeline: [
      { time: "20:45", event: "Subsea cable monitoring system reported anomalies" },
      { time: "20:50", event: "Signal degradation detected on Epe-Lagos underwater link" },
      { time: "20:55", event: "Marine vessel activity confirmed in cable zone" },
      { time: "21:00", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "21:15", event: "Divers deployed for underwater cable inspection" }
    ]
  },
  eti_osa: {
    id: "INC-ETI_OSA-001",
    cause: "VIP Area Congestion - Event Overload",
    riskScore: 94,
    timeToBreach: "18m",
    affectedSubscribers: 187600,
    enterpriseLines: 2156,
    revenueAtRisk: "$28,140/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
    timeline: [
      { time: "19:00", event: "Massive data surge detected in Eti-Osa district" },
      { time: "19:05", event: "VIP event at Eko Atlantic caused bandwidth saturation" },
      { time: "19:10", event: "DDoS-like traffic patterns identified" },
      { time: "19:15", event: "Incident triggered: NCC Alert Level Red" },
      { time: "19:25", event: "Emergency bandwidth allocation from reserve pools" }
    ]
  },
  ibeju_lekki: {
    id: "INC-IBEJU_LEKKI-001",
    cause: "Construction Damage - Road Works",
    riskScore: 58,
    timeToBreach: "95m",
    affectedSubscribers: 28600,
    enterpriseLines: 145,
    revenueAtRisk: "$2,860/hr",
    nccExposure: "Low (Tier 4 Violation)",
    phase: "active",
    timeline: [
      { time: "14:30", event: "Road construction crew damaged overhead cables" },
      { time: "14:35", event: "Fiber optic strands severed by excavator" },
      { time: "14:40", event: "Local traffic disruption reported" },
      { time: "14:45", event: "Incident triggered: NCC Alert Level Yellow" },
      { time: "15:00", event: "Temporary wireless backup established" }
    ]
  },
  ifako_ijaiye: {
    id: "INC-IFAKO_IJAIYE-001",
    cause: "Equipment Failure - Router Overheating",
    riskScore: 72,
    timeToBreach: "68m",
    affectedSubscribers: 72300,
    enterpriseLines: 378,
    revenueAtRisk: "$7,230/hr",
    nccExposure: "Medium (Tier 3 Violation)",
    phase: "active",
    timeline: [
      { time: "16:20", event: "Temperature sensors reported overheating in Ifako-Ijaiye exchange" },
      { time: "16:25", event: "Router CPU utilization exceeded 95%" },
      { time: "16:30", event: "Automatic failover failed due to configuration error" },
      { time: "16:35", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "16:45", event: "Cooling system maintenance crew dispatched" }
    ]
  },
  ikeja: {
    id: "INC-IKEJA-001",
    cause: "Backbone Fiber Link Cut (Main-One Subsea Secondary)",
    riskScore: 87,
    timeToBreach: "42m",
    affectedSubscribers: 145800,
    enterpriseLines: 967,
    revenueAtRisk: "$14,580/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
    timeline: [
      { time: "22:04", event: "Anomalous latency detected on Ikeja Node-4" },
      { time: "22:06", event: "Packet loss exceeded 15% threshold" },
      { time: "22:08", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "22:12", event: "Redundancy systems engaged automatically" },
      { time: "22:18", event: "Microwave backup link activated" }
    ]
  },
  ikorodu: {
    id: "INC-IKORODU-001",
    cause: "Animal Damage - Rodent Infestation",
    riskScore: 69,
    timeToBreach: "78m",
    affectedSubscribers: 56800,
    enterpriseLines: 267,
    revenueAtRisk: "$5,680/hr",
    nccExposure: "Medium (Tier 3 Violation)",
    phase: "active",
    timeline: [
      { time: "03:15", event: "Cable damage detected in underground duct" },
      { time: "03:20", event: "Rodent activity confirmed by inspection camera" },
      { time: "03:25", event: "Multiple fiber strands chewed through" },
      { time: "03:30", event: "Incident triggered: NCC Alert Level Yellow" },
      { time: "03:45", event: "Pest control team dispatched for eradication" }
    ]
  },
  kosofe: {
    id: "INC-KOSOFE-001",
    cause: "Software Bug - Routing Protocol Flap",
    riskScore: 76,
    timeToBreach: "58m",
    affectedSubscribers: 89400,
    enterpriseLines: 523,
    revenueAtRisk: "$8,940/hr",
    nccExposure: "High (Tier 2 Violation)",
    phase: "active",
    timeline: [
      { time: "11:30", event: "BGP routing instability detected in Kosofe network" },
      { time: "11:35", event: "Route flapping causing intermittent connectivity" },
      { time: "11:40", event: "Software update deployment identified as cause" },
      { time: "11:45", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "12:00", event: "Emergency rollback to previous software version" }
    ]
  },
  lagos_island: {
    id: "INC-LAGOS_ISLAND-001",
    cause: "Multiple Failures - Cascading Outage",
    riskScore: 95,
    timeToBreach: "15m",
    affectedSubscribers: 203400,
    enterpriseLines: 1847,
    revenueAtRisk: "$30,510/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
    timeline: [
      { time: "08:00", event: "Primary power failure at Lagos Island central exchange" },
      { time: "08:05", event: "Backup generator failed to start" },
      { time: "08:10", event: "Cooling system shutdown caused equipment overheating" },
      { time: "08:15", event: "Incident triggered: NCC Alert Level Red" },
      { time: "08:25", event: "Emergency evacuation of data center initiated" }
    ]
  },
  lagos_mainland: {
    id: "INC-LAGOS_MAINLAND-001",
    cause: "Human Error - Configuration Change",
    riskScore: 83,
    timeToBreach: "48m",
    affectedSubscribers: 167300,
    enterpriseLines: 1234,
    revenueAtRisk: "$16,730/hr",
    nccExposure: "High (Tier 2 Violation)",
    phase: "active",
    timeline: [
      { time: "13:20", event: "Network configuration change deployed by mistake" },
      { time: "13:25", event: "ACL rules blocked legitimate traffic" },
      { time: "13:30", event: "Change management protocol violated" },
      { time: "13:35", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "13:45", event: "Configuration rollback initiated" }
    ]
  },
  mushin: {
    id: "INC-MUSHIN-001",
    cause: "Fire Incident - Electrical Fault",
    riskScore: 88,
    timeToBreach: "38m",
    affectedSubscribers: 112600,
    enterpriseLines: 678,
    revenueAtRisk: "$11,260/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
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
    id: "INC-OSHODI-001",
    cause: "Traffic Accident - Utility Pole Collision",
    riskScore: 81,
    timeToBreach: "50m",
    affectedSubscribers: 138900,
    enterpriseLines: 756,
    revenueAtRisk: "$13,890/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
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
    id: "INC-SHOMOLU-001",
    cause: "Hardware Failure - Switch Failure",
    riskScore: 74,
    timeToBreach: "62m",
    affectedSubscribers: 76200,
    enterpriseLines: 423,
    revenueAtRisk: "$7,620/hr",
    nccExposure: "Medium (Tier 3 Violation)",
    phase: "active",
    timeline: [
      { time: "10:15", event: "Core switch failed in Shomolu data center" },
      { time: "10:20", event: "Redundant switch failed simultaneously" },
      { time: "10:25", event: "Hardware diagnostics revealed manufacturing defect" },
      { time: "10:30", event: "Incident triggered: NCC Alert Level Orange" },
      { time: "10:45", event: "Hot swap replacement initiated" }
    ]
  },
  surulere: {
    id: "INC-SURULERE-001",
    cause: "Cyber Attack - DDoS Assault",
    riskScore: 92,
    timeToBreach: "25m",
    affectedSubscribers: 129400,
    enterpriseLines: 891,
    revenueAtRisk: "$12,940/hr",
    nccExposure: "Critical (Tier 1 Violation)",
    phase: "active",
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
    id: "INC-YABA-001",
    cause: "Building Collapse - Structural Damage",
    riskScore: 79,
    timeToBreach: "54m",
    affectedSubscribers: 95600,
    enterpriseLines: 567,
    revenueAtRisk: "$9,560/hr",
    nccExposure: "High (Tier 2 Violation)",
    phase: "active",
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

const mockApi = {
  get: (url: string) => {
    if (url === "/risk/map") {
      try {
        const simulationState = getSimulationState();
        const updatedLGAs = LGAS.map((lga) => {
          try {
            const incident = simulationState.activeIncidents.find((inc: any) => inc.lgaId === lga.id);
            if (incident && simulationState.status === "active") {
              // Get risk score and time to breach from incident data
              const incidentData = mockIncidents[lga.id as keyof typeof mockIncidents];
              if (incidentData) {
                return {
                  ...lga,
                  risk: incidentData.riskScore,
                  timeToBreach: incidentData.timeToBreach
                };
              }
            }
            if (incident && simulationState.status === "mitigating") {
              return { ...lga, risk: 45, timeToBreach: "125m" };
            }
            if (incident && simulationState.status === "recovered") {
              return { ...lga, risk: 42, timeToBreach: "N/A" };
            }
            return lga;
          } catch (e) {
            console.warn('Error processing LGA:', lga.id, e);
            return lga;
          }
        });
        return Promise.resolve({ data: updatedLGAs });
      } catch (e) {
        console.error('Error in /risk/map endpoint:', e);
        return Promise.reject(new Error('Failed to load risk map'));
      }
    }
    if (url.startsWith("/incidents/")) {
      try {
        const incidentId = url.split("/").pop();
        const lgaId = incidentId?.split("-")[1]?.toLowerCase();
        const simulationState = getSimulationState();
        const phase = simulationState.status === "recovered" ? "recovery" : "active";
        const riskScore = simulationState.status === "active" ? 87 : (simulationState.status === "mitigating" ? 45 : 24);
        const timeToBreach = simulationState.status === "active" ? "42m" : (simulationState.status === "mitigating" ? "125m" : "N/A");


        return Promise.resolve({ data: mockIncidents[lgaId || "ikeja"] || mockIncidents.ikeja });
      } catch (e) {
        console.error('Error in /incidents endpoint:', e);
        return Promise.reject(new Error('Failed to load incident data'));
      }
    }
    if (url.startsWith("/compliance/pack/")) {
      try {
        const incidentId = url.split("/compliance/pack/")[1];
        const lgaId = incidentId?.split("-")[1]?.toLowerCase();
        const mockCompliancePacks: Record<string, CompliancePack> = {
          agege: {
            lgaName: "Agege",
            timeline: "21:45 - Voltage fluctuations detected\n21:52 - Transformer temperature exceeded 85°C\n21:58 - Emergency generator failed to engage\n22:02 - Incident triggered: NCC Alert Level Yellow\n22:08 - Backup power source activated manually",
            affectedServices: ["Voice Services", "Data Services", "Internet Access", "Enterprise MPLS"],
            kpis: "Service Availability: 0%\nPacket Loss: 100%\nLatency: N/A\nThroughput: 0 Mbps\nAffected Subscribers: 87,500",
            impactedSubscribers: 87500,
            rootCause: "Power Supply Failure - Grid Transformer Overload causing complete power failure at Agege Central Substation. Backup generators failed to engage automatically due to maintenance oversight.",
            correctiveActions: "1. Deploy mobile generator units to restore power\n2. Implement rolling power restoration protocol\n3. Coordinate with electricity distribution company\n4. Perform preventive maintenance on backup systems",
            evidenceLogs: "Thermal sensor logs: Transformer temp 95°C\nGenerator diagnostic: Fuel system failure\nVoltage monitor: Complete power loss at 21:45\nSecurity camera: Emergency protocols not followed"
          },
          alimosho: {
            lgaName: "Alimosho",
            timeline: "22:15 - Signal loss detected on Alimosho feeder line\n22:18 - Ground crew reported cable damage 3km from exchange\n22:22 - Security cameras captured vandalism incident\n22:25 - Incident triggered: NCC Alert Level Red\n22:30 - Emergency fiber restoration team dispatched",
            affectedServices: ["Broadband Internet", "VoIP Services", "Enterprise Connectivity", "Mobile Backhaul"],
            kpis: "Service Availability: 15%\nPacket Loss: 85%\nLatency: 250ms\nThroughput: 2 Mbps\nAffected Subscribers: 156,200",
            impactedSubscribers: 156200,
            rootCause: "Cable Theft - Copper Wire Vandals severed multiple fiber optic cables in Alimosho district. Coordinated vandalism targeting infrastructure corridors with organized criminal activity.",
            correctiveActions: "1. Deploy armed security patrols to cable routes\n2. Establish temporary wireless mesh network\n3. File police report and coordinate with law enforcement\n4. Implement fiber optic cable burial program",
            evidenceLogs: "Security footage: Organized vandalism at 22:22\nCable integrity monitor: Multiple strand breaks detected\nGround crew report: 3km cable damage confirmed\nTraffic analysis: 85% packet loss across all services"
          },
          apapa: {
            lgaName: "Apapa",
            timeline: "21:30 - Container crane malfunction reported at APM Terminal\n21:35 - Fiber optic cables severed by falling container\n21:40 - Port operations suspended pending safety inspection\n21:45 - Incident triggered: NCC Alert Level Red\n22:00 - Alternative routing established via satellite link",
            affectedServices: ["Port Communications", "Shipping Systems", "Container Tracking", "Enterprise Services"],
            kpis: "Service Availability: 25%\nPacket Loss: 75%\nLatency: 180ms\nThroughput: 5 Mbps\nAffected Subscribers: 98,400",
            impactedSubscribers: 98400,
            rootCause: "Port Crane Accident - Heavy Equipment Damage severed primary and backup fiber links at APM Terminal. Container crane malfunction caused falling debris damage to cable infrastructure.",
            correctiveActions: "1. Establish satellite communication backup for port operations\n2. Coordinate with port authority for crane inspection\n3. Implement redundant cable routing around heavy machinery\n4. Develop incident response protocol for port-related damage",
            evidenceLogs: "Port authority report: Crane malfunction at 21:30\nCable damage assessment: Both primary and backup links severed\nSatellite link activation: Alternative routing established at 22:00\nEconomic impact: $500K/hour port operation losses"
          },
          badagry: {
            lgaName: "Badagry",
            timeline: "23:10 - Heavy rainfall detected in Badagry area\n23:15 - Water ingress reported at underground junction box\n23:20 - Lightning strike damaged surge protector\n23:25 - Incident triggered: NCC Alert Level Yellow\n23:35 - Drainage team dispatched to clear water accumulation",
            affectedServices: ["Residential Broadband", "Public WiFi", "Basic Voice Services"],
            kpis: "Service Availability: 60%\nPacket Loss: 40%\nLatency: 95ms\nThroughput: 15 Mbps\nAffected Subscribers: 32,100",
            impactedSubscribers: 32100,
            rootCause: "Weather Related - Heavy Rain Flooding caused water ingress at underground junction boxes. Lightning strikes compounded damage to surge protection systems.",
            correctiveActions: "1. Deploy weather monitoring and early warning systems\n2. Upgrade lightning protection across all infrastructure\n3. Implement flood-resistant cable routing\n4. Develop weather contingency plans with meteorological coordination",
            evidenceLogs: "Weather station data: 150mm rainfall in 2 hours\nLightning detection: Multiple strikes recorded\nWater ingress sensors: Junction box flooding confirmed\nService restoration: Gradual recovery as water recedes"
          },
          epe: {
            lgaName: "Epe",
            timeline: "20:45 - Subsea cable monitoring system reported anomalies\n20:50 - Signal degradation detected on Epe-Lagos underwater link\n20:55 - Marine vessel activity confirmed in cable zone\n21:00 - Incident triggered: NCC Alert Level Orange\n21:15 - Divers deployed for underwater cable inspection",
            affectedServices: ["Undersea Connectivity", "Coastal Broadband", "Maritime Communications"],
            kpis: "Service Availability: 45%\nPacket Loss: 55%\nLatency: 320ms\nThroughput: 8 Mbps\nAffected Subscribers: 45,200",
            impactedSubscribers: 45200,
            rootCause: "Undersea Cable Fault - Marine Activity caused damage to underwater fiber optic cables off Epe coastline. Unauthorized vessel activity in protected cable zones.",
            correctiveActions: "1. Deploy marine patrol vessels to cable protection zone\n2. Establish underwater cable monitoring buoys\n3. Coordinate with maritime authorities for vessel tracking\n4. Develop subsea cable burial and protection program",
            evidenceLogs: "Underwater sensors: Cable integrity compromised\nVessel tracking: Unauthorized activity in protected zone\nSignal monitoring: Degradation started at 20:50\nDiver inspection: Physical damage to cable sheath confirmed"
          },
          eti_osa: {
            lgaName: "Eti-Osa",
            timeline: "19:00 - Massive data surge detected in Eti-Osa district\n19:05 - VIP event at Eko Atlantic caused bandwidth saturation\n19:10 - DDoS-like traffic patterns identified\n19:15 - Incident triggered: NCC Alert Level Red\n19:25 - Emergency bandwidth allocation from reserve pools",
            affectedServices: ["High-Speed Broadband", "Enterprise Services", "Mobile Data", "Streaming Services"],
            kpis: "Service Availability: 35%\nPacket Loss: 65%\nLatency: 280ms\nThroughput: 12 Mbps\nAffected Subscribers: 187,600",
            impactedSubscribers: 187600,
            rootCause: "VIP Area Congestion - Event Overload at Eko Atlantic development overwhelmed network infrastructure. Unplanned high-density event caused bandwidth saturation and service degradation.",
            correctiveActions: "1. Implement dynamic bandwidth allocation for event zones\n2. Deploy additional capacity through satellite and microwave links\n3. Coordinate event planning with infrastructure capacity assessment\n4. Develop premium service tiers for high-density areas",
            evidenceLogs: "Traffic analysis: 95% bandwidth utilization\nEvent monitoring: Eko Atlantic VIP event confirmed\nQoS systems: Emergency allocation activated\nCustomer complaints: Service degradation reports across all tiers"
          },
          ibeju_lekki: {
            lgaName: "Ibeju-Lekki",
            timeline: "14:30 - Road construction crew damaged overhead cables\n14:35 - Fiber optic strands severed by excavator\n14:40 - Local traffic disruption reported\n14:45 - Incident triggered: NCC Alert Level Yellow\n15:00 - Temporary wireless backup established",
            affectedServices: ["Residential Internet", "Local Voice Services", "Community WiFi"],
            kpis: "Service Availability: 70%\nPacket Loss: 30%\nLatency: 75ms\nThroughput: 20 Mbps\nAffected Subscribers: 28,600",
            impactedSubscribers: 28600,
            rootCause: "Construction Damage - Road Works caused excavator to sever overhead fiber optic cables. Construction coordination failure and inadequate cable marking contributed to incident.",
            correctiveActions: "1. Implement construction permit coordination system\n2. Deploy underground cable conversion program\n3. Establish utility marking and protection standards\n4. Develop emergency response protocols for construction incidents",
            evidenceLogs: "Construction permit: No utility marking coordination\nCable damage report: Multiple fiber strands severed\nTraffic monitoring: Local disruption confirmed\nWireless backup: Temporary service restored at 15:00"
          },
          ifako_ijaiye: {
            lgaName: "Ifako-Ijaiye",
            timeline: "16:20 - Temperature sensors reported overheating in Ifako-Ijaiye exchange\n16:25 - Router CPU utilization exceeded 95%\n16:30 - Automatic failover failed due to configuration error\n16:35 - Incident triggered: NCC Alert Level Orange\n16:45 - Cooling system maintenance crew dispatched",
            affectedServices: ["Broadband Services", "Enterprise Connectivity", "VoIP Systems"],
            kpis: "Service Availability: 55%\nPacket Loss: 45%\nLatency: 120ms\nThroughput: 18 Mbps\nAffected Subscribers: 72,300",
            impactedSubscribers: 72300,
            rootCause: "Equipment Failure - Router Overheating caused by cooling system failure and high ambient temperatures. Automatic failover systems failed due to configuration errors.",
            correctiveActions: "1. Deploy emergency cooling systems to affected exchange\n2. Implement temperature monitoring and automated shutdown protocols\n3. Upgrade cooling infrastructure for climate resilience\n4. Develop predictive maintenance schedules based on usage patterns",
            evidenceLogs: "Thermal sensors: Router temp exceeded 85°C\nCPU monitoring: 95% utilization sustained\nCooling system: Failure confirmed at 16:20\nConfiguration audit: Failover settings incorrect"
          },
          ikeja: {
            lgaName: "Ikeja",
            timeline: "22:04 - Anomalous latency detected on Ikeja Node-4\n22:06 - Packet loss exceeded 15% threshold\n22:08 - Incident triggered: NCC Alert Level Orange\n22:12 - Redundancy systems engaged automatically\n22:18 - Microwave backup link activated",
            affectedServices: ["Core Network Services", "Internet Backbone", "Enterprise MPLS", "Mobile Networks"],
            kpis: "Service Availability: 40%\nPacket Loss: 60%\nLatency: 200ms\nThroughput: 10 Mbps\nAffected Subscribers: 145,800",
            impactedSubscribers: 145800,
            rootCause: "Backbone Fiber Link Cut - Physical damage to primary and secondary fiber routes serving Ikeja Node-4. Likely construction or vandalism related cable severance.",
            correctiveActions: "1. Activate microwave failover systems immediately\n2. Dispatch emergency repair crews to affected cable routes\n3. Implement automated traffic rerouting through alternative network paths\n4. Notify enterprise customers with SLA compensation protocols",
            evidenceLogs: "Network monitoring: Latency spike at 22:04\nPacket analysis: 60% loss on primary routes\nRedundancy activation: Automatic failover at 22:12\nMicrowave link: Backup activated at 22:18"
          },
          ikorodu: {
            lgaName: "Ikorodu",
            timeline: "03:15 - Cable damage detected in underground duct\n03:20 - Rodent activity confirmed by inspection camera\n03:25 - Multiple fiber strands chewed through\n03:30 - Incident triggered: NCC Alert Level Yellow\n03:45 - Pest control team dispatched for eradication",
            affectedServices: ["Residential Broadband", "Local Business Services", "Community Networks"],
            kpis: "Service Availability: 65%\nPacket Loss: 35%\nLatency: 85ms\nThroughput: 22 Mbps\nAffected Subscribers: 56,800",
            impactedSubscribers: 56800,
            rootCause: "Animal Damage - Rodent Infestation caused damage to underground fiber optic cables. Environmental conditions favorable for rodent proliferation with inadequate cable protection.",
            correctiveActions: "1. Deploy pest control specialists for comprehensive eradication\n2. Implement rodent-proof cable ducting systems\n3. Install pest monitoring and early warning systems\n4. Develop environmental controls for cable infrastructure",
            evidenceLogs: "Inspection camera: Rodent activity confirmed\nCable damage assessment: Multiple fiber strands affected\nPest monitoring: Environmental conditions favorable\nService impact: Gradual degradation over 24 hours"
          },
          kosofe: {
            lgaName: "Kosofe",
            timeline: "11:30 - BGP routing instability detected in Kosofe network\n11:35 - Route flapping causing intermittent connectivity\n11:40 - Software update deployment identified as cause\n11:45 - Incident triggered: NCC Alert Level Orange\n12:00 - Emergency rollback to previous software version",
            affectedServices: ["Internet Routing", "Enterprise WAN", "Cloud Connectivity"],
            kpis: "Service Availability: 50%\nPacket Loss: 50%\nLatency: 150ms\nThroughput: 16 Mbps\nAffected Subscribers: 89,400",
            impactedSubscribers: 89400,
            rootCause: "Software Bug - Routing Protocol Flap caused by recent software update deployment. BGP route flapping created network instability and connectivity issues.",
            correctiveActions: "1. Implement route dampening to stabilize BGP convergence\n2. Roll back recent configuration changes\n3. Deploy network segmentation to contain instability\n4. Conduct comprehensive routing protocol audit and testing",
            evidenceLogs: "BGP monitoring: Route flapping detected\nSoftware deployment: Update installed at 11:00\nNetwork analysis: Instability correlated with update\nRollback execution: Previous version restored at 12:00"
          },
          lagos_island: {
            lgaName: "Lagos Island",
            timeline: "08:00 - Primary power failure at Lagos Island central exchange\n08:05 - Backup generator failed to start\n08:10 - Cooling system shutdown caused equipment overheating\n08:15 - Incident triggered: NCC Alert Level Red\n08:25 - Emergency evacuation of data center initiated",
            affectedServices: ["Financial Services", "Government Networks", "Enterprise Critical Systems", "Stock Exchange"],
            kpis: "Service Availability: 5%\nPacket Loss: 95%\nLatency: N/A\nThroughput: 1 Mbps\nAffected Subscribers: 203,400",
            impactedSubscribers: 203400,
            rootCause: "Multiple Failures - Cascading Outage from primary power failure compounded by backup system failures and cooling system shutdown. Critical infrastructure single point of failure.",
            correctiveActions: "1. Establish emergency command center with redundant power\n2. Implement geographic distribution of critical infrastructure\n3. Develop comprehensive disaster recovery protocols\n4. Coordinate with emergency services for priority restoration",
            evidenceLogs: "Power monitoring: Complete failure at 08:00\nGenerator diagnostics: Startup failure confirmed\nThermal sensors: Equipment overheating at 08:10\nEconomic impact: $2M/hour losses estimated"
          },
          lagos_mainland: {
            lgaName: "Lagos Mainland",
            timeline: "13:20 - Network configuration change deployed by mistake\n13:25 - ACL rules blocked legitimate traffic\n13:30 - Change management protocol violated\n13:35 - Incident triggered: NCC Alert Level Orange\n13:45 - Configuration rollback initiated",
            affectedServices: ["Corporate Networks", "Enterprise Services", "Government Communications"],
            kpis: "Service Availability: 45%\nPacket Loss: 55%\nLatency: 190ms\nThroughput: 14 Mbps\nAffected Subscribers: 167,300",
            impactedSubscribers: 167300,
            rootCause: "Human Error - Configuration Change deployed without proper testing or review. ACL rules misconfigured blocking legitimate traffic and violating change management protocols.",
            correctiveActions: "1. Implement configuration rollback to last known good state\n2. Establish mandatory change review and testing protocols\n3. Deploy automated configuration validation systems\n4. Conduct comprehensive security and access control audit",
            evidenceLogs: "Configuration audit: ACL rules deployed at 13:20\nTraffic monitoring: Legitimate traffic blocked\nChange logs: Protocol violation confirmed\nRollback execution: Previous config restored at 13:45"
          },
          mushin: {
            lgaName: "Mushin",
            timeline: "17:45 - Smoke detected in Mushin equipment room\n17:48 - Automatic fire suppression system activated\n17:50 - Electrical fire caused by faulty wiring\n17:52 - Incident triggered: NCC Alert Level Red\n18:00 - Fire department arrived on scene\n18:15 - Water damage assessment initiated",
            affectedServices: ["Voice Communications", "Data Services", "Internet Connectivity", "Enterprise Links"],
            kpis: "Service Availability: 20%\nPacket Loss: 80%\nLatency: 350ms\nThroughput: 4 Mbps\nAffected Subscribers: 112,600",
            impactedSubscribers: 112600,
            rootCause: "Fire Incident - Electrical Fault caused ignition in equipment room. Faulty wiring combined with inadequate fire suppression response and maintenance neglect.",
            correctiveActions: "1. Coordinate with fire department for scene assessment\n2. Implement equipment salvage and data recovery protocols\n3. Establish temporary service restoration through mobile units\n4. Conduct comprehensive electrical and fire safety audit",
            evidenceLogs: "Smoke detectors: Activation at 17:45\nFire suppression: Automatic system engaged\nElectrical inspection: Faulty wiring identified\nDamage assessment: Water and smoke damage confirmed"
          },
          oshodi: {
            lgaName: "Oshodi",
            timeline: "07:30 - Commercial vehicle collided with utility pole\n07:32 - Overhead fiber cables severed by impact\n07:35 - Emergency services responded to accident scene\n07:37 - Incident triggered: NCC Alert Level Red\n07:45 - Traffic diversion implemented by local authorities\n08:00 - Temporary cable repair completed",
            affectedServices: ["Transport Hub Communications", "Logistics Networks", "Enterprise Services"],
            kpis: "Service Availability: 30%\nPacket Loss: 70%\nLatency: 240ms\nThroughput: 6 Mbps\nAffected Subscribers: 138,900",
            impactedSubscribers: 138900,
            rootCause: "Traffic Accident - Utility Pole Collision by commercial vehicle severed overhead fiber cables. High-risk corridor with inadequate pole protection and emergency response delays.",
            correctiveActions: "1. Coordinate with traffic authorities for accident investigation\n2. Implement pole reinforcement and cable burial programs\n3. Deploy temporary cable repair and service restoration\n4. Develop accident prevention protocols for infrastructure corridors",
            evidenceLogs: "Traffic camera: Vehicle collision at 07:30\nCable damage: Overhead lines severed\nEmergency response: Traffic diversion at 07:45\nRepair completion: Temporary restoration at 08:00"
          },
          shomolu: {
            lgaName: "Shomolu",
            timeline: "10:15 - Core switch failed in Shomolu data center\n10:20 - Redundant switch failed simultaneously\n10:25 - Hardware diagnostics revealed manufacturing defect\n10:30 - Incident triggered: NCC Alert Level Orange\n10:45 - Hot swap replacement initiated",
            affectedServices: ["Network Switching", "Data Center Services", "Cloud Connectivity"],
            kpis: "Service Availability: 55%\nPacket Loss: 45%\nLatency: 130ms\nThroughput: 19 Mbps\nAffected Subscribers: 76,200",
            impactedSubscribers: 76200,
            rootCause: "Hardware Failure - Switch Failure due to manufacturing defect affecting redundant systems simultaneously. Quality control failure in procurement and inadequate monitoring.",
            correctiveActions: "1. Perform hot swap of failed hardware components\n2. Implement hardware redundancy and monitoring upgrades\n3. Conduct comprehensive equipment quality audit\n4. Develop predictive failure detection and prevention systems",
            evidenceLogs: "Hardware diagnostics: Manufacturing defect confirmed\nRedundancy test: Simultaneous failure detected\nProcurement audit: Quality control bypassed\nReplacement: Hot swap completed at 10:45"
          },
          surulere: {
            lgaName: "Surulere",
            timeline: "04:00 - Unusual traffic patterns detected globally\n04:05 - DDoS attack confirmed targeting Surulere infrastructure\n04:10 - Traffic volume exceeded 10Gbps threshold\n04:15 - Incident triggered: NCC Alert Level Red\n04:25 - DDoS mitigation systems activated\n04:40 - Attack source tracing initiated",
            affectedServices: ["Internet Services", "Web Hosting", "Enterprise Security", "Cloud Services"],
            kpis: "Service Availability: 25%\nPacket Loss: 75%\nLatency: 400ms\nThroughput: 3 Mbps\nAffected Subscribers: 129,400",
            impactedSubscribers: 129400,
            rootCause: "Cyber Attack - DDoS Assault overwhelmed network infrastructure with coordinated botnet attack. Security systems inadequate for current threat landscape and attack volumes.",
            correctiveActions: "1. Activate DDoS mitigation systems and traffic scrubbing\n2. Implement network segmentation to contain attack spread\n3. Coordinate with cybersecurity authorities for attack attribution\n4. Conduct comprehensive security audit and hardening",
            evidenceLogs: "Traffic analysis: 10Gbps attack volume\nAttack pattern: Botnet signatures identified\nSecurity systems: Mitigation activated at 04:25\nSource tracing: International attack vectors confirmed"
          },
          yaba: {
            lgaName: "Yaba",
            timeline: "12:30 - Building collapse reported in Yaba commercial district\n12:32 - Underground fiber ducts crushed by debris\n12:35 - Emergency rescue operations commenced\n12:37 - Incident triggered: NCC Alert Level Red\n13:00 - Structural engineers assessed damage extent\n13:15 - Cable recovery operations planned",
            affectedServices: ["Educational Networks", "Research Facilities", "Student Housing", "Campus Services"],
            kpis: "Service Availability: 15%\nPacket Loss: 85%\nLatency: 500ms\nThroughput: 2 Mbps\nAffected Subscribers: 95,600",
            impactedSubscribers: 95600,
            rootCause: "Building Collapse - Structural Damage crushed underground fiber optic ducts. Construction quality failure led to structural collapse affecting buried infrastructure.",
            correctiveActions: "1. Coordinate with emergency services for structural assessment\n2. Implement cable recovery and repair protocols\n3. Establish temporary service through wireless networks\n4. Conduct infrastructure resilience audit for earthquake-prone areas",
            evidenceLogs: "Emergency reports: Building collapse at 12:30\nStructural assessment: Debris damage confirmed\nCable inspection: Underground ducts crushed\nRecovery planning: Operations initiated at 13:15"
          }
        };
        return Promise.resolve({ data: mockCompliancePacks[lgaId || "ikeja"] || mockCompliancePacks.ikeja });
      } catch (e) {
        console.error('Error in /compliance/pack endpoint:', e);
        return Promise.reject(new Error('Failed to load compliance pack'));
      }
    }
    return Promise.reject(new Error("Not implemented"));
  },
  post: (url: string, data?: any) => {
    if (url === "/simulation/start") {
      try {
        const newState = { status: "idle", activeIncidents: [], startTime: Date.now() };
        setSimulationState(newState);
        return Promise.resolve({ data: { status: "ok", message: "Simulation initialized" } });
      } catch (e) {
        console.error('Error in /simulation/start:', e);
        return Promise.reject(new Error('Failed to start simulation'));
      }
    }
    if (url === "/simulation/trigger") {
      try {
        const currentState = getSimulationState();
        const newState = {
          ...currentState,
          status: "active",
          activeIncidents: LGAS.map(lga => ({ id: `INC-${lga.id.toUpperCase()}-001`, lgaId: lga.id }))
        };
        setSimulationState(newState);
        return Promise.resolve({ data: { status: "ok", message: "Incidents triggered in all LGAs" } });
      } catch (e) {
        console.error('Error in /simulation/trigger:', e);
        return Promise.reject(new Error('Failed to trigger incidents'));
      }
    }
    if (url === "/simulation/mitigate") {
      try {
        const currentState = getSimulationState();
        const newState = { ...currentState, status: "mitigating" };
        setSimulationState(newState);
        // Simulate recovery after delay
        setTimeout(() => {
          try {
            const recoveredState = { ...getSimulationState(), status: "recovered" };
            setSimulationState(recoveredState);
          } catch (e) {
            console.warn('Error during recovery simulation:', e);
          }
        }, 10000);
        return Promise.resolve({ data: { status: "ok", message: "Action approved and deploying" } });
      } catch (e) {
        console.error('Error in /simulation/mitigate:', e);
        return Promise.reject(new Error('Failed to apply mitigation'));
      }
    }
    if (url === "/simulation/reset") {
      try {
        const newState = { status: "idle", activeIncidents: [], startTime: Date.now() };
        setSimulationState(newState);
        return Promise.resolve({ data: { status: "ok", message: "System reset" } });
      } catch (e) {
        console.error('Error in /simulation/reset:', e);
        return Promise.reject(new Error('Failed to reset simulation'));
      }
    }
    if (url === "/copilot/query") {
      const { incident_id } = data || {};
      const lgaId = incident_id ? incident_id.split('-')[1].toLowerCase() : 'ikeja';
      const copilotResponses: Record<string, any> = {
        agege: {
          facts: "Agege Central Substation experiencing complete power failure. Backup generators offline. 87,500 subscribers completely down. Temperature monitoring shows transformer at 95°C before shutdown.",
          inferences: "Grid transformer overload causing cascading power failure. Emergency protocols failed to engage backup systems. Risk of permanent equipment damage if power not restored within 2 hours.",
          recommendations: "1. Deploy mobile generator units to Agege substation immediately. 2. Implement rolling power restoration starting with critical infrastructure. 3. Coordinate with local electricity distribution company for grid stabilization. 4. Prepare contingency plans for extended outage scenario.",
          tools_called: ["power_grid_monitor", "thermal_imaging", "backup_system_diagnostics", "load_balancing_analyzer"],
          validation_status: "Critical systems validation pending - manual override recommended"
        },
        alimosho: {
          facts: "Cable theft incident confirmed in Alimosho district. Multiple copper and fiber optic cables severed. Security footage shows organized vandalism. 156,200 subscribers affected including major enterprise clients.",
          inferences: "Coordinated cable theft operation targeting infrastructure corridors. Similar incidents reported in neighboring areas suggest organized criminal activity. Secondary routes compromised by physical damage to junction boxes.",
          recommendations: "1. Deploy armed security patrols to all cable routes. 2. Establish temporary wireless mesh network for critical communications. 3. File police report and coordinate with local law enforcement. 4. Implement fiber optic cable burial program in high-risk areas.",
          tools_called: ["security_camera_analysis", "cable_route_mapping", "emergency_response_coordinator", "crime_pattern_analyzer"],
          validation_status: "Validated by field security team - immediate action required"
        },
        apapa: {
          facts: "Port operations incident at APM Terminal. Container crane accident severed primary and backup fiber links. Port operations suspended. 98,400 subscribers with 85% packet loss. Enterprise MPLS services completely down.",
          inferences: "Heavy equipment malfunction combined with inadequate cable protection. Port safety protocols violated. Risk of secondary incidents from suspended operations. Economic impact estimated at $500K/hour including port fees.",
          recommendations: "1. Establish satellite communication backup for port operations. 2. Coordinate with port authority for crane inspection and cable protection. 3. Implement redundant cable routing around heavy machinery zones. 4. Develop incident response protocol for port-related infrastructure damage.",
          tools_called: ["port_operations_monitor", "equipment_failure_analysis", "economic_impact_calculator", "safety_protocol_reviewer"],
          validation_status: "Cross-validated with port authority systems"
        },
        badagry: {
          facts: "Severe weather event affecting Badagry coastal area. Heavy rainfall and lightning strikes caused multiple infrastructure failures. 32,100 subscribers with degraded service quality.",
          inferences: "Climate change exacerbated storm intensity. Lightning protection systems inadequate for current weather patterns. Flooding compromised underground infrastructure. Risk of secondary failures from water ingress.",
          recommendations: "1. Deploy weather monitoring and early warning systems. 2. Upgrade lightning protection across all infrastructure. 3. Implement flood-resistant cable routing and junction boxes. 4. Develop weather contingency plans with meteorological department coordination.",
          tools_called: ["weather_data_analyzer", "lightning_strike_mapper", "flood_risk_assessment", "climate_impact_model"],
          validation_status: "Correlated with meteorological data - high confidence"
        },
        epe: {
          facts: "Undersea cable fault detected off Epe coastline. Marine vessel activity confirmed in protected cable zone. 45,200 subscribers with intermittent service loss.",
          inferences: "Unauthorized marine operations in restricted waters. Cable protection inadequate against anchor damage. Environmental monitoring systems failed to detect vessel approach. Risk of complete cable severance if vessel movement continues.",
          recommendations: "1. Deploy marine patrol vessels to cable protection zone. 2. Establish underwater cable monitoring buoys. 3. Coordinate with maritime authorities for vessel tracking. 4. Develop subsea cable burial and protection program.",
          tools_called: ["marine_traffic_monitor", "underwater_sensor_network", "cable_integrity_scanner", "maritime_law_enforcement"],
          validation_status: "Confirmed by underwater inspection team"
        },
        eti_osa: {
          facts: "Massive bandwidth surge in Eti-Osa district. Eko Atlantic development event causing network saturation. 187,600 subscribers with severe service degradation.",
          inferences: "Unplanned high-density event overwhelmed infrastructure. Bandwidth allocation algorithms failed under extreme load. VIP security protocols conflicting with network optimization. Risk of cascading failures if load continues.",
          recommendations: "1. Implement dynamic bandwidth allocation for event zones. 2. Deploy additional capacity through satellite and microwave links. 3. Coordinate event planning with infrastructure capacity assessment. 4. Develop premium service tiers for high-density areas.",
          tools_called: ["bandwidth_utilization_tracker", "event_impact_analyzer", "capacity_planning_model", "traffic_engineering_optimizer"],
          validation_status: "Real-time monitoring validation - critical capacity exceeded"
        },
        ibeju_lekki: {
          facts: "Road construction damage to overhead infrastructure. Excavator operations severed fiber optic cables. 28,600 subscribers with localized outages.",
          inferences: "Construction coordination failure. Cable marking and protection inadequate. Emergency response delayed by traffic congestion. Risk of secondary accidents from exposed infrastructure.",
          recommendations: "1. Implement construction permit coordination system. 2. Deploy underground cable conversion program. 3. Establish utility marking and protection standards. 4. Develop emergency response protocols for construction incidents.",
          tools_called: ["construction_permit_tracker", "infrastructure_mapping", "emergency_response_coordinator", "risk_assessment_model"],
          validation_status: "Field inspection confirmed - construction damage verified"
        },
        ifako_ijaiye: {
          facts: "Equipment overheating incident at Ifako-Ijaiye exchange. Router temperature exceeded safe limits. 72,300 subscribers with intermittent connectivity.",
          inferences: "Cooling system failure combined with high ambient temperatures. Maintenance schedules inadequate for current load. Redundant systems failed simultaneously. Risk of permanent hardware damage if not addressed immediately.",
          recommendations: "1. Deploy emergency cooling systems to affected exchange. 2. Implement temperature monitoring and automated shutdown protocols. 3. Upgrade cooling infrastructure for climate resilience. 4. Develop predictive maintenance schedules based on usage patterns.",
          tools_called: ["thermal_monitoring_system", "equipment_health_tracker", "climate_data_analyzer", "maintenance_scheduler"],
          validation_status: "Temperature sensors validated - immediate cooling required"
        },
        ikeja: {
          facts: "Ikeja Node-4 experiencing critical fiber link failure. Primary and secondary routes compromised. 145,800 subscribers affected with 85% packet loss. Enterprise traffic completely down for 967 accounts.",
          inferences: "Physical fiber cut likely from construction or vandalism. Redundancy systems failing due to configuration issues. Geographic location makes Ikeja a critical network hub. Risk of regional outage if not contained.",
          recommendations: "1. Activate microwave failover systems immediately. 2. Dispatch emergency repair crews to affected cable routes. 3. Implement automated traffic rerouting through alternative network paths. 4. Notify enterprise customers with SLA compensation protocols.",
          tools_called: ["fiber_route_analyzer", "traffic_redirection_engine", "emergency_response_dispatcher", "sla_impact_calculator"],
          validation_status: "Cross-validated with multiple monitoring systems"
        },
        ikorodu: {
          facts: "Rodent infestation causing cable damage in underground ducts. Multiple fiber strands compromised. 56,800 subscribers with degraded service quality.",
          inferences: "Environmental conditions favorable for rodent proliferation. Cable protection inadequate for pest intrusion. Previous similar incidents indicate systemic vulnerability. Risk of complete cable failure if infestation spreads.",
          recommendations: "1. Deploy pest control specialists for comprehensive eradication. 2. Implement rodent-proof cable ducting systems. 3. Install pest monitoring and early warning systems. 4. Develop environmental controls for cable infrastructure.",
          tools_called: ["pest_detection_sensors", "cable_integrity_scanner", "environmental_monitor", "biological_impact_analyzer"],
          validation_status: "Pest activity confirmed by inspection cameras"
        },
        kosofe: {
          facts: "Routing protocol instability affecting Kosofe network segment. BGP route flapping causing connectivity issues. 89,400 subscribers with 45% packet loss.",
          inferences: "Software bug in routing protocol implementation. Configuration change introduced instability. Network convergence problems amplified by high traffic load. Risk of network partition if instability persists.",
          recommendations: "1. Implement route dampening to stabilize BGP convergence. 2. Roll back recent configuration changes. 3. Deploy network segmentation to contain instability. 4. Conduct comprehensive routing protocol audit and testing.",
          tools_called: ["bgp_route_analyzer", "protocol_debugger", "configuration_auditor", "network_stability_monitor"],
          validation_status: "Protocol analysis confirmed - routing instability verified"
        },
        lagos_island: {
          facts: "Critical infrastructure failure at Lagos Island central exchange. Complete power and cooling system failure. 203,400 subscribers completely down. Financial district and government offices affected.",
          inferences: "Cascading failure from initial power outage. Backup systems inadequately maintained. Critical infrastructure concentration creates single point of failure. Economic impact estimated at $2M/hour including stock exchange downtime.",
          recommendations: "1. Establish emergency command center with redundant power. 2. Implement geographic distribution of critical infrastructure. 3. Develop comprehensive disaster recovery protocols. 4. Coordinate with emergency services for priority restoration.",
          tools_called: ["infrastructure_monitor", "economic_impact_calculator", "disaster_recovery_planner", "emergency_coordination_system"],
          validation_status: "Critical infrastructure status confirmed - national priority"
        },
        lagos_mainland: {
          facts: "Configuration error causing traffic blocking in Lagos Mainland. ACL rules misconfigured during maintenance. 167,300 subscribers with blocked access to key services.",
          inferences: "Change management process violated. Configuration testing inadequate. Human error compounded by lack of peer review. Risk of widespread service disruption if configuration errors propagate.",
          recommendations: "1. Implement configuration rollback to last known good state. 2. Establish mandatory change review and testing protocols. 3. Deploy automated configuration validation systems. 4. Conduct comprehensive security and access control audit.",
          tools_called: ["configuration_validator", "change_management_tracker", "access_control_analyzer", "security_audit_system"],
          validation_status: "Configuration analysis confirmed - human error identified"
        },
        mushin: {
          facts: "Fire incident in Mushin equipment room. Electrical fault caused ignition. 112,600 subscribers with complete service loss in affected areas.",
          inferences: "Electrical system failure combined with inadequate fire suppression. Maintenance neglect contributed to fault conditions. Smoke and water damage risk to adjacent equipment. Potential for building evacuation and safety concerns.",
          recommendations: "1. Coordinate with fire department for scene assessment. 2. Implement equipment salvage and data recovery protocols. 3. Establish temporary service restoration through mobile units. 4. Conduct comprehensive electrical and fire safety audit.",
          tools_called: ["fire_damage_assessment", "electrical_fault_analyzer", "equipment_salvage_coordinator", "safety_inspection_system"],
          validation_status: "Fire department coordination confirmed - safety protocols active"
        },
        oshodi: {
          facts: "Traffic accident involving utility pole collision. Commercial vehicle impact severed overhead cables. 138,900 subscribers with localized outages.",
          inferences: "High-risk corridor with inadequate pole protection. Vehicle operator error compounded by road conditions. Emergency response delayed by traffic congestion. Risk of secondary accidents from exposed live wires.",
          recommendations: "1. Coordinate with traffic authorities for accident investigation. 2. Implement pole reinforcement and cable burial programs. 3. Deploy temporary cable repair and service restoration. 4. Develop accident prevention protocols for infrastructure corridors.",
          tools_called: ["traffic_incident_analyzer", "infrastructure_protection_planner", "emergency_repair_coordinator", "accident_prevention_model"],
          validation_status: "Traffic authority coordination confirmed - accident reconstruction initiated"
        },
        shomolu: {
          facts: "Hardware failure in Shomolu data center. Core switch malfunction affecting network routing. 76,200 subscribers with intermittent connectivity.",
          inferences: "Manufacturing defect in switch hardware. Quality control failure in procurement process. Redundant systems failed due to shared component issues. Risk of data center-wide failure if problem propagates.",
          recommendations: "1. Perform hot swap of failed hardware components. 2. Implement hardware redundancy and monitoring upgrades. 3. Conduct comprehensive equipment quality audit. 4. Develop predictive failure detection and prevention systems.",
          tools_called: ["hardware_diagnostic_system", "failure_analysis_engine", "quality_control_auditor", "predictive_maintenance_model"],
          validation_status: "Hardware diagnostics confirmed - component failure verified"
        },
        surulere: {
          facts: "Cybersecurity incident affecting Surulere network infrastructure. DDoS attack overwhelming capacity. 129,400 subscribers with severe service degradation.",
          inferences: "Coordinated cyber attack targeting network infrastructure. Attack vectors include multiple botnets and amplification techniques. Security systems overwhelmed by attack volume. Risk of lateral movement to other network segments.",
          recommendations: "1. Activate DDoS mitigation systems and traffic scrubbing. 2. Implement network segmentation to contain attack spread. 3. Coordinate with cybersecurity authorities for attack attribution. 4. Conduct comprehensive security audit and hardening.",
          tools_called: ["cyber_threat_analyzer", "ddos_mitigation_engine", "network_segmentation_tool", "security_incident_response"],
          validation_status: "Cybersecurity team validation - attack signature identified"
        },
        yaba: {
          facts: "Building collapse incident in Yaba commercial district. Structural failure compromised underground infrastructure. 95,600 subscribers with complete service loss.",
          inferences: "Construction quality failure leading to structural collapse. Underground utilities inadequately protected. Emergency response complicated by building debris. Risk of secondary structural failures in surrounding buildings.",
          recommendations: "1. Coordinate with emergency services for structural assessment. 2. Implement cable recovery and repair protocols. 3. Establish temporary service through wireless networks. 4. Conduct infrastructure resilience audit for earthquake-prone areas.",
          tools_called: ["structural_damage_assessor", "emergency_response_coordinator", "infrastructure_recovery_planner", "resilience_audit_system"],
          validation_status: "Emergency services coordination confirmed - structural assessment initiated"
        }
      };
      return Promise.resolve({ data: copilotResponses[lgaId] || copilotResponses.ikeja });
    }
    if (url === "/actions/simulate") {
      const { incident_id } = data || {};
      const lgaId = incident_id ? incident_id.split('-')[1].toLowerCase() : 'ikeja';
      const mitigationActions: Record<string, any[]> = {
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
            id: "route-dampening-protocol",
            name: "BGP Route Dampening",
            riskReduction: 78,
            confidence: 0.92,
            timeToEffect: "5m",
            description: "Implement aggressive route dampening to stabilize BGP convergence and prevent flapping."
          },
          {
            id: "configuration-rollback",
            name: "Configuration Rollback",
            riskReduction: 65,
            confidence: 0.89,
            timeToEffect: "10m",
            description: "Rollback recent software updates and configuration changes to stable state."
          },
          {
            id: "network-segmentation",
            name: "Network Segmentation",
            riskReduction: 48,
            confidence: 0.76,
            timeToEffect: "15m",
            description: "Isolate affected network segments to prevent instability propagation."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Route flapping intensifying. Network partition risk within 30 minutes."
          }
        ],
        lagos_island: [
          {
            id: "emergency-power-restoration",
            name: "Emergency Power Systems",
            riskReduction: 85,
            confidence: 0.96,
            timeToEffect: "20m",
            description: "Deploy mobile power generators and establish temporary command center with redundancy."
          },
          {
            id: "geographic-diversification",
            name: "Infrastructure Distribution",
            riskReduction: 62,
            confidence: 0.81,
            timeToEffect: "45m",
            description: "Activate geographically distributed backup systems across multiple locations."
          },
          {
            id: "critical-service-prioritization",
            name: "Priority Service Restoration",
            riskReduction: 45,
            confidence: 0.88,
            timeToEffect: "30m",
            description: "Implement priority restoration protocols for financial and government systems."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Cascading failures continuing. Complete infrastructure collapse within 1 hour."
          }
        ],
        lagos_mainland: [
          {
            id: "configuration-rollback-mainland",
            name: "Configuration Rollback",
            riskReduction: 78,
            confidence: 0.94,
            timeToEffect: "8m",
            description: "Execute immediate rollback to last verified configuration state."
          },
          {
            id: "automated-validation-system",
            name: "Configuration Validation",
            riskReduction: 55,
            confidence: 0.87,
            timeToEffect: "12m",
            description: "Deploy automated configuration validation and integrity checking systems."
          },
          {
            id: "change-management-protocol",
            name: "Enhanced Change Management",
            riskReduction: 38,
            confidence: 0.79,
            timeToEffect: "25m",
            description: "Implement mandatory peer review and testing protocols for all configuration changes."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Configuration errors propagating. Widespread service disruption within 45 minutes."
          }
        ],
        mushin: [
          {
            id: "fire-suppression-coordination",
            name: "Fire Response Coordination",
            riskReduction: 75,
            confidence: 0.91,
            timeToEffect: "15m",
            description: "Coordinate with fire department for damage assessment and safety clearance."
          },
          {
            id: "equipment-salvage-protocol",
            name: "Equipment Salvage Operations",
            riskReduction: 58,
            confidence: 0.83,
            timeToEffect: "45m",
            description: "Execute specialized salvage protocols for damaged equipment and data recovery."
          },
          {
            id: "temporary-service-units",
            name: "Mobile Service Units",
            riskReduction: 42,
            confidence: 0.76,
            timeToEffect: "30m",
            description: "Deploy mobile communication units for temporary service restoration."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Fire damage spreading. Adjacent equipment failure within 20 minutes."
          }
        ],
        oshodi: [
          {
            id: "traffic-coordination",
            name: "Traffic Management Coordination",
            riskReduction: 65,
            confidence: 0.89,
            timeToEffect: "10m",
            description: "Coordinate with traffic authorities for accident scene management and investigation."
          },
          {
            id: "emergency-cable-repair",
            name: "Emergency Cable Restoration",
            riskReduction: 52,
            confidence: 0.82,
            timeToEffect: "60m",
            description: "Deploy specialized repair teams for overhead cable restoration and pole reinforcement."
          },
          {
            id: "infrastructure-protection",
            name: "Infrastructure Hardening",
            riskReduction: 38,
            confidence: 0.74,
            timeToEffect: "90m",
            description: "Implement impact-resistant pole designs and cable protection measures."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Traffic congestion increasing. Secondary accidents likely within 30 minutes."
          }
        ],
        shomolu: [
          {
            id: "hardware-component-replacement",
            name: "Hot Swap Hardware Replacement",
            riskReduction: 82,
            confidence: 0.96,
            timeToEffect: "15m",
            description: "Perform immediate replacement of failed hardware components with certified units."
          },
          {
            id: "redundancy-system-upgrade",
            name: "Redundancy Enhancement",
            riskReduction: 58,
            confidence: 0.87,
            timeToEffect: "30m",
            description: "Upgrade redundancy systems with diverse component sourcing and independent power."
          },
          {
            id: "predictive-monitoring",
            name: "Predictive Failure Detection",
            riskReduction: 42,
            confidence: 0.79,
            timeToEffect: "45m",
            description: "Implement AI-driven predictive monitoring and automated failure prevention."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Component failures cascading. Data center-wide outage within 25 minutes."
          }
        ],
        surulere: [
          {
            id: "ddos-mitigation-activation",
            name: "DDoS Mitigation Systems",
            riskReduction: 78,
            confidence: 0.93,
            timeToEffect: "5m",
            description: "Activate global DDoS mitigation and traffic scrubbing with 100Gbps capacity."
          },
          {
            id: "network-segmentation-security",
            name: "Emergency Network Segmentation",
            riskReduction: 65,
            confidence: 0.88,
            timeToEffect: "10m",
            description: "Implement network segmentation to contain attack spread and prevent lateral movement."
          },
          {
            id: "threat-intelligence-coordination",
            name: "Cybersecurity Coordination",
            riskReduction: 45,
            confidence: 0.81,
            timeToEffect: "20m",
            description: "Coordinate with cybersecurity authorities for attack attribution and intelligence sharing."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Attack volume increasing. Complete network compromise within 40 minutes."
          }
        ],
        yaba: [
          {
            id: "structural-assessment-coordination",
            name: "Emergency Structural Assessment",
            riskReduction: 55,
            confidence: 0.84,
            timeToEffect: "20m",
            description: "Coordinate with structural engineers for comprehensive damage assessment."
          },
          {
            id: "infrastructure-recovery-operations",
            name: "Infrastructure Recovery",
            riskReduction: 48,
            confidence: 0.79,
            timeToEffect: "120m",
            description: "Execute cable recovery and repair operations with heavy equipment support."
          },
          {
            id: "temporary-wireless-restoration",
            name: "Temporary Wireless Networks",
            riskReduction: 35,
            confidence: 0.72,
            timeToEffect: "45m",
            description: "Deploy temporary wireless networks for service restoration in accessible areas."
          },
          {
            id: "baseline",
            name: "Do-Nothing Baseline",
            riskReduction: 0,
            confidence: 1.0,
            timeToEffect: "0m",
            description: "Structural instability increasing. Risk of secondary collapses within 1 hour."
          }
        ]
      };
      return Promise.resolve({ data: mitigationActions[lgaId] || mitigationActions.ikeja });
    }
    if (url === "/actions/approve") {
      const currentState = getSimulationState();
      const newState = { ...currentState, status: "mitigating" };
      setSimulationState(newState);
      // Trigger recovery
      setTimeout(() => {
        const recoveredState = { ...getSimulationState(), status: "recovered" };
        setSimulationState(recoveredState);
      }, 10000);
      return Promise.resolve({ data: { status: "ok" } });
    }
    if (url.startsWith('/compliance/pack/')) {
      const incidentId = url.split('/compliance/pack/')[1];
      const lgaId = incidentId.split('-')[1]?.toLowerCase() || 'ikeja';

      // Simple compliance data for now
      const defaultCompliance = {
        lgaName: lgaId.charAt(0).toUpperCase() + lgaId.slice(1),
        timeline: "2026-05-03T22:04:00Z - 23:45:00Z",
        affectedServices: ["Network Infrastructure", "Services"],
        kpis: "Uptime: 85% | Quality: Good",
        impactedSubscribers: 100000,
        rootCause: "Technical incident requiring regulatory documentation",
        correctiveActions: "Applied standard mitigation procedures",
        evidenceLogs: "Log-ID: SYS-001 | Evidence collected"
      };

      return Promise.resolve({ data: defaultCompliance });
    }
    return Promise.reject(new Error("Not implemented"));
  }
};

export const api = mockApi;

export interface LGA {
  id: string;
  name: string;
  risk: number;
  timeToBreach: string;
}

export interface Incident {
  id: string;
  cause: string;
  riskScore: number;
  timeToBreach: string;
  affectedSubscribers: number;
  enterpriseLines: number;
  revenueAtRisk: string;
  nccExposure: string;
  phase: "active" | "recovery";
  timeline: Array<{ time: string; event: string }>;
}

export interface CopilotResponse {
  facts: string;
  inferences: string;
  recommendations: string;
  tools_called: string[];
  validation_status: string;
}

export interface MitigationAction {
  id: string;
  name: string;
  riskReduction: number;
  confidence: number;
  timeToEffect: string;
  description: string;
}

export interface CompliancePack {
  lgaName: string;
  timeline: string;
  affectedServices: string[];
  kpis: string;
  impactedSubscribers: number;
  rootCause: string;
  correctiveActions: string;
  evidenceLogs: string;
}


