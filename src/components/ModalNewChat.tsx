'use client'
import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { PaperPlaneIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type TChatTopic = {
  title: string
  id?: string
}

export function ModalNewChat() {
  const [value, setValue] = useState('')
  const [isPending, setIsPending] = useState(false)

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
    onSettled(data) {
      router.push(`/chat/${data}`)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(['topics'])
      router.push(`/chat/${data}`)
      setIsPending(false)
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
    setIsPending(true)
  }

  return (
    <Dialog.Root onOpenChange={(open) => open === false && setIsPending(false)}>
      <Dialog.Trigger asChild>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950/25 p-4 font-medium leading-none text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-emerald-500 focus:outline-none active:scale-95">
          <PlusCircledIcon width={20} height={20} /> New Chat
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-800 p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-zinc-300">
            Crie um assunto
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-zinc-400">
            De um nome para seu chat contendo o assunto que deseja falar sobre,
            por exemplo: Falar sobre NFL
          </Dialog.Description>
          <form
            onSubmit={handleSendMessage}
            className="group relative flex h-full w-full"
          >
            <input
              onChange={(event) => setValue(event.target.value)}
              disabled={isPending}
              value={value}
              type="text"
              name="title"
              autoComplete="off"
              placeholder="Digite um assunto para o seu chat"
              className="h-full w-full rounded-lg bg-zinc-950/50 px-8 py-6 pr-16 text-sm text-zinc-300 outline-none duration-100 ease-out placeholder:text-zinc-600 focus:shadow-[0_0_0_1px] focus:shadow-emerald-400"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 flex h-full w-[50px] items-center justify-center text-emerald-500"
            >
              {isPending ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="mr-2 inline h-8 w-8 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <PaperPlaneIcon width={24} height={24} />
              )}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
