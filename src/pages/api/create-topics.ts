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
          email: token,
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
            'Agora você e um professor de inglês, eu irei fazer uma pergunta e voce ira corrigila, se eu errar voce me corrigi e me mostra oque eu errei em portugues, caso eu acerte voce continua a conversa comigo em ingles',

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
