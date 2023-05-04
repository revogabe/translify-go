'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && typeof session !== 'undefined') {
      router.push('/login')
    }
  }, [session, router])

  return session
}
