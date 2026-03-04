import { Html } from '@elysiajs/html';
import type { Plan } from '@/types/database';
import { renderPlanCards } from '../components/plan-card.js';

export interface PlansPageData {
	plans: Plan[];
}

export const plansList = ({ plans }: PlansPageData) => {
	return renderPlanCards(plans);
};

export const plansPage = ({ plans }: PlansPageData) => {
	const totalPlans = plans.length;
	const completedPlans = plans.filter((plan) => plan.is_completed === 1).length;
	const pinnedPlans = plans.filter((plan) => plan.is_pinned === 1).length;
	const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

	return (
		<div id="plans" class="page">
		<h2>
			<i data-lucide="list-todo" aria-hidden="true"></i> My March Plans
		</h2>
		<p>Plan and track your March activities!</p>

		<div class="plans-top-grid">
			<div class="form-card">
				<h3>Add New Plan</h3>
				<form
					class="form plans-add-form"
					hx-post="/plans"
					hx-target="#plans-list"
					hx-swap="innerHTML"
					onsubmit="return validateForm(this)"
				>
					<div class="form-group">
						<label for="plan-input">Activity</label>
						<input
							type="text"
							id="plan-input"
							class="form-input"
							name="activity"
							placeholder="What do you want to do in March?"
							maxlength={100}
							aria-label="Activity name"
						/>
						<span class="error-message">
							Please enter a valid activity (3-100 characters, no special characters)
						</span>
					</div>
					<button type="submit" class="btn btn-primary">
						<span class="htmx-indicator">
							<span class="loading-spinner"></span>
						</span>
						<i data-lucide="plus" aria-hidden="true"></i> Add Plan
					</button>
				</form>
			</div>

			<aside class="plans-side-panel" aria-label="Plan summary">
				<div class="plans-side-head">
					<h3>
						<i data-lucide="bar-chart-3" aria-hidden="true"></i> Plan Snapshot
					</h3>
					<p class="plans-side-subtitle">Live progress from your current cards.</p>
				</div>
				<div class="plans-kpis">
					<div class="plans-kpi">
						<span class="plans-kpi-value" id="plans-total">{totalPlans}</span>
						<span class="plans-kpi-label">Total Plans</span>
					</div>
					<div class="plans-kpi">
						<span class="plans-kpi-value" id="plans-completed">{completedPlans}</span>
						<span class="plans-kpi-label">Completed</span>
					</div>
					<div class="plans-kpi">
						<span class="plans-kpi-value" id="plans-pinned">{pinnedPlans}</span>
						<span class="plans-kpi-label">Pinned</span>
					</div>
				</div>
				<div class="plans-progress" aria-hidden="true">
					<div class="plans-progress-fill" id="plans-progress-fill" style={`width:${completionRate}%`}></div>
				</div>
				<p class="plans-kpi-note">
					<span id="plans-rate">{completionRate}</span>% completion so far this month.
				</p>
			</aside>
		</div>

		<div class="cards-grid" id="plans-list">
			{renderPlanCards(plans) as 'safe'}
		</div>

		<script>
			{`(() => {
				const updatePlanSnapshot = () => {
					const list = document.getElementById('plans-list');
					if (!list) return;

					const cards = list.querySelectorAll('.card');
					const total = cards.length;
					const completed = list.querySelectorAll(".card[data-completed='1']").length;
					const pinned = list.querySelectorAll(".card[data-pinned='1']").length;
					const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

					const totalEl = document.getElementById('plans-total');
					const completedEl = document.getElementById('plans-completed');
					const pinnedEl = document.getElementById('plans-pinned');
					const rateEl = document.getElementById('plans-rate');
					const progressEl = document.getElementById('plans-progress-fill');

					if (totalEl) totalEl.textContent = String(total);
					if (completedEl) completedEl.textContent = String(completed);
					if (pinnedEl) pinnedEl.textContent = String(pinned);
					if (rateEl) rateEl.textContent = String(rate);
					if (progressEl) progressEl.style.width = rate + '%';
				};

				const bindPlanSnapshotUpdates = () => {
					const list = document.getElementById('plans-list');
					if (!list) return;

					const observer = new MutationObserver(() => {
						updatePlanSnapshot();
					});
					observer.observe(list, { childList: true, subtree: true });
				};

				document.addEventListener('DOMContentLoaded', () => {
					updatePlanSnapshot();
					bindPlanSnapshotUpdates();
				});

				document.body.addEventListener('htmx:afterSwap', (event) => {
					const target = event.detail?.target ?? event.target;
					if (!(target instanceof Element)) return;
					if (target.id === 'plans-list' || target.closest('#plans-list')) {
						updatePlanSnapshot();
					}
				});
			})();`}
		</script>
		</div>
	);
};
