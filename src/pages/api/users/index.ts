/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { getData } from '@/utils/db.utils';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido.' });

  const users = getData();
  if (!users) return res.status(404).json({ error: 'Dados de usuários não encontrados.' });

  if (users.length < 2) return res.status(400).json({ error: 'A lista de usuário possui menos de dois usuários cadastrados.' });

  return res.status(200).json(users);
};
