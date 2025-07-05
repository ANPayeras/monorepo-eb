import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version } = require("./package.json");

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
  env: {
    version,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source:
          "/:user((?!build|templates|profile|layouts|sign-in|sign-up|api|metrics)[^/]+)",
        destination: `${process.env.REWRITES_VIEW_URL}/:user`,
      },
      {
        source:
          "/:user((?!build)[^/]+)/:path(all|combo|confirmation)/:combo(1|2|3|4)?",
        destination: `${process.env.REWRITES_VIEW_URL}/:user/:path?combo=:combo`,
      },
      {
        source: "/test/:user",
        destination: `${process.env.REWRITES_VIEW_URL}/test/:user`,
      },
      {
        source: "/test/:user/:path(all|combo|confirmation)/:combo(1|2|3|4)?",
        destination: `${process.env.REWRITES_VIEW_URL}/test/:user/:path?combo=:combo`,
      },
      {
        source: "/view/_next/:path+",
        destination: `${process.env.REWRITES_VIEW_URL}/view/_next/:path+`,
      },
    ];
  },
};

export default nextConfig;
