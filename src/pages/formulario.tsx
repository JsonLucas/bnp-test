/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { createUserSchema } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function Form() {
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(createUserSchema) });
	const onSubmit = async (data: any) => {
		try{		
			const response = await fetch('/api/users/create', { 
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
				method: 'POST',
			});

			const message = await response.json();

			if(response.ok) alert('Yay! Formulário enviado com sucesso!');
			else  alert(message?.error || 'Algum erro ocorreu.');
		} catch(e: any) {
			alert('Ocorreu um erro ao enviar o formulário.');
			console.log(e);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.form}>
					<input {...register('name')} type="text" placeholder="Name" />
					{errors?.name && errors.name.message && <p>{errors.name.message.toString()}</p>}
					<input {...register('email')} type="email" placeholder="E-mail" />
					{errors?.email && errors.email.message && <p>{errors.email.message.toString()}</p>}

					<button type="button" onClick={handleSubmit(onSubmit)} data-type="confirm">
						Enviar
					</button>
				</div>
			</div>
		</div>
	);
}
