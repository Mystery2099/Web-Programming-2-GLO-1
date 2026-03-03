import type { Elysia } from 'elysia';
import { TipController } from '../controllers/index.js';
import { layout } from '../templates/layout.js';
import { tipsList, tipsPage } from '../templates/pages/tips.js';
import { PAGE_TITLES } from '../config/constants.js';
import type { TipsPageData } from '../templates/pages/tips.js';

interface TipRoutesParams {
	app: Elysia;
	tipController: TipController;
}

export const registerTipRoutes = ({ app, tipController }: TipRoutesParams): void => {
	app
		.get('/tips', ({ query, request }) => {
			const search = (query.search as string) || '';
			const tips = search
				? tipController
						.getAll()
						.filter((t) => t.content.toLowerCase().includes(search.toLowerCase()))
				: tipController.getAll();
			const isHtmx = request.headers.get('HX-Request') === 'true';
			const tipsData: TipsPageData = { tips, search };
			if (isHtmx) {
				return tipsList(tips);
			}
			return layout(tipsPage(tipsData), PAGE_TITLES.tips, 'tips');
		})
		.get('/api/tips', () => tipController.getAll());
};
