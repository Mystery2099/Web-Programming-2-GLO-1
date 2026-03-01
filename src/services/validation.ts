/**
 * Validation Service
 * Provides validation functions for form inputs
 * @module services/validation
 */

import { HOLIDAY_TYPES, type HolidayType } from '../types/database.js';

export interface ValidationError {
	field: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
}

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export const validateHolidayName = (name: string): ValidationError | null => {
	const trimmed = name.trim();
	if (!trimmed) {
		return { field: 'name', message: 'Holiday name is required' };
	}
	if (trimmed.length < 3 || trimmed.length > 100) {
		return { field: 'name', message: 'Holiday name must be 3-100 characters' };
	}
	if (SPECIAL_CHAR_REGEX.test(trimmed)) {
		return { field: 'name', message: 'Holiday name cannot contain special characters' };
	}
	return null;
};

export const validateHolidayDay = (day: string): ValidationError | null => {
	const parsed = parseInt(day, 10);
	if (!parsed || parsed < 1 || parsed > 31) {
		return { field: 'day', message: 'Please select a valid day (1-31)' };
	}
	return null;
};

export const validateHolidayType = (type: string): ValidationError | null => {
	const trimmed = type.trim();
	if (!HOLIDAY_TYPES.includes(trimmed as HolidayType)) {
		return { field: 'type', message: 'Please select a valid holiday type' };
	}
	return null;
};

export const validateHoliday = (name: string, day: string, type: string): ValidationResult => {
	const errors: ValidationError[] = [];

	const nameError = validateHolidayName(name);
	if (nameError) errors.push(nameError);

	const dayError = validateHolidayDay(day);
	if (dayError) errors.push(dayError);

	const typeError = validateHolidayType(type);
	if (typeError) errors.push(typeError);

	return {
		valid: errors.length === 0,
		errors
	};
};

export const validatePlanActivity = (activity: string): ValidationError | null => {
	const trimmed = activity.trim();
	if (!trimmed) {
		return { field: 'activity', message: 'Activity is required' };
	}
	if (trimmed.length < 3) {
		return { field: 'activity', message: 'Activity must be at least 3 characters' };
	}
	if (SPECIAL_CHAR_REGEX.test(trimmed)) {
		return { field: 'activity', message: 'Activity cannot contain special characters' };
	}
	return null;
};
