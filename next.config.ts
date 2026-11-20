import type { NextConfig } from "next";

const apiOrigin = process.env.SECOND_BRAIN_API_ORIGIN;
if (!apiOrigin) {
  throw new Error("SECOND_BRAIN_API_ORIGIN is not set (e.g. https://api-int.mcalero.dev)");
}

// No script-src: a strict script policy needs per-request nonces, which would
// make every page dynamic. These directives still block framing, plugins,
// <base> hijacking and off-site form posts.
const contentSecurityPolicy = [
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Every path except the OAuth pass-through, whose response must
        // reach the browser exactly as the platform sent it.
        source: "/:path((?!oauth/gmail/).*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Gmail OAuth callback: Google redirects the browser here; the
        // Second Brain platform completes the connection. Pass-through only.
        source: "/oauth/gmail/:path*",
        destination: `${apiOrigin}/oauth/gmail/:path*`,
      },
    ];
  },
};

export default nextConfig;
