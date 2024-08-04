/**
 * Lista
 *
 * - Primeiramente vá até /src/pages/api/users/index.ts e implemente a API
 * - Obter a lista de usuários da API
 * - Renderizar a lista de usuários
 */

import { useEffect, useState } from 'react';

import styles from '@/styles/lista.module.css';
import { IUser } from '@/types/user';

export default function Lista() {
	const [users, setUsers] = useState<Array<IUser>>([]);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/users');
				const data = await response.json();
				
				if (!response.ok) {
					setIsError(true);
					throw new Error('Erro ao obter os dados');
				}
	
				setUsers(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de usuários</h2>

				<div data-list-container>
					{isError && <div>Algum erro ocorreu, tente novamente mais tarde.</div>}
					{!isError && users.length > 0 && users.map((item) => <div data-list-item key={`${item.id}-${item.email}`}>ID {item.id} - {item.name} ({item.email})</div>)}
				</div>
			</div>
		</div>
	);
}
