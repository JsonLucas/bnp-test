import z from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const createUserSchema = z.object({
    name: z.string().min(1, 'You must to provide a name.'),
    email: z.string().regex(emailRegex, 'You must to provide a valid email.')
});