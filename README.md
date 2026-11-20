# Second Brain Landing Page

The landing site for Second Brain at [brain.mcalero.dev](https://brain.mcalero.dev), built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. It also passes the Gmail OAuth callback through to the Second Brain platform (see [below](#gmail-oauth-callback-pass-through)).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **React**: 19
- **TypeScript**: 7 (`tsc`), with the TypeScript 6 API for tooling (see [TypeScript](#typescript))
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter and JetBrains Mono via `next/font`
- **Linting**: ESLint 10 with `eslint-config-next`
- **Package manager**: pnpm (version pinned in `packageManager`)

## Project Structure

```
second-brain-landing/
├── .github/workflows/ci.yml  # Lint, type-check and build on PRs and main
├── app/
│   ├── components/           # Page sections, navbar, theme toggle, toasts
│   ├── privacy/page.tsx      # Privacy policy
│   ├── globals.css           # Theme tokens (light/dark) and Tailwind setup
│   ├── layout.tsx            # Root layout, metadata, no-flash theme script
│   ├── page.tsx              # Home page
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # sitemap.xml
├── public/logos/             # Partner logos (light and dark variants)
└── next.config.ts            # Security headers and the OAuth rewrite
```

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- pnpm (`corepack enable` picks up the pinned version)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd second-brain-landing
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env.local` with the required environment variable (see [Environment Variables](#environment-variables)):
```bash
echo "SECOND_BRAIN_API_ORIGIN=https://api-int.mcalero.dev" > .env.local
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Type-check with TypeScript 7

CI runs `lint`, `typecheck` and `build` on every pull request and on `main`.

## Environment Variables

| Variable | Required | Example | Purpose |
| :--- | :--- | :--- | :--- |
| `SECOND_BRAIN_API_ORIGIN` | Yes | `https://api-int.mcalero.dev` | Origin of the Second Brain platform (no trailing slash). The build fails if it is missing. |

### Gmail OAuth callback pass-through

Google redirects the browser to `https://brain.mcalero.dev/oauth/gmail/callback` after the "Connect Gmail" consent. `next.config.ts` rewrites every request under `/oauth/gmail/` to `${SECOND_BRAIN_API_ORIGIN}/oauth/gmail/...` (same path, full query string) and returns the platform's response unchanged.

- Do not add pages, route handlers, middleware, analytics or logging under `/oauth`: `code` and `state` are one-time secrets.
- Do not enable `trailingSlash` or i18n routing without excluding `/oauth/gmail/callback`; Google's redirect URI must match exactly.
- The security headers in `next.config.ts` deliberately skip `/oauth/gmail/*`.

## Development

### Theming

Colors are CSS custom properties in `app/globals.css`: `:root` for light, `[data-theme="dark"]` for dark, registered for Tailwind with `@theme inline`. An inline script in `app/layout.tsx` sets `data-theme` before first paint, and `ThemeToggle` stores the choice (`light`, `system` or `dark`) in `localStorage`.

### TypeScript

TypeScript 7.0 ships no compiler API yet, while typescript-eslint and Next.js still `require("typescript")`. Following the [TypeScript 7.0 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0), `package.json` installs both:

- `@typescript/native` (an alias of `typescript@7`) provides `tsc`, used by `pnpm typecheck`.
- `typescript` (an alias of `@typescript/typescript6`) provides the TypeScript 6 API for ESLint and the Next.js build.

When typescript-eslint supports TypeScript 7, drop the alias and depend on `typescript@7` directly.

Strict mode is on, and `@/*` maps to the repository root.

## Deployment

The site deploys on Vercel from `main`.

1. Set `SECOND_BRAIN_API_ORIGIN` in Project Settings → Environment Variables for Production (and Preview, if previews should build).
2. Push to `main`, or merge a pull request.

To run it elsewhere:
```bash
pnpm build
pnpm start
```

## License

Private project - All rights reserved
