import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
