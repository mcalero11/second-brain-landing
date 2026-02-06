import Image from 'next/image';

const PARTNERS = [
  { name: 'Vercel', slug: 'vercel' },
  { name: 'AWS', slug: 'aws' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'Anthropic', slug: 'anthropic' },
  { name: 'Modal', slug: 'modal' },
  { name: 'Sentry', slug: 'sentry' },
];

export default function Partners() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-sm font-medium uppercase tracking-widest text-fg-subtle">
          Powered By
        </h2>
        <div className="mt-10 grid grid-cols-2 items-center gap-8 md:grid-cols-3">
          {PARTNERS.map((partner) => (
            <div
              key={partner.slug}
              className="flex items-center justify-center opacity-60 transition-opacity hover:opacity-100"
            >
              <Image
                src={`/logos/${partner.slug}-light.svg`}
                alt={partner.name}
                width={120}
                height={40}
                className="logo-light h-8 w-auto"
              />
              <Image
                src={`/logos/${partner.slug}-dark.svg`}
                alt={partner.name}
                width={120}
                height={40}
                className="logo-dark h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
