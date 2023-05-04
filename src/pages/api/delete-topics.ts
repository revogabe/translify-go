import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db'
import { TMessageRequest } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      const token = req.headers.authorization
      const query = req.query as TMessageRequest

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

      const deleteSystem = await db.system.delete({
        where: {
          id: query.systemId,
        },
      })

      await db.message.deleteMany({
        where: {
          systemId: query.systemId,
        },
      })

      if (!deleteSystem) {
        return res.status(404).send({ message: 'System not found' })
      }

      return res.status(201).send(deleteSystem)
    } catch (error) {
      return res.status(422).end()
    }
  }
}
