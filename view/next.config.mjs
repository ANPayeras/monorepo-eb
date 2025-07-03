/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
    ],
  },
  assetPrefix: "/view",
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: "/view/_next/:path*",
  //         destination: "/_next/:path*",
  //       },
  //     ],
  //   };
  // },
};

export default nextConfig;
