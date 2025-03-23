/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'net', 'tls'];
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig 