import { z } from 'zod';
import { HOLIDAY_TYPES } from '@/types/database';

const textPattern = /^[a-zA-Z0-9\s\-_',.!?]+$/;

const sanitizedText = z
	.string()
	.transform((val) => val.trim().replace(/\s+/g, ' '))
	.refine((val) => textPattern.test(val), {
		message: 'Cannot contain special characters'
	});

export const holidaySchema = z.object({
	name: sanitizedText
		.refine((val) => val.length >= 3 && val.length <= 100, {
			message: 'Holiday name must be 3-100 characters'
		})
		.refine((val) => val.length > 0, {
			message: 'Holiday name is required'
		}),
	day: z
		.string()
		.transform((val) => parseInt(val, 10))
		.refine((val) => !isNaN(val) && val >= 1 && val <= 31, {
			message: 'Please select a valid day (1-31)'
		}),
	type: z.enum(HOLIDAY_TYPES, {
		message: 'Please select a valid holiday type'
	}),
	description: z
		.string()
		.transform((val) => val.trim().replace(/\s+/g, ' '))
		.refine((val) => val.length <= 500, {
			message: 'Description must be 500 characters or less'
		})
		.optional()
});

export type HolidaySchema = z.infer<typeof holidaySchema>;
