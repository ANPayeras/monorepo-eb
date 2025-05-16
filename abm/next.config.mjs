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
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source:
          "/:user((?!build|templates|profile|layouts|sign-in|sign-up|api)[^/]+)",
        destination: `http://localhost:3001/:user`,
      },
      {
        source:
          "/:user((?!build)[^/]+)/:path(all|combo|confirmation)/:combo(1|2|3|4)?",
        destination: `http://localhost:3001/:user/:path?combo=:combo`,
      },
      {
        source: "/test/:user((?!build|templates|layout)[^/]+)",
        destination: `http://localhost:3001/test/:user`,
      },
      {
        source:
          "/test/:user((?!build|templates|layout)[^/]+)/:path(all|combo|confirmation)/:combo(1|2|3|4)?",
        destination: `http://localhost:3001/test/:user/:path?combo=:combo`,
      },
      {
        source: "/view/_next/:path+",
        destination: `http://localhost:3001/view/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
