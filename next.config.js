/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_URL: process.env.JWT_SECRET,
    JWT_SECRET: process.env.NEXTAUTH_URL,
  }
}

module.exports = nextConfig
