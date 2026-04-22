import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";

const messages = [
  "Uploading contract securely...",
  "Groq AI is extracting clauses...",
  "Auditing for Red Flags...",
  "Cross-referencing case law...",
  "Translating legalese to plain English...",
  "Compiling your audit report...",
];

export const ScanningView = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx((i) => (i + 1 < messages.length ? i + 1 : i));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="relative w-72 md:w-80">
        {/* Document mock */}
        <div className="relative aspect-[3/4] rounded-2xl bg-card shadow-elegant border border-border overflow-hidden">
          {/* Paper lines */}
          <div className="absolute inset-0 p-7 space-y-3">
            <div className="h-3 w-2/3 rounded bg-primary/30" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-11/12 rounded bg-muted" />
            <div className="h-2 w-10/12 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-4" />
            <div className="h-2.5 w-1/2 rounded bg-primary/25" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-9/12 rounded bg-muted" />
            <div className="h-2 w-11/12 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-8/12 rounded bg-muted" />
            <div className="h-4" />
            <div className="h-2.5 w-2/5 rounded bg-primary/25" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-10/12 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
          </div>

          {/* Scan line overlay */}
          <div className="scan-line" />
        </div>

        {/* Floating doc icon badge */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-secondary border border-primary/30 shadow-card flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary-deep" />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-3 text-foreground">
        <Loader2 className="w-5 h-5 animate-spin text-primary-deep" />
        <span key={msgIdx} className="font-medium animate-fade-in">{messages[msgIdx]}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-72 md:w-80 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${((msgIdx + 1) / messages.length) * 100}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">contract.pdf · 2.4 MB</p>
    </section>
  );
};
