import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Second Brain',
  description:
    'How Second Brain handles your data, including read-only access to Gmail.',
};

const sections = [
  {
    title: 'What Second Brain is',
    body: [
      'Second Brain is a self-hosted personal finance system. Each installation runs on a server controlled by the person who uses it. There is no shared service that collects data from many users.',
    ],
  },
  {
    title: 'Data the app stores',
    body: [
      'The app stores the financial records you enter or import: accounts, transactions, budgets, card statements, receipts and voice notes. It also stores your name, phone number and household name. All of it stays in the database and file storage of your own installation.',
    ],
  },
  {
    title: 'Gmail access',
    body: [
      'If you connect a Gmail mailbox, the app asks for one permission: read-only access (gmail.readonly). It cannot send, change or delete email.',
      'The app only processes messages from senders you add to an allowlist in Settings, such as your bank. For every other message it reads the sender information only, to decide that the message is not relevant, and then ignores it.',
      'From an allowlisted message, the app extracts financial data: amounts, dates, merchant names, card statement totals and due dates. It saves that data as statements and transactions in your installation.',
    ],
  },
  {
    title: 'Third parties',
    body: [
      'To extract the data, the text of an allowlisted message is sent to a language model provider chosen by the person who runs the installation. Nothing else is shared. Your data is not sold, not used for advertising and not transferred to anyone else.',
      'The use of information received from Google APIs follows the Google API Services User Data Policy, including the Limited Use requirements.',
    ],
  },
  {
    title: 'Keeping and deleting data',
    body: [
      'Data stays in your installation until you delete it. You can remove Gmail access at any time from your Google Account, under Security, in the list of third-party apps with account access. After that the app can no longer read your mailbox.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-fg-subtle">
          Last updated: November 18, 2026
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-fg">
              {section.title}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        <div className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-fg">
            Contact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Questions about this policy:{' '}
            <a
              href="mailto:hello@mcalero.dev"
              className="text-fg underline underline-offset-4 hover:text-primary"
            >
              hello@mcalero.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
