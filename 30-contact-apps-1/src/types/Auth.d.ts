export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type User = {
	id: number;
	username: string;
	email: string;
	role: Role;
};
