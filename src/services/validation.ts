import { z } from 'zod';
import { holidaySchema } from '@/schemas/holiday.schema';
import { planSchema } from '@/schemas/plan.schema';
import { profileSchema } from '@/schemas/profile.schema';

export interface ValidationError {
	field: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
	data?: {
		name: string;
		day: number;
		type: string;
		description?: string;
	};
}

function convertZodErrors(error: z.ZodError): ValidationError[] {
	return error.issues.map((issue) => ({
		field: issue.path.join('.'),
		message: issue.message
	}));
}

export const validateHolidayName = (name: string): ValidationError | null => {
	const result = holidaySchema.shape.name.safeParse(name);
	if (!result.success) {
		return convertZodErrors(result.error)[0];
	}
	return null;
};

export const validateHolidayDay = (day: string): ValidationError | null => {
	const result = holidaySchema.shape.day.safeParse(day);
	if (!result.success) {
		return convertZodErrors(result.error)[0];
	}
	return null;
};

export const validateHolidayType = (type: string): ValidationError | null => {
	const result = holidaySchema.shape.type.safeParse(type);
	if (!result.success) {
		return convertZodErrors(result.error)[0];
	}
	return null;
};

export const validateHoliday = (
	name: string,
	day: string,
	type: string,
	description?: string
): ValidationResult => {
	const result = holidaySchema.safeParse({ name, day, type, description });
	
	if (result.success) {
		return {
			valid: true,
			errors: [],
			data: {
				name: result.data.name,
				day: result.data.day,
				type: result.data.type,
				description: result.data.description
			}
		};
	}
	
	return {
		valid: false,
		errors: convertZodErrors(result.error)
	};
};

export const validatePlanActivity = (activity: string): ValidationError | null => {
	const result = planSchema.shape.activity.safeParse(activity);
	if (!result.success) {
		return convertZodErrors(result.error)[0];
	}
	return null;
};

export const validateProfileField = (field: string, value: string): ValidationError | null => {
	const fieldSchema = profileSchema.shape[field as keyof typeof profileSchema.shape];
	
	if (!fieldSchema) {
		return { field, message: 'Invalid field name' };
	}
	
	const result = fieldSchema.safeParse(value);
	if (!result.success) {
		return convertZodErrors(result.error)[0];
	}
	return null;
};
