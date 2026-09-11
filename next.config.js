/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "**",
        },
      ],
    },
    devIndicators: false,
  };
  
  module.exports = nextConfig;