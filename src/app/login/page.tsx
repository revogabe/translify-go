import { AnimationChat } from '@/components/AnimationChat'
import { ContainerLogin } from '@/components/ContainerLogin'
export default function Login() {
  return (
    <main className="container relative mx-auto flex min-h-screen items-center gap-20 overflow-x-hidden bg-zinc-900 p-0 px-6 text-zinc-300">
      <div className="flex w-full flex-col items-start justify-center gap-12 ">
        <h2 className="w-full text-left text-5xl font-bold text-zinc-300">
          Translify{' '}
          <span className="rounded-lg bg-emerald-600 p-2 text-white">GO</span>
        </h2>
        <p className="max-w-2xl text-left text-zinc-400 ">
          Translify GO é um aplicativo de treinamento de inglês que utiliza
          inteligência artificial para ajudá-lo a praticar conversação em inglês
          de forma natural e eficaz.
          <br />
          <br />
          Com o Translify GO, você pode ter conversas com a IA do aplicativo e
          ser corrigido em tempo real caso cometa erros em sua pronúncia ou
          gramática. O aplicativo também faz perguntas sobre o dia a dia para
          ajudá-lo a melhorar suas habilidades de conversação e vocabulário. O
          Translify GO é uma ferramenta prática e interativa para quem quer
          aprimorar seus conhecimentos em inglês de forma personalizada e em
          qualquer lugar.
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="h-px w-full bg-zinc-600" />
            <p className="w-max whitespace-nowrap text-base text-zinc-500">
              Login or Signup
            </p>
            <div className="h-px w-full bg-zinc-600" />
          </div>
          <ContainerLogin />
        </div>
      </div>
      <div className="h-[80vh]  w-full max-w-2xl overflow-hidden max-xl:hidden">
        <AnimationChat />
      </div>
    </main>
  )
}
