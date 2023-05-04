'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import LogoChatGPT from '../../public/logo-chat.png'
import { signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cn } from '@/utils/clsx'
import { motion } from 'framer-motion'

type TChat = {
  historyChat: {
    role: 'assistant' | 'user'
    content: string
  }[]
}

type TChatRequest = {
  systemId: string
  role: 'assistant' | 'user'
  content: string
}

type TChatResponse = {
  completion: {
    message: {
      role: 'assistant' | 'user'
      content: string
    }
  }
}

type PropsBrowser = {
  systemIdProps?: string
}

export const ContainerBrowser = ({ systemIdProps }: PropsBrowser) => {
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: session } = useSession()

  const { data } = useQuery({
    queryKey: ['chat', systemIdProps],
    queryFn: async () => {
      const response = await axios.get<TChat>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/history-chat?systemId=${systemIdProps}`,
        {
          headers: {
            Authorization: session?.user?.email,
          },
        },
      )
      return response.data
    },
    enabled: !!session?.user,
  })

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        behavior: 'smooth',
        top: containerRef.current.scrollHeight,
      })
    }
  }, [data])

  const mutate = useMutation({
    mutationFn: async (data: TChatRequest) => {
      const response = await axios.post<TChatResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-message`,
        data,
        {
          headers: {
            Authorization: session?.user?.id,
          },
        },
      )
      return response.data.completion.message
    },
    onMutate: async (newChat) => {
      await queryClient.cancelQueries({ queryKey: ['chat', systemIdProps] })

      const previousTodos = queryClient.getQueryData(['chat', systemIdProps])

      queryClient.setQueryData<TChat>(['chat', systemIdProps], (old) => {
        return {
          ...old,
          historyChat: [...(old?.historyChat ?? []), newChat],
        }
      })

      return { previousTodos }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['chat', systemIdProps], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['chat', systemIdProps])
    },
    onSuccess: (data) => {
      queryClient.setQueryData<TChat>(['chat', systemIdProps], (old) => {
        return {
          ...old,
          historyChat: [
            ...(old?.historyChat ?? []),
            {
              role: data.role,
              content: data.content,
            },
          ],
        }
      })
    },
  })

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const inputValue = formData.get('content')

    mutate.mutate({
      systemId: `${systemIdProps}`,
      role: 'user',
      content: inputValue ? inputValue.toString() : '',
    })
    setValue('')
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between gap-4 border-l-zinc-800 bg-zinc-900 px-4 py-8 lg:px-16 xl:px-32">
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
        <button
          onClick={() => signOut()}
          className="justify-self-end rounded-lg border border-red-400 bg-red-500 px-4 py-2 text-sm text-zinc-100 duration-150 ease-out hover:bg-red-300 hover:text-red-500"
        >
          Sair
        </button>
      </div>
      <ScrollArea.Root className="h-[80%] w-full">
        <ScrollArea.Viewport
          ref={containerRef}
          className="h-full w-full overflow-y-auto"
        >
          <div className="flex h-full w-full flex-col px-6 py-3 ">
            {data?.historyChat?.map(({ content, role }, index) => (
              <div
                key={index}
                className={cn(`w-full mb-8 flex flex-col gap-1`, {
                  'items-end': role === 'user',
                  'items-start': role === 'assistant',
                })}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={cn(
                    `p-6 max-w-full flex flex-col items-start gap-3 xl:max-w-[70%] rounded-xl bg-zinc-800`,
                    {
                      'bg-zinc-800 rounded-br-none': role === 'user',
                      'bg-zinc-800 rounded-tl-none': role === 'assistant',
                    },
                  )}
                >
                  <p className="rounded-lg text-sm text-zinc-400">
                    {role === 'user' ? 'You' : 'LearnezyGO'}
                  </p>
                  <p className="w-full">
                    {role === 'user'
                      ? content.replace(
                          'Responda minha seguinte frase em ingles e em seguinda a corrija em portugues, me explique oque eu errei e porque e me responda uma proxima pergunta em inglês:',
                          '',
                        )
                      : content}
                  </p>
                </motion.div>
              </div>
            ))}
            {mutate.isLoading && (
              <div className="mb-8 flex w-full flex-col items-start gap-1">
                <div
                  className={`flex max-w-full flex-col items-start gap-3 rounded-xl p-6 xl:max-w-[70%]`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <div className="delay-1 mr-2 h-3 w-3 animate-bounce rounded-full bg-gray-500" />
                    <div className="delay-2 mr-2 h-3 w-3 animate-bounce rounded-full bg-gray-500" />
                    <div className="delay-3 h-3 w-3 animate-bounce rounded-full bg-gray-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <form
        onSubmit={handleSendMessage}
        className="group relative flex max-h-24 w-full px-6"
      >
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type="text"
          name="content"
          autoComplete="off"
          placeholder="Inicie a conversa com o TraduGO e aperte (enter)"
          className="w-full rounded-lg bg-zinc-950/50 px-8 py-6 pr-16 text-sm text-zinc-300 outline-none duration-100 ease-out placeholder:text-zinc-600 focus:shadow-[0_0_0_1px] focus:shadow-emerald-400"
        />
      </form>
    </div>
  )
}
