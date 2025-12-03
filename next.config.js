/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'static.ryznn.xyz',
      },
      {
        protocol: 'https',
        hostname: 'i.giphy.com',
      },
    ],
  },
  allowedDevOrigins: ['*'],
};

export default nextConfig;
