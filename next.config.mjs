/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this line to disable automatic static optimization for all pages
  unstable_runtimeJS: true,
};

export default nextConfig;
