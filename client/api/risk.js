// Vercel serverless function for risk endpoints
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

  if (req.method === 'GET' && pathname === '/api/risk/map') {
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
    res.status(200).json(updatedLGAs);
  } else {
    res.status(404).json({ error: "Not found" });
  }
}