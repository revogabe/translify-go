'use client'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
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

export const SideBar = () => {
  const { data: session } = useSession()

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
  return (
    <div className="flex min-h-screen w-[420px] flex-col gap-6 bg-zinc-800 p-6">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950/25 p-4 font-medium text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white active:scale-95"
      >
        <PlusCircledIcon width={20} height={20} /> New Chat
      </Link>
      <ul className="flex w-full flex-col gap-2">
        {data?.map((topic: TopicsProps) => (
          <Link
            href={`/chat/${topic.id}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-zinc-700/50 p-4 font-medium text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white active:scale-95"
            key={topic.id}
          >
            {topic.title}
          </Link>
        ))}
      </ul>
    </div>
  )
}
