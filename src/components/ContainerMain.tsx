'use client'
import React, { useState } from 'react'
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-topics`,
        createData,
        {
          headers: {
            Authorization: session?.user?.id,
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
    <div className="flex h-screen w-full flex-col items-center justify-center gap-24 border-l-zinc-800 bg-zinc-900 px-4 py-8 lg:px-16 xl:px-32">
      <h2 className="w-full text-center text-5xl font-bold text-zinc-300">
        Learnezy{' '}
        <span className="rounded-lg bg-emerald-600 p-2 text-white">GO</span>
      </h2>
      <div className="grid w-full grid-cols-3 gap-4 px-6 text-zinc-200 opacity-60 max-xl:grid-cols-1 lg:max-w-5xl">
        <div className="flex items-center rounded-lg bg-zinc-800 p-6 xl:justify-center">
          <p>Passo 1: Escolha um assunto para o seu chat</p>
        </div>
        <div className="flex items-center  rounded-lg bg-zinc-800 p-6 xl:justify-center">
          <p>Passo 2: Inicie a conversa em inglês</p>
        </div>
        <div className="flex items-center  rounded-lg bg-zinc-800 p-6 xl:justify-center">
          <p>
            Passo 3: Continue a conversar naturalmente que o LearnezyGO vai te
            ajudar no restante
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="group relative flex max-h-24 w-full max-w-5xl px-6"
      >
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Digite um assunto para o seu chat - ( Exemplo: Falar sobre NFL )"
          className="w-full rounded-lg bg-zinc-950/50 px-8 py-6 pr-16 text-sm text-zinc-300 outline-none duration-100 ease-out placeholder:text-zinc-600 focus:shadow-[0_0_0_1px] focus:shadow-emerald-400"
        />
      </form>
    </div>
  )
}
