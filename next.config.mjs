/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [
      { source: '/api/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
    ]
  },
  experimental: {
    staleTimes: {
      dynamic: 1,
    },
  },
}

export default nextConfig
