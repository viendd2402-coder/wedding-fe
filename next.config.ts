import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Allow loading Next.js dev resources from LAN hosts (e.g. iPhone testing).
   * Without this, hydration/HMR requests can be blocked and client-side buttons
   * may appear unresponsive when opening via local network IP.
   */
  allowedDevOrigins: ["10.5.10.155", "10.5.10.155:3000", "localhost", "localhost:3000", "nonaccelerative-noah-unoriginally.ngrok-free.dev"],

  // async redirects() {
  //   return [
  //     {
  //       source: "/thanh-toan/thanh-cong",
  //       destination: "/payment/success",
  //       permanent: true,
  //     },
  //   ];
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
