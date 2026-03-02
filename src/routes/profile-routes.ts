import type { Elysia } from 'elysia';
import { ProfileController } from '../controllers/index.js';
import { redirectTo } from '../utils/http-helpers.js';

interface ProfileRoutesParams {
	app: Elysia;
	profileController: ProfileController;
}

export const registerProfileRoutes = ({ app, profileController }: ProfileRoutesParams): void => {
	app
		.get('/profile', () => profileController.getProfile())
		.post('/profile', ({ body }) => {
			const formData = body as Record<string, unknown>;
			const result = profileController.updateProfile(formData);

			if ('error' in result) {
				return result.error.message;
			}

			return redirectTo(result.redirect ?? '/profile');
		});
};
