import type { ProfilePageData } from '../templates/pages/profile.js';
import { profilePage } from '../templates/pages/profile.js';
import { layout } from '../templates/layout.js';
import { ProfileUseCases, UpdateProfileDTO } from '../use-cases/index.js';
import type { ControllerResult } from '../types/controller.js';

export class ProfileController {
	constructor(private profileUseCases: ProfileUseCases) {}

	getProfile() {
		const profileData: ProfilePageData = { profile: this.profileUseCases.getProfile() };
		const content = profilePage(profileData);
		return layout(content, 'My Journey - March Celebration', 'profile');
	}

	updateProfile(data: Record<string, unknown>): ControllerResult {
		const dto: UpdateProfileDTO = {};

		if (data.ambassador_name !== undefined) dto.ambassador_name = String(data.ambassador_name);
		if (data.favorite_activity !== undefined) dto.favorite_activity = String(data.favorite_activity);
		if (data.go_to_tradition !== undefined) dto.go_to_tradition = String(data.go_to_tradition);
		if (data.march_mood !== undefined) dto.march_mood = String(data.march_mood);
		if (data.celebration_style !== undefined) dto.celebration_style = String(data.celebration_style);
		if (data.favorite_color !== undefined) dto.favorite_color = String(data.favorite_color);
		if (data.march_motto !== undefined) dto.march_motto = String(data.march_motto);
		if (data.squad_size !== undefined) dto.squad_size = String(data.squad_size);
		if (data.dream_destination !== undefined) dto.dream_destination = String(data.dream_destination);
		if (data.bucket_list_count !== undefined)
			dto.bucket_list_count = Number(data.bucket_list_count);
		if (data.st_patricks_preference !== undefined)
			dto.st_patricks_preference = String(data.st_patricks_preference);
		if (data.spring_level !== undefined) dto.spring_level = Number(data.spring_level);

		const result = this.profileUseCases.updateProfile(dto);
		if (!result.success) {
			return { error: { message: result.error ?? 'Failed to update profile' } };
		}
		return { redirect: '/profile' };
	}
}
