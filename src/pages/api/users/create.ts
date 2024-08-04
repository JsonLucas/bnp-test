/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser, IUserCreate } from '@/types/user';
import { getData } from '@/utils/db.utils';
import path from 'path';
import fs from 'fs';

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido.' });

	try {
		const { name, email }: IUserCreate = req.body;

		const filePath = path.join(process.cwd(), 'src/data', 'users.json');

		const previousData = getData();
		if(!previousData) return res.status(404).json({ error: 'Dados de usuários não encontrados.' });

		if(previousData.find((item) => item.email === email)) return res.status(409).json({ error: 'Este email já está cadastrado.' });
		let fileData: IUser[] = previousData;

		const id = fileData.length > 0 ? fileData[fileData.length - 1].id + 1 : 1;
		const newUser: IUser = {
			id,
			name,
			email,
		};

		fileData.push(newUser);
		fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

		res.status(201).json({ message: 'Usuário criado com sucesso!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro interno no servidor.' });
	}
};
