import { z } from 'zod';

const textPattern = /^[a-zA-Z0-9\s\-_',.!?]+$/;

const sanitizedText = z
	.string()
	.transform((val) => val.trim().replace(/\s+/g, ' '))
	.refine((val) => textPattern.test(val), {
		message: 'Cannot contain special characters'
	});

export const planSchema = z.object({
	activity: sanitizedText
		.refine((val) => val.length >= 3, {
			message: 'Activity must be at least 3 characters'
		})
		.refine((val) => val.length > 0, {
			message: 'Activity is required'
		})
});

export type PlanSchema = z.infer<typeof planSchema>;
