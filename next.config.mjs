/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- MANDATORY FOR GITHUB PAGES
  images: {
    unoptimized: true, // <-- Recommended so your images don't break
  },
};

export default nextConfig;
