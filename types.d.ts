/* eslint-disable no-unused-vars */
import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string
    }
  }
}
