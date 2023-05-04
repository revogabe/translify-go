import { db } from '@/lib/db' // Exemplo de módulo de acesso ao banco de dados

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    // Lida com erros de consulta ao banco de dados
    console.error('Erro ao buscar usuário pelo ID:', error)
    throw error
  }
}
