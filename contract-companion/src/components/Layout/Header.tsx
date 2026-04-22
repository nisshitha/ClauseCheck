import { ShieldCheck } from "lucide-react";

export const Header = () => {
  return (
    <header className="max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="relative w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-card">
          <ShieldCheck className="w-5 h-5 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <div className="font-serif text-2xl text-foreground">ClauseCheck</div>
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs font-medium text-primary-deep px-3 py-1.5 rounded-full bg-secondary border border-primary/20">
        <span className="w-1.5 h-1.5 rounded-full bg-risk-green animate-pulse" />
        Zero signup · Instant audit
      </div>
    </header>
  );
};
