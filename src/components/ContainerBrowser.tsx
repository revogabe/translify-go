'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import LogoChatGPT from '../../public/logo-chat.png'
import { cn } from '@/utils/clsx'

type TChat = {
  author: string
  message: string
}

const chatArray = [
  { author: 'me', message: 'Teste me 1' },
  { author: 'gpt', message: 'Teste gpt 1' },
  { author: 'me', message: 'Teste me 2' },
  { author: 'gpt', message: 'Teste gpt 2' },
]

export const ContainerBrowser = () => {
  const [chat, setChat] = useState<TChat[]>(chatArray)

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const inputValue = formData.get('message')
    const newMessage: TChat = {
      author: 'me',
      message: inputValue ? inputValue.toString() : '',
    }

    setChat([...chat, newMessage])
    event.currentTarget.reset()
  }

  return (
    <div className="flex h-screen w-full flex-col border-l-zinc-800 bg-zinc-900 md:h-[720px] md:rounded-xl">
      <div className="flex w-full items-center justify-start p-3">
        <Image
          src={LogoChatGPT}
          alt="Logo ChatGPT"
          quality={100}
          width={2000}
          height={2000}
          className="h-16 w-16"
        />
        <div>
          <h2 className="text-lg font-bold text-zinc-300">ChatGPT</h2>
          <div className="flex items-center justify-start gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <p className="flex items-center justify-start gap-2 text-sm text-zinc-400">
              Online
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-3 ">
        {chat.map((item: TChat, index) => (
          <div
            key={index}
            className={cn(`w-full mb-4 flex flex-col gap-1`, {
              'items-end': item.author === 'me',
              'items-start': item.author === 'gpt',
            })}
          >
            <div
              className={cn(
                `p-3 max-w-full xl:max-w-[70%] rounded-lg border bg-zinc-800`,
                {
                  'border-zinc-700': item.author === 'me',
                  'border-emerald-400': item.author === 'gpt',
                },
              )}
            >
              <p className="w-full">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className=" group relative flex max-h-24 w-full"
      >
        <input
          type="text"
          name="message"
          placeholder="Inicie a conversa com o TraduGO e aperte (enter)"
          className="w-full bg-zinc-950/50 px-8 py-6 pr-16 text-base text-zinc-300 outline-none duration-100 ease-out placeholder:text-zinc-600 focus:shadow-[0_0_0_1px] focus:shadow-emerald-400"
        />
      </form>
    </div>
  )
}
