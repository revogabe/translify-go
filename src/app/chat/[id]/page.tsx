import { ContainerBrowser } from '@/components/ContainerBrowser'

interface Props {
  params: {
    id: string
  }
}

export default function Home({ params }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-0 text-zinc-300">
      <ContainerBrowser systemIdProps={params.id} />
    </main>
  )
}
