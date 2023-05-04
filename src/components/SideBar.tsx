'use client'
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type TopicsProps = {
  id: string
  title: string
  role: 'system'
  content: string
  userId: string
}

type SystemProps = {
  systemId: string
}

export const SideBar = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await axios.get<TopicsProps[]>(
        `http://localhost:3000/api/query-topics`,
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

  const mutate = useMutation({
    mutationFn: async ({ data }: { data: SystemProps }) => {
      const response = await axios.delete<SystemProps>(
        'http://localhost:3000/api/delete-topics?systemId=' + data.systemId,
        {
          headers: {
            Authorization: session?.user?.email,
          },
        },
      )

      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['topics'])
    },
  })
  return (
    <div className="flex min-h-screen w-[420px] flex-col gap-6 bg-zinc-800 p-6">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950/25 p-4 font-medium text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white active:scale-95"
      >
        <PlusCircledIcon width={20} height={20} /> New Chat
      </Link>
      <div className="flex w-full flex-col gap-2">
        {data?.map((topic: TopicsProps) => (
          <div
            key={topic.id}
            className="flex items-center justify-between gap-2 rounded-lg bg-zinc-700/50 font-medium text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white active:scale-95"
          >
            <Link
              className="flex h-full w-full items-center justify-start p-6"
              href={`/chat/${topic.id}`}
            >
              {topic.title}
            </Link>
            <TrashIcon
              onClick={() => mutate.mutate({ data: { systemId: topic.id } })}
              className="mr-3 cursor-pointer rounded-lg p-2 text-zinc-500 duration-150 ease-out hover:bg-zinc-900/50 hover:text-red-500"
              width={42}
              height={42}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
