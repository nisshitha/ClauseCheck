import { Shield, TrendingUp, Languages } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "IP Protection",
    text: "Never accidentally sign away your work forever.",
    accent: "from-primary/30 to-primary/5",
  },
  {
    icon: TrendingUp,
    title: "Negotiation Intel",
    text: "Flag aggressive payment terms like Net-90 or high liability.",
    accent: "from-secondary to-secondary/20",
  },
  {
    icon: Languages,
    title: "Plain English Translation",
    text: "Complex legal jargon translated instantly into simple language.",
    accent: "from-primary/20 to-secondary/40",
  },
];

export const FeatureCards = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-20 grid md:grid-cols-3 gap-5">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <div
            key={f.title}
            className="group relative p-7 rounded-3xl bg-card border border-border/60 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1.5 animate-float-up cursor-default"
            style={{ animationDelay: `${i * 120 + 200}ms` }}
          >
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`} />

            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                <Icon className="w-6 h-6 text-primary-deep group-hover:text-primary-foreground transition-colors duration-500" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
