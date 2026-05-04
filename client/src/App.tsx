/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense, lazy } from "react";
import { TopBar } from "./components/layout/TopBar";
import { RecoveryView } from "./components/risk/RecoveryView";

// Lazy load heavy components
const RiskRadar = lazy(() => import("./components/risk/RiskRadar").then(module => ({ default: module.RiskRadar })));
const IncidentPanel = lazy(() => import("./components/incident/IncidentPanel").then(module => ({ default: module.IncidentPanel })));
const CopilotPanel = lazy(() => import("./components/copilot/CopilotPanel").then(module => ({ default: module.CopilotPanel })));
const MitigationPanel = lazy(() => import("./components/mitigation/MitigationPanel").then(module => ({ default: module.MitigationPanel })));
const CompliancePackView = lazy(() => import("./components/compliance/CompliancePack").then(module => ({ default: module.CompliancePackView })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"incident" | "compliance">("incident");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
        <TopBar onIncidentDetection={(id) => setSelectedIncidentId(id)} />
        
        <main className="flex-1 flex overflow-hidden">
          {/* Sidebar: Risk Radar */}
          <aside className="w-72 bg-white border-r flex flex-col flex-none">
            <div className="p-4 border-b flex-none">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Radar (LGAs)</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Suspense fallback={<div className="p-6 h-[400px] flex items-center justify-center"><div className="animate-pulse text-slate-400">Loading Risk Radar...</div></div>}>
                <RiskRadar
                  onSelectLGA={(lgaId) => {
                    setSelectedIncidentId(`INC-${lgaId.toUpperCase()}-001`);
                  }}
                />
              </Suspense>
            </div>
            <div className="p-4 border-t bg-slate-50 flex-none">
              <RecoveryView selectedIncidentId={selectedIncidentId} />
            </div>
          </aside>

          {/* Content Area */}
          <section className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
            <div className="flex bg-slate-100 p-1 rounded-lg self-start flex-none">
              <button 
                onClick={() => setActiveTab("incident")}
                className={`px-4 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                  activeTab === "incident" ? "bg-white shadow text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Operational Command
              </button>
              <button 
                onClick={() => setActiveTab("compliance")}
                className={`px-4 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                  activeTab === "compliance" ? "bg-white shadow text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Compliance Documentation
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="animate-pulse text-slate-400">Loading...</div></div>}>
                {activeTab === "incident" ? (
                  <IncidentPanel incidentId={selectedIncidentId}>
                    <Suspense fallback={<div className="p-4 text-slate-400">Loading AI Assistant...</div>}>
                      <CopilotPanel incidentId={selectedIncidentId} />
                    </Suspense>
                    <Suspense fallback={<div className="p-4 text-slate-400">Loading Mitigation Panel...</div>}>
                      <MitigationPanel incidentId={selectedIncidentId} />
                    </Suspense>
                  </IncidentPanel>
                ) : (
                  <CompliancePackView incidentId={selectedIncidentId} />
                )}
              </Suspense>
            </div>
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}
