import type { Elysia } from 'elysia';
import { PlanController } from '../controllers/index.js';
import { layout } from '../templates/layout.js';
import { plansPage } from '../templates/pages/plans.js';
import { PAGE_TITLES } from '../config/constants.js';
import { errorMessage } from '../utils/http-helpers.js';

interface PlanRoutesParams {
	app: Elysia;
	planController: PlanController;
}

export const registerPlanRoutes = ({ app, planController }: PlanRoutesParams): void => {
	app
		.get('/plans', () => {
			const { plans } = planController.getPlans();
			return layout(plansPage({ plans }), PAGE_TITLES.plans, 'plans');
		})
		.get('/api/plans', () => planController.getAll(true))
		.post('/plans', ({ body }) => {
			const formData = body as Record<string, unknown>;
			const result = planController.createPlan(formData);

			if ('error' in result) {
				return errorMessage(result.error ?? 'An error occurred');
			}

			return result.content;
		})
		.put('/plans/:id', ({ params }) => {
			const { id } = params;
			const { content } = planController.toggleComplete(id);
			return content;
		})
		.put('/plans/:id/pin', ({ params }) => {
			const { id } = params;
			const { content } = planController.togglePin(id);
			return content;
		})
		.delete('/plans/:id', ({ params }) => {
			const { id } = params;
			const { content } = planController.deletePlan(id);
			return content;
		});
};
