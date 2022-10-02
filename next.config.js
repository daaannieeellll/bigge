/** @type {import('next').NextConfig} */
module.exports = {
  rewrites: () => [{ source: "/v1/:path*", destination: "/api/:path*" }],
  reactStrictMode: true,
};
