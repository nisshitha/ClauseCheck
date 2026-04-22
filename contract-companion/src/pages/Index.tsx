import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Hero } from "@/components/Landing/Hero";
import { FeatureCards } from "@/components/Landing/FeatureCards";
import { UploadButton } from "@/components/Uploader/UploadButton";
import { ScanningView } from "@/components/Uploader/ScanningView";
import { ResultsView } from "@/components/Results/ResultsView";

type AppState = "landing" | "scanning" | "results";

const Index = () => {
  const [state, setState] = useState<AppState>("landing");
  // Added states to hold the backend data
  const [auditData, setAuditData] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Triggered instantly to show the scanning animation
  const handleUploadStart = () => {
    setState("scanning");
  };

  // Triggered when FastAPI successfully returns the data
  const handleUploadComplete = (data: any, pdf: string) => {
    setAuditData(data);
    setPdfUrl(pdf);
    
    // Simulated audit duration - waits 4.5s AFTER data arrives for cinematic effect
    setTimeout(() => setState("results"), 4500);
  };

  const handleRestart = () => {
    setAuditData(null);
    setPdfUrl(null);
    setState("landing");
  };

  return (
    <main className="min-h-screen">
      <Header />

      {state === "landing" && (
        <div key="landing" className="pb-24">
          <Hero />
          <UploadButton 
            onUploadStart={handleUploadStart} 
            onUploadComplete={handleUploadComplete} 
          />
          <FeatureCards />
        </div>
      )}

      {state === "scanning" && <ScanningView key="scanning" />}

      {state === "results" && (
        <ResultsView 
          key="results" 
          data={auditData}
          pdfUrl={pdfUrl}
          onRestart={handleRestart} 
        />
      )}

      <footer className="border-t border-border/60 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-muted-foreground flex items-center justify-center text-center">
          <div>© 2026 ClauseCheck · Not legal advice. Always consult an attorney for binding decisions.</div>
        </div>
      </footer>
    </main>
  );
};

export default Index;