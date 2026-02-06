const FEATURES = [
  {
    icon: '🔍',
    title: 'Agentic Retrieval',
    description:
      'Ask questions in natural language and get answers sourced from your entire knowledge base — powered by AI agents that reason over your data.',
  },
  {
    icon: '💰',
    title: 'Finance Assistant',
    description:
      'Track expenses, categorize transactions, and get spending insights — all from simple text or voice input.',
  },
  {
    icon: '🧠',
    title: 'Knowledge Engine',
    description:
      'Notes, bookmarks, and ideas are automatically linked and surfaced when relevant, building a web of knowledge that grows smarter over time.',
  },
  {
    icon: '🏠',
    title: 'Self-Hosted',
    description:
      'Your data stays yours. Deploy on your own infrastructure with full control over privacy and security.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Features
        </h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <div className="text-3xl" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-fg">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
