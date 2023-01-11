import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { config } from "../../../config";

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "light",
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
  jwt: {},
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        idNumber : { label: "Id Number", type: "text", placeholder: "123456ABC" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials, req): Promise<any> => {
        const idNumber = credentials?.idNumber
        const password = credentials?.password
        
        try{
          const URL = `${process.env.API_URL}/auth/login`
          
          const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify({ idNumber, password }),
            headers: {
              "Content-Type": "application/json",
            }
          })
          
          const data = await response.json()
          const { user } = data

          if (user) {
            return data
          }
        } catch (error) {
          console.log(error)
        }

        return null
      }
    }),
  ],
  secret: config.jwtSecret,
  callbacks: {
    jwt: async ({token, user}) => {
      user && (token.user = user)
      
      return token
    },
    session: async ({ session, token }: any) => {
        const accessToken = token.user['access_token']
        session.user = { ...token.user.user, accessToken }

        return session
    }
}
}

export default NextAuth(authOptions);
