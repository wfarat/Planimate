import { z } from 'zod';

export const userSchema = z.object({
	_id: z.string(),
	username: z.string(),
	email: z.string(),
	password: z.string(),
});

export type UserResponse = {
	_id: string;
	name: string;
	email: string;
	password: string;
};

export type RegisterVariables = {
	email: string;
	username: string;
	password: string;
};
