'use client'
import React from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'

export const ContainerLogin = () => {
  function handleLoginGithub() {
    signIn('github', {
      callbackUrl: '/',
    })
  }

  // function handleLoginGoogle() {
  //   signIn('google', {
  //     callbackUrl: '/',
  //   })
  // }

  return (
    <div className="flex w-full items-center justify-start gap-4">
      <button
        onClick={handleLoginGithub}
        className="flex w-max cursor-pointer items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-6 text-lg font-bold text-zinc-200 duration-200 ease-out  hover:bg-emerald-500 hover:text-zinc-900 active:scale-95  max-sm:px-6 max-sm:py-4 max-sm:text-sm"
      >
        <GitHubLogoIcon className="h-6 w-6" />
        <p>GitHub</p>
      </button>
      <button
        disabled
        className="flex w-max cursor-pointer items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-6 text-lg font-bold text-zinc-200 duration-200 ease-out    active:scale-95 disabled:opacity-50  max-sm:px-6 max-sm:py-4 max-sm:text-sm"
      >
        <p>
          Google: <span className="font-normal">Desabilitado</span>
        </p>
      </button>
    </div>
  )
}
