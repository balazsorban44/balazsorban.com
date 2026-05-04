/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "assets.vercel.com" }],
  },
  reactStrictMode: true,
}
