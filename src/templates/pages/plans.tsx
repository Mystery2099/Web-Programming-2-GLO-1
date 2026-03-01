import { Html } from '@elysiajs/html';
import type { Plan } from '../../types/database.js';

export interface PlansPageData {
	plans: Plan[];
}

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
			{plans.length === 0 ? (
				<p>No plans yet. Add your first March plan above!</p>
			) : (
				plans.map((p) => (
					<div class={`card ${p.is_completed ? 'completed' : ''} card-animate`} id={`card-${p.id}`}>
						<button
							class="card-delete"
							aria-label="Delete plan"
							htmx-delete={`/plans/${p.id}`}
							htmx-target="#plans-list"
							htmx-swap="innerHTML"
							htmx-confirm={`Are you sure you want to delete '${p.activity}'?`}
						>
							<i data-lucide="x" aria-hidden="true"></i>
						</button>
						<h3>{p.activity as 'safe'}</h3>
						<p class="date">Status: {p.is_completed ? 'Completed' : 'Pending'}</p>
						<div class="card-actions">
							<button
								class="btn btn-small btn-secondary"
								htmx-put={`/plans/${p.id}`}
								htmx-target="#plans-list"
								htmx-swap="innerHTML"
							>
								{p.is_completed ? 'Mark Incomplete' : 'Mark Complete'}
							</button>
							<button
								class={`btn btn-small ${p.is_pinned ? 'btn-pinned' : 'btn-pin'}`}
								aria-label={p.is_pinned ? 'Unpin plan' : 'Pin plan'}
								htmx-put={`/plans/${p.id}/pin`}
								htmx-target="#plans-list"
								htmx-swap="innerHTML"
							>
								<i data-lucide={p.is_pinned ? 'pin-off' : 'pin'} aria-hidden="true"></i>
							</button>
						</div>
					</div>
				))
			)}
		</div>
	</div>
);
