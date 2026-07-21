import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },


  // outputFileTracingRoot: "C:/Users/mohdm/development/click trick/artiory_frontend",


  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.ggpht.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
    ],
  },

};

export default nextConfig;
