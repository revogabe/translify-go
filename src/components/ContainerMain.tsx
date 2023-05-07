export const ContainerMain = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-24 border-l-zinc-800 bg-zinc-900 px-4 py-8 lg:px-16 xl:px-32">
      <h2 className="w-full text-center text-5xl font-bold text-zinc-300">
        Translify{' '}
        <span className="rounded-lg bg-emerald-600 p-2 text-white">GO</span>
      </h2>
      <div className="grid w-full max-w-lg grid-cols-1 gap-4 px-6 text-zinc-200 opacity-60 lg:max-w-2xl">
        <div className="flex items-center justify-start rounded-lg bg-zinc-800 p-6">
          <p>Passo 1: Escolha um assunto para o seu chat</p>
        </div>
        <div className="flex items-center  justify-start rounded-lg bg-zinc-800 p-6">
          <p>Passo 2: Inicie a conversa em inglês</p>
        </div>
        <div className="flex items-center  justify-start rounded-lg bg-zinc-800 p-6">
          <p>
            Passo 3: Continue a conversar naturalmente que o TranslifyGO vai te
            ajudar no restante
          </p>
        </div>
      </div>
    </div>
  )
}
