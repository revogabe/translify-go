export default function Loading() {
  return (
    <main className="flex items-center justify-center overflow-y-hidden bg-zinc-900 p-0 text-zinc-300 first-line:flex-col md:p-24 md:py-20">
      <div className="flex w-full flex-col items-stretch justify-between gap-4 overflow-hidden border-l-zinc-800 bg-zinc-900 px-4 py-8 lg:px-16 xl:px-32">
        <div className="flex h-[85vh] flex-col justify-between overflow-hidden">
          <div className="flex h-max items-center justify-start gap-2">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-zinc-800" />
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="h-6 w-24 animate-pulse rounded-lg bg-zinc-800" />
              <div className="flex items-center justify-start gap-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
          <div className="h-8 w-full animate-pulse rounded-lg bg-zinc-800 px-8 py-6 pr-16 text-sm text-zinc-300 outline-none duration-100 ease-out" />
        </div>
      </div>
    </main>
  )
}
