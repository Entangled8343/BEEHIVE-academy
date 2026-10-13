import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Permite levantar dos colegios a la vez en desarrollo (p. ej. NEXT_DIST_DIR=.next-curie).
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  devIndicators: false,
};

export default withNextIntl(nextConfig);
