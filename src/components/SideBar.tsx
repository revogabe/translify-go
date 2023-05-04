'use client'
import useScreenWidthLessThanX from '@/hooks/witdhSize'
import { cn } from '@/utils/clsx'
import {
  ArrowRightIcon,
  ExitIcon,
  PersonIcon,
  PlusCircledIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'

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
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()
  const pathName = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isSizeX = useScreenWidthLessThanX(1024)

  const isAuthenticated = status === 'authenticated'

  const { data } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await axios.get<TopicsProps[]>(
        `http://localhost:3000/api/query-topics`,
        {
          headers: {
            Authorization: session?.user?.id,
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
            Authorization: session?.user?.id,
          },
        },
      )

      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['topics'])
    },
  })

  async function handleDelete(id: string) {
    mutate.mutate({ data: { systemId: id } })
    if (pathName === '/chat/' + id) {
      router.push('/')
    }
  }
  return !isAuthenticated ? null : (
    <div
      className={cn(
        `relative z-30 h-screen duration-200 ease-out flex min-h-screen w-[420px] flex-col justify-between gap-6 bg-zinc-800 p-6 max-lg:fixed`,
        {
          '-translate-x-full': !open && isSizeX,
        },
      )}
    >
      <ArrowRightIcon
        onClick={() => setOpen(!open)}
        className=" absolute -right-4 top-1/2 rounded-full bg-zinc-800 p-2 text-zinc-300 duration-150 ease-out hover:scale-105 hover:bg-zinc-700 lg:hidden"
        width={36}
        height={36}
      />
      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950/25 p-4 font-medium text-zinc-300 duration-150 ease-out hover:bg-zinc-700 hover:text-white active:scale-95"
        >
          <PlusCircledIcon width={20} height={20} /> New Chat
        </Link>
        <div className="flex w-full flex-col gap-2 overflow-y-auto">
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
                onClick={() => handleDelete(topic.id)}
                className="mr-3 cursor-pointer rounded-lg p-2 text-zinc-500 duration-150 ease-out hover:bg-zinc-900/50 hover:text-red-500"
                width={42}
                height={42}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 ">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-zinc-700/50 font-medium text-zinc-300 duration-150 ease-out">
          {session?.user?.name ? (
            <Image
              src={session?.user?.image as string}
              alt={`Foto de perfil do ${session?.user?.name}`}
              className="ml-4 rounded-full"
              width={44}
              height={44}
            />
          ) : (
            <div className="ml-4">
              <PersonIcon widths={64} height={64} className="h-6 w-6" />
            </div>
          )}
          <div className="flex h-full w-full items-center justify-start truncate py-6 pr-6 font-bold">
            <p>{session?.user?.name}</p>
          </div>
          <ExitIcon
            onClick={() => signOut()}
            width={64}
            height={64}
            className="mr-4 h-max w-max cursor-pointer rounded-lg p-3 text-zinc-500 duration-150 ease-out hover:bg-zinc-800 hover:text-red-500"
          />
        </div>
      </div>
    </div>
  )
}
