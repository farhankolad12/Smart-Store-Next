/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fabulous-ishi.myshopify.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
