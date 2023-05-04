import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization

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

      const findSystem = await db.system.findMany({
        where: {
          userId: findUser?.id,
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
