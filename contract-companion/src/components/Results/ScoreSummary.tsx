import { useEffect, useState } from "react";

interface ScoreSummaryProps {
  score: number;
  assessment: string;
}

export const ScoreSummary = ({ score, assessment }: ScoreSummaryProps) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  const tone =
    score >= 80 ? "text-risk-green" : score >= 60 ? "text-risk-yellow" : "text-risk-red";
  const stroke =
    score >= 80 ? "hsl(var(--risk-green))" : score >= 60 ? "hsl(var(--risk-yellow))" : "hsl(var(--risk-red))";

  return (
    <div className="relative rounded-3xl bg-gradient-cream border border-primary/20 p-8 md:p-10 shadow-card animate-scale-in">
      <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-10 items-center">
        <div className="relative w-44 h-44 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={stroke}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`font-serif text-6xl ${tone}`}>{animated}</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">/ 100</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary-deep mb-2">
            Legal Health Score
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            Proceed with caution.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {assessment}
          </p>
        </div>
      </div>
    </div>
  );
};
