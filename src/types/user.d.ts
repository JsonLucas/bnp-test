export interface IUser {
	id: number;
	name: string;
	email: string;
}

export type IUserCreate = Pick<IUser, 'name' | 'email'>;
