/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'

export function AnimationChat() {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-4">
      <motion.div
        initial={{ translateY: '100%', display: 'none' }}
        animate={{ translateY: 0, display: 'flex' }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 32,
          delay: 0.4,
        }}
        className="flex w-full justify-end"
      >
        <div className="flex w-max max-w-full flex-col items-end gap-3 rounded-xl rounded-br-none bg-zinc-800 p-6 xl:max-w-[70%]">
          <p className="rounded-lg text-sm text-zinc-400">Usuário</p>
          <p className="w-full whitespace-pre-line text-right">
            My favorite team is Chiefs
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ translateY: '100%', display: 'none' }}
        animate={{ translateY: 0, display: 'flex' }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 32,
          delay: 0.8,
        }}
        className="flex w-full justify-start"
      >
        <div className="flex max-w-full flex-col items-start gap-3 rounded-xl rounded-tl-none bg-zinc-800 p-6 xl:max-w-[70%]">
          <p className="rounded-lg text-sm text-zinc-400">TranslifyGO</p>
          <p className="w-full whitespace-pre-line">
            Você acertou! Muito bem! Vamos para a próxima pergunta: How long
            have you been studying English?
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ translateY: '100%', display: 'none' }}
        animate={{ translateY: 0, display: 'flex' }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 32,
          delay: 1.6,
        }}
        className="flex w-full justify-end"
      >
        <div className="flex w-max max-w-full flex-col items-end gap-3 rounded-xl rounded-br-none bg-zinc-800 p-6 xl:max-w-[70%]">
          <p className="rounded-lg text-sm text-zinc-400">Usuário</p>
          <p className="w-full whitespace-pre-line text-right">
            3 months but i watch series and movies
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ translateY: '100%', display: 'none' }}
        animate={{ translateY: 0, display: 'flex' }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 32,
          delay: 2.4,
        }}
        className="flex w-full justify-start"
      >
        <div className="flex max-w-full flex-col items-start gap-3 rounded-xl rounded-tl-none bg-zinc-800 p-6 xl:max-w-[70%]">
          <p className="rounded-lg text-sm text-zinc-400">TranslifyGO</p>
          <p className="w-full whitespace-pre-line">
            Em inglês, devemos usar o verbo "to watch" juntamente com a
            preposição "for" para indicar que fazemos algo por um período de
            tempo. Portanto, a correção seria: "I've been studying English for 3
            months, but I also watch series and movies in English to improve my
            skills."
            <br />
            <br />
            Mas você captou o conceito geral e usou o tempo verbal correto.
            Muito bem! Vamos para a próxima pergunta: What's the best book
            you've read recently?
          </p>
        </div>
      </motion.div>
    </div>
  )
}
