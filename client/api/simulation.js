// Vercel serverless function for simulation endpoints
let simulationState = {
  status: "idle",
  activeIncidents: [],
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
  { id: "oshodi", name: "Oshodi", risk: 16, timeToBreach: "N/A" },
  { id: "shomolu", name: "Shomolu", risk: 13, timeToBreach: "N/A" },
  { id: "surulere", name: "Surulere", risk: 15, timeToBreach: "N/A" },
  { id: "yaba", name: "Yaba", risk: 17, timeToBreach: "N/A" },
];

export default function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && pathname === '/api/simulation/start') {
    simulationState = { status: "idle", activeIncidents: [], startTime: Date.now() };
    res.status(200).json({ status: "ok", message: "Simulation initialized" });
  } else if (req.method === 'POST' && pathname === '/api/simulation/trigger') {
    simulationState.status = "active";
    simulationState.activeIncidents = LGAS.map(lga => ({ id: `INC-${lga.id.toUpperCase()}-001`, lgaId: lga.id }));
    res.status(200).json({ status: "ok", message: "Incidents triggered in all LGAs" });
  } else if (req.method === 'POST' && pathname === '/api/simulation/mitigate') {
    simulationState.status = "mitigating";
    setTimeout(() => {
      simulationState.status = "recovered";
    }, 10000);
    res.status(200).json({ status: "ok", message: "Action approved and deploying" });
  } else if (req.method === 'POST' && pathname === '/api/simulation/reset') {
    simulationState = { status: "idle", activeIncidents: [], startTime: Date.now() };
    res.status(200).json({ status: "ok", message: "System reset" });
  } else {
    res.status(404).json({ error: "Not found" });
  }
}