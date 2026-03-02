import type { Elysia } from 'elysia';
import { HolidayController } from '../controllers/index.js';
import { redirectTo } from '../utils/http-helpers.js';

interface HolidayRoutesParams {
	app: Elysia;
	holidayController: HolidayController;
}

export const registerHolidayRoutes = ({ app, holidayController }: HolidayRoutesParams): void => {
	app
		.get('/holidays', ({ query, request }) => {
			const params = query as {
				search?: string;
				filter?: string;
				page?: string;
				itemsPerPage?: string;
				message?: string;
			};
			return holidayController.getHolidays({
				...params,
				headers: request.headers
			});
		})
		.get('/holidays/add', ({ query }) => {
			const params = query as { error?: string; field?: string };
			return holidayController.getAddHolidayPage(
				params.error,
				params.field as 'name' | 'day' | 'type'
			);
		})
		.get('/api/holidays', () => holidayController.getAll())
		.post('/holidays', ({ body }) => {
			const formData = body as Record<string, unknown>;
			const result = holidayController.createHoliday(formData);

			if ('error' in result && result.error) {
				return holidayController.getAddHolidayPage(result.error.message, result.error.field);
			}

			if ('redirect' in result) {
				return redirectTo(result.redirect);
			}

			return result;
		})
		.delete('/holidays/:id', ({ params, query, request }) => {
			const { id } = params;
			const queryParams = query as {
				search?: string;
				filter?: string;
				page?: string;
				itemsPerPage?: string;
				message?: string;
			};
			return holidayController.deleteHoliday({
				id,
				...queryParams,
				headers: request.headers
			});
		});
};
