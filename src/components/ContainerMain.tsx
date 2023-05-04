'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import LogoChatGPT from '../../public/logo-chat.png'
import { useSession } from 'next-auth/react'
import { useRequireAuth } from '@/lib/useRequireAuth'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type TChatTopic = {
  title: string
  id?: string
}

export const ContainerMain = () => {
  const [value, setValue] = useState('')
  const authSession = useRequireAuth()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: session } = useSession()

  const mutate = useMutation({
    mutationFn: async ({ createData }: { createData: TChatTopic }) => {
      const response = await axios.post<TChatTopic>(
        'http://localhost:3000/api/create-topics',
        createData,
        {
          headers: {
            Authorization: session?.user?.email,
          },
        },
      )

      return response.data.id
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(['topics'])
      router.push(`/chat/${data}`)
    },
  })

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const inputValue = formData.get('title')

    mutate.mutate({
      createData: {
        title: inputValue ? inputValue.toString() : '',
      },
    })
    setValue('')
  }

  return !authSession ? (
    <div className="flex h-screen w-full animate-pulse flex-col border-l-zinc-800 bg-zinc-900" />
  ) : (
    <div className="flex h-screen w-full flex-col items-center justify-between gap-4 border-l-zinc-800 bg-zinc-900 px-32 py-8">
      <div className="flex w-full items-center justify-between py-3">
        <div className="flex items-center justify-start gap-2">
          <Image
            src={LogoChatGPT}
            alt="Logo ChatGPT"
            quality={100}
            width={2000}
            height={2000}
            className="h-16 w-16"
          />
          <div>
            <h2 className="text-lg font-bold text-zinc-300">Learnezy GO</h2>
            <div className="flex items-center justify-start gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <p className="flex items-center justify-start gap-2 text-sm text-zinc-400">
                Online
              </p>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="group relative flex max-h-24 w-full px-6"
      >
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Digite um nome para o seu chat"
          className="w-full rounded-lg bg-zinc-950/50 px-8 py-6 pr-16 text-sm text-zinc-300 outline-none duration-100 ease-out placeholder:text-zinc-600 focus:shadow-[0_0_0_1px] focus:shadow-emerald-400"
        />
      </form>
    </div>
  )
}
