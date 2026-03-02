/**
 * Profile Use Cases
 * Business logic for profile operations
 * @module use-cases/profile-use-cases
 */

import type { Profile } from '../types/database.js';
import type { IProfileRepository } from '../domain/ports/profile-repository.js';
import { validateProfileField, type ValidationError } from '../services/validation.js';
import { sanitizeText } from '../utils/validation.js';

export interface UpdateProfileDTO {
	ambassador_name?: string;
	favorite_activity?: string;
	go_to_tradition?: string;
	march_mood?: string;
	celebration_style?: string;
	favorite_color?: string;
	march_motto?: string;
	squad_size?: string;
	dream_destination?: string;
	bucket_list_count?: number;
	st_patricks_preference?: string;
	spring_level?: number;
}

export interface UseCaseResult<T> {
	success: boolean;
	data?: T;
	error?: string;
	validationErrors?: ValidationError[];
}

const TEXT_FIELDS = [
	'ambassador_name',
	'favorite_activity',
	'go_to_tradition',
	'march_mood',
	'celebration_style',
	'favorite_color',
	'march_motto',
	'squad_size',
	'dream_destination',
	'st_patricks_preference'
] as const;

const NUMBER_FIELDS = ['bucket_list_count', 'spring_level'] as const;

export class ProfileUseCases {
	constructor(private profileRepo: IProfileRepository) {}

	getProfile(): Profile | undefined {
		return this.profileRepo.get();
	}

	updateProfile(dto: UpdateProfileDTO): UseCaseResult<Profile> {
		const profile = this.profileRepo.get();

		if (!profile) {
			return { success: false, error: 'Profile not found' };
		}

		const validFields = [...TEXT_FIELDS, ...NUMBER_FIELDS];
		const validationErrors: ValidationError[] = [];
		const updateData: Partial<Profile> = {};

		for (const [key, value] of Object.entries(dto)) {
			if (!validFields.includes(key as typeof validFields[number]) || value === undefined) continue;

			if (TEXT_FIELDS.includes(key as (typeof TEXT_FIELDS)[number])) {
				const sanitized = sanitizeText(String(value));
				const error = validateProfileField(key, sanitized);
				if (error) {
					validationErrors.push(error);
				} else {
					(updateData as Record<string, unknown>)[key] = sanitized;
				}
			} else if (NUMBER_FIELDS.includes(key as (typeof NUMBER_FIELDS)[number])) {
				const num = Number(value);
				if (!isNaN(num) && num >= 0) {
					(updateData as Record<string, unknown>)[key] = num;
				}
			}
		}

		if (validationErrors.length > 0) {
			return { success: false, validationErrors };
		}

		if (Object.keys(updateData).length === 0) {
			return { success: false, error: 'No valid fields to update' };
		}

		const success = this.profileRepo.update(updateData);

		if (!success) {
			return { success: false, error: 'Failed to update profile' };
		}

		return { success: true, data: this.profileRepo.get() };
	}
}
