import { Html } from '@elysiajs/html';
import type { Plan } from '../../types/database.js';
import { renderPlanCards } from '../components/plan-card.js';

export interface PlansPageData {
	plans: Plan[];
}

export const plansList = ({ plans }: PlansPageData) => {
	return renderPlanCards(plans);
};

export const plansPage = ({ plans }: PlansPageData) => (
	<div id="plans" class="page">
		<h2>
			<i data-lucide="list-todo" aria-hidden="true"></i> My March Plans
		</h2>
		<p>Plan and track your March activities!</p>

		<div class="form-card">
			<h3>Add New Plan</h3>
			<form
				hx-post="/plans"
				hx-target="#plans-list"
				hx-swap="innerHTML"
				onsubmit="return validateForm(this)"
			>
				<div class="form-group">
					<label for="plan-input">Activity:</label>
					<input
						type="text"
						id="plan-input"
						class="search-input"
						name="activity"
						placeholder="What do you want to do in March?"
						maxlength={100}
						aria-label="Activity name"
					/>
					<span class="error-msg">
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

		<div class="cards-grid" id="plans-list">
			{renderPlanCards(plans) as 'safe'}
		</div>
	</div>
);
