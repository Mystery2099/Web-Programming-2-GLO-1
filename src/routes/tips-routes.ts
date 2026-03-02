import type { Elysia } from 'elysia';
import { TipController } from '../controllers/index.js';
import { layout } from '../templates/layout.js';
import { PAGE_TITLES } from '../config/constants.js';

interface TipRoutesParams {
	app: Elysia;
	tipController: TipController;
}

export const registerTipRoutes = ({ app, tipController }: TipRoutesParams): void => {
	app
		.get('/tips', ({ query }) => {
			const search = (query.search as string) || '';
			const { content } = tipController.getTips(search);
			return layout(content, PAGE_TITLES.tips, 'tips');
		})
		.get('/api/tips', () => tipController.getAll());
};
