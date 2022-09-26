/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  swSrc: "src/worker/sw.js",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});
