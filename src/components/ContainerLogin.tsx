'use client'
import React from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import { useRequireAuth } from '@/lib/useRequireAuth'

export const ContainerLogin = () => {
  useRequireAuth()

  function handleLogin() {
    signIn('github', {
      callbackUrl: '/',
    })
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center border-l-zinc-800 bg-zinc-900 ">
      <button
        onClick={handleLogin}
        className="flex w-max cursor-pointer items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-6 text-xl font-bold text-zinc-200 duration-200 ease-out hover:scale-[1.02] hover:bg-zinc-950/50"
      >
        <GitHubLogoIcon className="h-10 w-10" />
        <p>Logar com GitHub</p>
      </button>
    </div>
  )
}
