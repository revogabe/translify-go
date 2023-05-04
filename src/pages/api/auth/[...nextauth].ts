// next-auth
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const prisma = new PrismaClient()
// ::
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
