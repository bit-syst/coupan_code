/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — outputs to 'out/' by default, perfect for Cloudflare Pages
  output: 'export',

  // Required for static export: disable Next.js image optimisation
  images: {
    unoptimized: true,
  },

  // Ensures every route has its own directory with an index.html
  trailingSlash: true,
}

module.exports = nextConfig
