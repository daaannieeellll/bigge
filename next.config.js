/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  swSrc: "src/worker/sw.js",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
});
