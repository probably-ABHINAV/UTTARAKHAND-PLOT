/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 1000,
  onDemandEntries: {
    maxInactiveAge: 15 * 60 * 1000,
    pagesBufferLength: 4,
  },
  // Headers for Replit environment
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // API routes rewrite
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendUrl}/health`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Optimize for production deployment
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  // Enable static optimization
  output: 'standalone',
  // Compress images
  compress: true,
  // Enable SWC minification
  swcMinify: true,
}

export default nextConfig
