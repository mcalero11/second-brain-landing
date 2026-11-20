import type { NextConfig } from "next";

const apiOrigin = process.env.SECOND_BRAIN_API_ORIGIN;
if (!apiOrigin) {
  throw new Error("SECOND_BRAIN_API_ORIGIN is not set (e.g. https://api-int.mcalero.dev)");
}

const nextConfig: NextConfig = {
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
