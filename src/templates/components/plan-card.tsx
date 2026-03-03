import { Html } from '@elysiajs/html';
import type { Plan } from '@/types/database';

export interface PlanCardProps {
	plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => (
	<div class={`card ${plan.is_completed ? 'completed' : ''} card-animate`} id={`card-${plan.id}`}>
		<button
			class="btn btn-danger btn-small card-delete"
			aria-label="Delete plan"
			hx-delete={`/plans/${plan.id}`}
			hx-target="#plans-list"
			hx-swap="innerHTML"
			hx-confirm={`Are you sure you want to delete '${plan.activity}'?`}
		>
			<i data-lucide="x" aria-hidden="true"></i>
		</button>
		<h3>{plan.activity as 'safe'}</h3>
		<p class="date">Status: {plan.is_completed ? 'Completed' : 'Pending'}</p>
		<div class="card-actions">
			<button
				class="btn btn-small btn-secondary"
				hx-put={`/plans/${plan.id}`}
				hx-target="#plans-list"
				hx-swap="innerHTML"
			>
				{plan.is_completed ? 'Mark Incomplete' : 'Mark Complete'}
			</button>
			<button
				class={`btn btn-small ${plan.is_pinned ? 'btn-pinned' : 'btn-pin'}`}
				aria-label={plan.is_pinned ? 'Unpin plan' : 'Pin plan'}
				hx-put={`/plans/${plan.id}/pin`}
				hx-target="#plans-list"
				hx-swap="innerHTML"
			>
				<i data-lucide={plan.is_pinned ? 'pin-off' : 'pin'} aria-hidden="true"></i>
			</button>
		</div>
	</div>
);

export const renderPlanCards = (plans: Plan[]): string => {
	if (plans.length === 0) {
		return `
			<div class="empty-state">
				<div class="empty-state__icon">🗓️</div>
				<h3 class="empty-state__title">No plans yet</h3>
				<p class="empty-state__description">
					Add your first March adventure to start building momentum.
				</p>
			</div>
		`;
	}
	
	return plans.map((plan) => <PlanCard plan={plan} />).join('') as 'safe';
};
