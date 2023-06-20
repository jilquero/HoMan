import { z } from 'zod';

export const productSchema = z.object({
	image: z.string(),
	name: z.string().min(2).max(30).trim(),
	description: z.string().min(2).max(30).trim(),
	barcode: z.string().min(0).max(30).trim(),
	tags: z.array(z.string().min(2).max(30).trim()).min(1).max(10),
	quantity: z.number().gte(0),
	minimumQuantity: z.number().gt(0).optional(),
	preferredQuantity: z.number().gt(0).optional()
});

export const warehouseSchema = z.object({
	name: z.string().min(2).max(30).trim(),
	icon: z.string().min(2).max(30).trim()
});

export const editUserRoleSchema = z.object({
	roles: z.array(z.string().min(2).max(30).trim()).min(1).max(10)
});

export const addUserSchema = z.object({
	email: z.string().email().min(2).max(30).trim()
});

export const newUserSchema = z
	.object({
		email: z.string().email().min(2).max(30).trim(),
		username: z.string().min(2).max(30).trim(),
		password: z.string().min(2).max(30).trim(),
		// password: z
		// 	.string()
		// 	.regex(
		// 		/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
		// 		'Password must contain at least 8 characters, 2 uppercase, 1 lowercase, 2 numbers, and 1 special character'
		// 	),
		confirmPassword: z.string().min(1, 'Confirm password is required'),
		firstName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		lastName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		image: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		phone: z
			.union([
				z
					.string()
					.regex(/^[0-9]{10}$/, 'Phone number must be 10 digits')
					.transform((x) => Number(x)),
				z.string().length(0)
			])
			.optional(),
		warehouseName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		warehouseIcon: z.string().min(2).max(30).trim().optional()
	})
	.refine(({ confirmPassword, password }) => confirmPassword === password, {
		message: 'The passwords do not match',
		path: ['confirmPassword']
	});

export const editUserSchema = z
	.object({
		email: z.string().email().min(2).max(30).trim(),
		username: z.string().min(2).max(30).trim(),
		password: z.union([z.string().min(2).max(30), z.string().length(0)]).optional(),
		// password: z
		// 	.string()
		// 	.regex(
		// 		/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
		// 		'Password must contain at least 8 characters, 2 uppercase, 1 lowercase, 2 numbers, and 1 special character'
		// 	),
		confirmPassword: z
			.union([z.string().min(1, 'Confirm password is required'), z.string().length(0)])
			.optional(),
		firstName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		lastName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		image: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
		phone: z
			.union([
				z
					.string()
					.regex(/^[0-9]{10}$/, 'Phone number must be 10 digits')
					.transform((x) => Number(x)),
				z.string().length(0)
			])
			.optional()
	})
	.refine(({ confirmPassword, password }) => confirmPassword === password, {
		message: 'The passwords do not match',
		path: ['confirmPassword']
	});

export const userSchema = z.object({
	email: z.string().email().min(2).max(30).trim(),
	username: z.string().min(2).max(30).trim(),
	password: z.string().min(2).max(30).trim(),
	// password: z
	// 	.string()
	// 	.regex(
	// 		/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
	// 		'Password must contain at least 8 characters, 2 uppercase, 1 lowercase, 2 numbers, and 1 special character'
	// 	),
	firstName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
	lastName: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
	image: z.union([z.string().min(2).max(30).trim(), z.string().length(0)]).optional(),
	phone: z
		.union([
			z
				.string()
				.regex(/^[0-9]{10}$/, 'Phone number must be 10 digits')
				.transform((x) => Number(x)),
			z.string().length(0)
		])
		.optional()
});

export const credentialsSchema = z.object({
	email: z.string().email().min(2).max(30).trim(),
	password: z.string().min(2).max(30).trim()
});
