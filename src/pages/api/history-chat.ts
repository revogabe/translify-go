import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db'
import { TMessageRequest } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization
      const { systemId } = req.query as TMessageRequest

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

      const findSystem = await db.system.findUnique({
        where: {
          id: systemId,
        },
      })

      if (!findSystem) {
        return res.status(404).send({ message: 'System not found' })
      }

      const historyChat = await db.message.findMany({
        where: {
          systemId,
        },
      })

      return res.status(201).send({ historyChat })
    } catch (error) {
      return res.status(422).end()
    }
  }
}
