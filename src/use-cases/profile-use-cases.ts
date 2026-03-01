/**
 * Profile Use Cases
 * Business logic for profile operations
 * @module use-cases/profile-use-cases
 */

import type { Profile } from '../types/database.js';
import type { IProfileRepository } from '../domain/ports/profile-repository.js';

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
}

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

		const validFields = [
			'ambassador_name',
			'favorite_activity',
			'go_to_tradition',
			'march_mood',
			'celebration_style',
			'favorite_color',
			'march_motto',
			'squad_size',
			'dream_destination',
			'bucket_list_count',
			'st_patricks_preference',
			'spring_level'
		];

		const updateData: Partial<Profile> = {};

		for (const [key, value] of Object.entries(dto)) {
			if (validFields.includes(key) && value !== undefined) {
				(updateData as Record<string, unknown>)[key] = value;
			}
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
