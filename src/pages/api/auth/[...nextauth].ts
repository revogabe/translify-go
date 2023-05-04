// next-auth
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

// ::
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
