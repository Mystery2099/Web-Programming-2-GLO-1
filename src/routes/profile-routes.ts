import type { Elysia } from 'elysia';
import { ProfileController } from '@/controllers';
import { redirectTo } from '@/utils/http-helpers';

interface ProfileRoutesParams {
	app: Elysia;
	profileController: ProfileController;
}

export const registerProfileRoutes = ({ app, profileController }: ProfileRoutesParams): void => {
	app
		.get('/profile', ({ query }) => {
			const message = typeof query.message === 'string' ? query.message : '';
			return profileController.getProfile(message);
		})
		.get('/profile/edit', ({ query }) => {
			const error = typeof query.error === 'string' ? query.error : '';
			const field = typeof query.field === 'string' ? query.field : '';
			return profileController.getEditProfile(error, field);
		})
		.post('/profile', ({ body }) => {
			const formData = body as Record<string, unknown>;
			const result = profileController.updateProfile(formData);

			if ('error' in result) {
				const message = encodeURIComponent(result.error.message);
				const field = result.error.field ? `&field=${encodeURIComponent(result.error.field)}` : '';
				return redirectTo(`/profile/edit?error=${message}${field}`);
			}

			const redirect = 'redirect' in result ? result.redirect : '/profile';
			return redirectTo(redirect);
		});
};
