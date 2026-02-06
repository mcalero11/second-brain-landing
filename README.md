# Second Brain Landing Page

A modern, clean landing page for Second Brain - an AI-powered knowledge management platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Overview

Second Brain helps users transform the way they organize, access, and leverage their knowledge with an intelligent system that serves as a digital extension of their mind.

## Tech Stack

- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.0
- **Font**: Geist Sans & Geist Mono
- **Package Manager**: pnpm

## Project Structure

```
second-brain-landing/
├── app/
│   ├── favicon.ico
│   ├── globals.css       # Global styles and Tailwind config
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Home page component
├── public/               # Static assets
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm

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

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## Features

- Modern, responsive design
- Dark mode support
- TypeScript for type safety
- Tailwind CSS 4 for styling
- Next.js App Router
- Optimized fonts with next/font
- SEO-friendly metadata

## Development

The page auto-updates as you edit files. The main entry point is `app/page.tsx`.

### Styling

This project uses Tailwind CSS 4 with custom theme configuration in `app/globals.css`. The theme includes:
- Custom color variables for light and dark modes
- Geist font family integration
- Responsive design utilities

### TypeScript

TypeScript is configured with strict mode enabled. Path aliases are set up:
- `@/*` maps to the root directory

## Deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to a Git repository
2. Import the project to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

### Other Platforms

Build the production application:
```bash
pnpm build
```

Then start the production server:
```bash
pnpm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

Private project - All rights reserved
