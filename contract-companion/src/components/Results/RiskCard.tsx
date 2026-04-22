import { AlertTriangle, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export type Risk = "red" | "yellow" | "green";

interface RiskCardProps {
  risk: Risk;
  title: string;
  legalese: string;
  translation: string;
  index: number;
}

const config = {
  red: {
    label: "High Risk",
    Icon: AlertTriangle,
    bar: "bg-risk-red",
    soft: "bg-risk-red-soft",
    text: "text-risk-red",
    border: "border-risk-red/30",
    emoji: "🚨",
  },
  yellow: {
    label: "Negotiate",
    Icon: AlertCircle,
    bar: "bg-risk-yellow",
    soft: "bg-risk-yellow-soft",
    text: "text-risk-yellow",
    border: "border-risk-yellow/40",
    emoji: "⚠️",
  },
  green: {
    label: "Standard & Safe",
    Icon: CheckCircle2,
    bar: "bg-risk-green",
    soft: "bg-risk-green-soft",
    text: "text-risk-green",
    border: "border-risk-green/30",
    emoji: "✅",
  },
};

export const RiskCard = ({ risk, title, legalese, translation, index }: RiskCardProps) => {
  const c = config[risk];
  const Icon = c.Icon;

  return (
    <article
      className={`group relative rounded-3xl bg-card border ${c.border} shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-float-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${c.bar}`} />

      <div className="p-7 pl-9">
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${c.soft} ${c.text} text-xs font-semibold uppercase tracking-wide`}>
            <Icon className="w-3.5 h-3.5" />
            {c.label}
          </div>
          <span className="text-2xl" aria-hidden>{c.emoji}</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-tight mb-5">
          {title}
        </h3>

        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Original Legalese
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-border pl-4">
              "{legalese}"
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <ArrowRight className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">AI Translation</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className={`${c.soft} rounded-2xl p-4`}>
            <p className="text-foreground font-medium leading-relaxed">
              {translation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
