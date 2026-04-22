import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // rewrites: async () => {
  //   return [
  //     { 
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`
  //     }
  //   ]
  // }
};

export default nextConfig;
