import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="text-center max-w-4xl mx-auto px-6 pt-16 md:pt-24 animate-float-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-primary/20 text-sm text-primary-deep font-medium mb-8">
        <Sparkles className="w-3.5 h-3.5" />
        Instant AI Audits · Built for freelancers & founders
      </div>

      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-foreground tracking-tight">
        ClauseCheck:
        <br />
        <span className="relative inline-block">
          <span className="relative z-10">Find the traps</span>
          <span className="absolute inset-x-0 bottom-2 h-3 bg-primary/40 -z-0 rounded-sm" />
        </span>
        <br />
        <span className="text-muted-foreground italic">before you sign.</span>
      </h1>

      <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        We surface the <span className="text-foreground font-semibold">"gotchas"</span> in your freelance and founder contracts —
        before you sign away your IP, your equity, or your weekends.
      </p>

    </section>
  );
};
