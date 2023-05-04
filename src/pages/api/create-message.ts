import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db'
import { TMessageRequest } from '@/types'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization
      const { systemId, role, content } = req.body as TMessageRequest

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

      const findSystem = await db.system.findUnique({
        where: {
          id: systemId,
        },
      })

      if (!findSystem) {
        return res.status(404).end()
      }

      const newMessage = await db.message.create({
        data: {
          role,
          content: `Responda minha seguinte frase em ingles e em seguinda a corrija em portugues, me explique oque eu errei e porque e me responda uma proxima pergunta em inglês: ${content}`,
          createdAt: new Date(),
          systemId,
        },
      })

      if (!newMessage) {
        return res.status(500).end()
      }

      const findMessages = await db.message.findMany({
        where: {
          systemId,
        },
      })

      const historyMessages = findMessages.map(({ role, content }) => ({
        role,
        content,
      }))

      const findSystemId = await db.system.findMany({
        where: {
          id: systemId,
        },
      })

      const systemOnlyRoleAndContent = findSystemId.map(
        ({ role, content }) => ({
          role,
          content,
        }),
      )

      const combinedMessages = systemOnlyRoleAndContent.concat(historyMessages)

      // Request API GPT
      const apiUrl = 'https://api.openai.com/v1/chat/completions'
      const authToken = process.env.NEXT_PUBLIC_OPENAI_SECRET

      // Configuração do cabeçalho de autenticação
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }

      // Corpo da solicitação
      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: combinedMessages,
      }

      const completion = await axios
        .post(apiUrl, requestBody, { headers })
        .then((response) => {
          return response.data.choices[0]
        })

      await db.message.create({
        data: {
          role: completion.message.role,
          content: completion.message.content,
          createdAt: new Date(),
          systemId,
        },
      })

      return res.status(201).send({ combinedMessages, completion })
    } catch (error) {
      return res.status(422).end()
    }
  }
}
