const STEPS = [
  {
    number: '01',
    title: 'Capture',
    description:
      'Send a voice memo, type a note, or snap a receipt. Second Brain accepts any input, anytime.',
  },
  {
    number: '02',
    title: 'Understand',
    description:
      'AI agents analyze your input — extracting meaning, categorizing content, and linking related ideas.',
  },
  {
    number: '03',
    title: 'Act',
    description:
      'Data is routed to the right place: expenses logged, notes organized, reminders set — all autonomously.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-fg md:text-4xl">
          How It Works
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-border bg-bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <span className="font-mono text-4xl font-bold text-primary">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
