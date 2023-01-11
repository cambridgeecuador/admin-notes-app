export const config = {
  apiURL: process.env.API_URL,
  jwtSecret: process.env.JWT_SECRET,
  NextAuthURL: process.env.VERCEL_URL || process.env.NEXTAUTH_URL,
}