import { registerPlanRoutes } from './plans-routes.js';
import { registerHolidayRoutes } from './holidays-routes.js';
import { registerTipRoutes } from './tips-routes.js';
import { registerProfileRoutes } from './profile-routes.js';
import type { AnyElysia } from 'elysia';
import type { Controllers } from '@/config/di-container';
import { layout } from '@/templates/layout';
import { homePage, htmxErrorFragment, notFoundPage, settingsPage } from '@/templates/pages';
import { PAGE_TITLES } from '@/config/constants';

/**
 * Registers all route groups and shared top-level pages.
 *
 * Request flow in this project:
 * `route -> controller -> use-case -> repository -> template`.
 */
export const registerAllRoutes = (app: AnyElysia, controllers: Controllers): void => {
	app
		.get('/', () => layout(homePage(), PAGE_TITLES.home, 'home'))
		.get('/home', () => layout(homePage(), PAGE_TITLES.home, 'home'))
		.get('/settings', () => layout(settingsPage(), PAGE_TITLES.settings, 'settings'));

	registerPlanRoutes({ app, planController: controllers.planController });
	registerHolidayRoutes({ app, holidayController: controllers.holidayController });
	registerTipRoutes({ app, tipController: controllers.tipController });
	registerProfileRoutes({ app, profileController: controllers.profileController });

	app.all('/*', ({ request, set }) => {
		set.status = 404;
		const isHtmx = request.headers.get('HX-Request') === 'true';
		if (isHtmx) {
			return htmxErrorFragment(404, 'Resource not found.');
		}
		return layout(notFoundPage(), '404 - Page Not Found', 'home');
	});
};
