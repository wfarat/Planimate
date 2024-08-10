import { z } from 'zod';

export const userSchema = z.object({
	_id: z.string(),
	username: z.string(),
	email: z.string(),
	password: z.string(),
});

export type UserResponse = {
	message: string;
};

export type RegisterVariables = {
	email: string;
	username: string;
	password: string;
};

export type LoginVariables = {
	formData: FormData;
};

export type LoginResponse = {
	access_token: string;
	token_type: string;
};
