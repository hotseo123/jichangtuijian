/** @type {import('next').NextConfig} */
const isExport = process.env.BUILD_MODE === 'export'

const nextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: isExport, // export 时自动加 /
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
