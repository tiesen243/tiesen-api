/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [{ headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] }]
  },
}

export default nextConfig
