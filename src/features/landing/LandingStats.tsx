const STATS = [
  { value: "10,000+", label: "Utilisateurs actifs" },
  { value: "4,800+", label: "Prompts disponibles" },
  { value: "1,200+", label: "Créateurs actifs" },
  { value: "99.9%", label: "Disponibilité" },
];

export function LandingStats() {
  return (
    <section className="border-y border-[var(--hairline)] py-10">
      <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-semibold text-[var(--foreground)]">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
