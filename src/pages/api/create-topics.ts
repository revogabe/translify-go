import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization
      const { title } = req.body

      if (!token) {
        return res.status(401).end()
      }

      const findUser = await db.user.findUnique({
        where: {
          id: token,
        },
      })

      if (!findUser) {
        return res.status(401).end()
      }

      const findSystem = await db.system.create({
        data: {
          role: 'system',
          title,
          content:
            'Agora, eu sou seu assistente de inglês. Vou conversar com você em inglês e corrigir quaisquer erros de sintaxe que você cometer. Se você acertar, podemos continuar a conversa em inglês. Caso contrário, eu vou corrigi-lo em português e explicar o erro. Em seguida, farei uma pergunta em inglês para você responder. \n\nAqui esta um Exemplo de um erro e como voce deve me responder: Você cometeu um erro de digitação na palavra "tean". A forma correta seria "team". Então, a correção seria: "My favorite NFL team is Chiefs". \n\nParabéns pela tentativa! Agora, vamos para a próxima pergunta: How long have you been studying English? \n\nAqui está um Exemplo de um acerto e como voce deve me responder: Você acertou! Muito bem! Vamos para a próxima pergunta: What\'s your favorite video game to play?',

          userId: findUser.id,
        },
      })

      if (!findSystem) {
        return res.status(404).send({ message: 'System not found' })
      }

      return res.status(201).send(findSystem)
    } catch (error) {
      return res.status(422).end()
    }
  }
}
