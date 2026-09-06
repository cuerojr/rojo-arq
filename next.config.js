/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
          pathname: "**",
        },
      ],
    },
    devIndicators: false,
  };
  
  module.exports = nextConfig;