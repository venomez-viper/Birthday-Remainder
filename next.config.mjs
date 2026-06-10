/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fail the build (and the Vercel deploy) on type or lint errors.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
