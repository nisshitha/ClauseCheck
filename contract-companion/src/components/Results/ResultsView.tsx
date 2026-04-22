import { useMemo, useState } from "react";
import {
  RotateCcw,
  ShieldCheck,
  Download,
  FileText,
  ListChecks,
  CheckSquare,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { ScoreSummary } from "./ScoreSummary";
import { RiskCard, type Risk } from "./RiskCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// 1. Updated Props to receive the live data
interface ResultsViewProps {
  data: any;
  pdfUrl: string | null;
  onRestart: () => void;
}

interface Finding {
  id: string;
  risk: Risk;
  title: string;
  legalese: string;
  translation: string;
}

interface IndustryRow {
  clause: string;
  yours: string;
  standard: string;
  verdict: "worse" | "standard" | "better";
}

interface ChecklistItem {
  id: string;
  text: string;
}

const verdictConfig = {
  worse: {
    label: "Worse than standard",
    Icon: TrendingDown,
    cls: "bg-risk-red-soft text-risk-red border-risk-red/30",
  },
  standard: {
    label: "Industry standard",
    Icon: Minus,
    cls: "bg-secondary text-foreground border-border",
  },
  better: {
    label: "Better than standard",
    Icon: TrendingUp,
    cls: "bg-risk-green-soft text-risk-green border-risk-green/30",
  },
};

export const ResultsView = ({ data, pdfUrl, onRestart }: ResultsViewProps) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  
  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  // --- DYNAMIC DATA MAPPING ---
  // If data hasn't loaded yet, show nothing to prevent crashes
  if (!data) return null;

  const documentType = data.document_type || "Analyzed Document";
  const score = data.risk_score || 0;
  const assessment = data.overall_summary || "";

  // Map AI clauses to the UI's 'Finding' format
  const findings: Finding[] = (data.clauses || []).map((c: any, i: number) => ({
    id: `f${i}`,
    risk: (c.risk_level?.toLowerCase() || "green") as Risk,
    title: c.title || "Clause",
    legalese: c.original_legalese || "",
    translation: c.ai_translation || "",
  }));

  // Synthesize the "Industry Comparison" tab dynamically from the AI clauses
  const industry: IndustryRow[] = (data.clauses || []).map((c: any) => {
    const riskLevel = c.risk_level?.toLowerCase();
    let verdict: "worse" | "standard" | "better" = "standard";
    if (riskLevel === "red") verdict = "worse";
    if (riskLevel === "green") verdict = "better";

    return {
      clause: c.title,
      yours: c.ai_translation,
      standard: c.industry_standard || "Standard mutual terms.",
      verdict: verdict,
    };
  });

  // Map AI checklist strings to the UI's checklist objects
  const checklist: ChecklistItem[] = (data.negotiation_checklist || []).map((text: string, i: number) => ({
    id: `c${i}`,
    text: text,
  }));

  // --- CALCULATIONS ---
  const counts = useMemo(() => {
    return findings.reduce(
      (acc, f) => {
        acc[f.risk] += 1;
        return acc;
      },
      { red: 0, yellow: 0, green: 0 } as Record<Risk, number>
    );
  }, [findings]);

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-16 pb-40 space-y-8">
      {/* Executive header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-float-up">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-primary/30 text-xs font-semibold uppercase tracking-wider text-primary-deep mb-3">
            <FileText className="w-3.5 h-3.5" />
            Audit Complete
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            {documentType}
          </h1>
          <p className="text-muted-foreground mt-2">
            We reviewed every clause and benchmarked it against industry norms.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-risk-red-soft text-risk-red font-semibold">
            {counts.red} High
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-risk-yellow-soft text-risk-yellow font-semibold">
            {counts.yellow} Negotiate
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-risk-green-soft text-risk-green font-semibold">
            {counts.green} Safe
          </span>
        </div>
      </div>

      {/* Score summary */}
      <ScoreSummary score={score} assessment={assessment} />

      {/* Tabs */}
      <Tabs defaultValue="findings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 p-1 rounded-2xl bg-secondary/60 border border-primary/20">
          <TabsTrigger
            value="findings"
            className="rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-card data-[state=active]:text-primary-deep"
          >
            <ListChecks className="w-4 h-4" />
            <span className="hidden sm:inline">Detailed Findings</span>
            <span className="sm:hidden">Findings</span>
          </TabsTrigger>
          <TabsTrigger
            value="industry"
            className="rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-card data-[state=active]:text-primary-deep"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Industry Comparison</span>
            <span className="sm:hidden">Industry</span>
          </TabsTrigger>
          <TabsTrigger
            value="checklist"
            className="rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-card data-[state=active]:text-primary-deep"
          >
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Action Plan</span>
            <span className="sm:hidden">Plan</span>
          </TabsTrigger>
        </TabsList>

        {/* Findings */}
        <TabsContent value="findings" className="mt-6 space-y-5">
          {findings.map((f, i) => (
            <RiskCard
              key={f.id}
              risk={f.risk}
              title={f.title}
              legalese={f.legalese}
              translation={f.translation}
              index={i}
            />
          ))}
        </TabsContent>

        {/* Industry comparison */}
        <TabsContent value="industry" className="mt-6">
          <Card className="rounded-3xl border-primary/20 shadow-card overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border bg-gradient-cream">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                How your contract compares
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Each clause benchmarked against typical standard agreements.
              </p>
            </div>
            <div className="divide-y divide-border">
              {industry.map((row, i) => {
                const v = verdictConfig[row.verdict];
                const VIcon = v.Icon;
                return (
                  <div
                    key={i}
                    className="p-6 md:p-7 grid md:grid-cols-[1.2fr,1fr,1fr,auto] gap-4 md:gap-6 items-start md:items-center animate-float-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Clause
                      </div>
                      <div className="font-serif text-lg text-foreground leading-snug">
                        {row.clause}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Your Contract
                      </div>
                      <div className="text-sm text-foreground font-medium">{row.yours}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Industry Standard
                      </div>
                      <div className="text-sm text-muted-foreground">{row.standard}</div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${v.cls}`}
                    >
                      <VIcon className="w-3.5 h-3.5" />
                      {v.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Checklist */}
        <TabsContent value="checklist" className="mt-6">
          <Card className="rounded-3xl border-primary/20 shadow-card overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border bg-gradient-cream flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                  Negotiation Checklist
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Bring these up with the other side before you sign.
                </p>
              </div>
              <div className="text-sm font-semibold text-primary-deep whitespace-nowrap">
                {completedCount} / {checklist.length} done
              </div>
            </div>
            <ul className="divide-y divide-border">
              {checklist.map((item, i) => {
                const isDone = !!checked[item.id];
                return (
                  <li
                    key={item.id}
                    className="p-5 md:p-6 animate-float-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-start gap-4 text-left group"
                    >
                      <span
                        className={`mt-0.5 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-300 ${
                          isDone
                            ? "bg-primary border-primary"
                            : "bg-card border-primary/40 group-hover:border-primary"
                        }`}
                      >
                        {isDone && (
                          <svg viewBox="0 0 20 20" className="w-4 h-4 text-primary-foreground">
                            <path
                              fill="currentColor"
                              d="M7.6 13.2 4.4 10l-1.4 1.4 4.6 4.6L17 6.6 15.6 5.2z"
                            />
                          </svg>
                        )}
                      </span>
                      <span
                        className={`flex-1 text-base md:text-lg leading-relaxed transition-all duration-300 ${
                          isDone
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {item.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/85 backdrop-blur-xl shadow-elegant">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary-deep" />
            <span>Your contract was analyzed locally · Not legal advice</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* Download Highlighted PDF - Linked to backend Base64 string! */}
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="ClauseCheck_Audited_Contract.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-elegant transition-all duration-300 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Audited PDF</span>
                <span className="sm:hidden">Download</span>
              </a>
            )}
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-primary/40 bg-card text-foreground font-semibold transition-all duration-300 hover:border-primary hover:bg-secondary/50"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Start New Audit</span>
              <span className="sm:hidden">Restart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};