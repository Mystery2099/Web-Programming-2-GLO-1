import type { Elysia } from 'elysia';
import { PlanController } from '@/controllers';
import { layout } from '@/templates/layout';
import { PAGE_TITLES } from '@/config/constants';
import { escapeHtml } from '@/utils/http-helpers';

export interface PlanRoutesParams {
	app: Elysia;
	planController: PlanController;
}

const plansErrorToastOob = (message: string): string =>
	`<div id="plans-feedback" hx-swap-oob="innerHTML"><div class="toast toast-error" aria-live="polite">${escapeHtml(message)}</div></div>`;

const plansSuccessToastOob = (message: string): string =>
	`<div id="plans-feedback" hx-swap-oob="innerHTML"><div class="toast toast-success" aria-live="polite">${escapeHtml(message)}</div></div>`;

/**
 * Plans route group.
 *
 * Design note:
 * - Plans are edited in-place with HTMX.
 * - Feedback toasts are returned as out-of-band (OOB) fragments so the list
 *   and feedback area can update in one response without full-page navigation.
 */
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

			const html = 'html' in result ? result.html : '';
			return `${String(html)}${plansSuccessToastOob('Plan added successfully!')}`;
		})
		.put('/plans/:id', ({ params }) => {
			const result = planController.toggleComplete(params.id);
			if ('error' in result) return result.error.message;
			return 'html' in result ? result.html : '';
		})
		.put('/plans/:id/pin', ({ params }) => {
			const result = planController.togglePin(params.id);
			if ('error' in result) return result.error.message;
			return 'html' in result ? result.html : '';
		})
		.delete('/plans/:id', ({ params }) => {
			const result = planController.deletePlan(params.id);
			if ('error' in result) return result.error.message;
			return 'html' in result ? result.html : '';
		});
};
