import { registerPlanRoutes } from './plans-routes.js';
import { registerHolidayRoutes } from './holidays-routes.js';
import { registerTipRoutes } from './tips-routes.js';
import { registerProfileRoutes } from './profile-routes.js';
import type { Controllers } from '../config/di-container.js';
import { layout } from '../templates/layout.js';
import { homePage, settingsPage } from '../templates/pages/index.js';
import { PAGE_TITLES } from '../config/constants.js';

export const registerAllRoutes = (app: any, controllers: Controllers): void => {
	app
		.get('/', () => layout(homePage(), PAGE_TITLES.home, 'home'))
		.get('/home', () => layout(homePage(), PAGE_TITLES.home, 'home'))
		.get('/settings', () => layout(settingsPage(), PAGE_TITLES.settings, 'settings'))
		.get('/*', () => layout(homePage(), PAGE_TITLES.home, 'home'));

	registerPlanRoutes({ app, planController: controllers.planController });
	registerHolidayRoutes({ app, holidayController: controllers.holidayController });
	registerTipRoutes({ app, tipController: controllers.tipController });
	registerProfileRoutes({ app, profileController: controllers.profileController });
};
