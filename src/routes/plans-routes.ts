import type { Elysia } from 'elysia';
import { PlanController } from '../controllers/index.js';
import { layout } from '../templates/layout.js';
import { PAGE_TITLES } from '../config/constants.js';
import { escapeHtml } from '../utils/http-helpers.js';

interface PlanRoutesParams {
	app: Elysia;
	planController: PlanController;
}

const clearPlansFeedbackOob = '<div id="plans-feedback" hx-swap-oob="innerHTML"></div>';

const plansErrorToastOob = (message: string): string =>
	`<div id="plans-feedback" hx-swap-oob="innerHTML"><div class="toast toast-error" aria-live="polite">${escapeHtml(message)}</div></div>`;

export const registerPlanRoutes = ({ app, planController }: PlanRoutesParams): void => {
	app
		.get('/plans', () => {
			return layout(planController.getPlans(), PAGE_TITLES.plans, 'plans');
		})
		.get('/api/plans', () => planController.getAll(true))
		.post('/plans', ({ body }) => {
			const formData = body as Record<string, unknown>;
			const result = planController.createPlan(formData);

			if ('error' in result) {
				const current = planController.getAll();
				const listHtml =
					typeof current === 'object' && current && 'html' in current ? String(current.html) : '';
				return `${listHtml}${plansErrorToastOob(result.error.message)}`;
			}

			return `${String(result.html)}${clearPlansFeedbackOob}`;
		})
		.put('/plans/:id', ({ params }) => {
			const result = planController.toggleComplete(params.id);
			if ('error' in result) return result.error.message;
			return result.html;
		})
		.put('/plans/:id/pin', ({ params }) => {
			const result = planController.togglePin(params.id);
			if ('error' in result) return result.error.message;
			return result.html;
		})
		.delete('/plans/:id', ({ params }) => {
			const result = planController.deletePlan(params.id);
			if ('error' in result) return result.error.message;
			return result.html;
		});
};
