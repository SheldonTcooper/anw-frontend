/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isso é importante para que o Next.js lide corretamente com módulos externos no build
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig