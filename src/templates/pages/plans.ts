import { escapeHtml } from '../styles.js';
import type { Plan } from '../../types/database.js';

export interface PlansPageData {
	plans: Plan[];
}

export const plansPage = ({ plans }: PlansPageData) => {
	const cardsHTML =
		plans.length === 0
			? '<p>No plans yet. Add your first March plan above!</p>'
			: plans
					.map(
						(p: Plan, index: number) => `
        <div class="card ${p.is_completed ? 'completed' : ''} card-animate" id="card-${p.id}" style="">
      <button class="card-delete"
              aria-label="Delete plan"
              hx-delete="/plans/${p.id}"
              hx-target="#plans-list"
              hx-swap="innerHTML"
              hx-confirm="Are you sure you want to delete '${escapeHtml(p.activity)}'?">
        <i data-lucide="x" aria-hidden="true"></i>
      </button>
      <h3>${escapeHtml(p.activity)}</h3>
      <p class="date">Status: ${p.is_completed ? 'Completed' : 'Pending'}</p>
      <div class="card-actions">
        <button class="btn btn-small btn-secondary"
                hx-put="/plans/${p.id}"
                hx-target="#plans-list"
                hx-swap="innerHTML">
          ${p.is_completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button class="btn btn-small ${p.is_pinned ? 'btn-pinned' : 'btn-pin'}"
                aria-label="${p.is_pinned ? 'Unpin plan' : 'Pin plan'}"
                hx-put="/plans/${p.id}/pin"
                hx-target="#plans-list"
                hx-swap="innerHTML">
          <i data-lucide="${p.is_pinned ? 'pin-off' : 'pin'}" aria-hidden="true"></i>
        </button>
      </div>
    </div>`
					)
					.join('');

	const innerContent = `
  <h2><i data-lucide="list-todo" aria-hidden="true"></i> My March Plans</h2>
  <p>Plan and track your March activities!</p>

  <div class="form-card">
    <h3>Add New Plan</h3>
    <form hx-post="/plans" hx-target="#plans-list" hx-swap="innerHTML" onsubmit="return validateForm(this)">
      <div class="form-group">
        <label for="plan-input">Activity:</label>
        <input type="text" id="plan-input" name="activity" placeholder="What do you want to do in March?" maxlength="100" aria-label="Activity name">
        <span class="error-msg">Please enter a valid activity (3-100 characters, no special characters)</span>
      </div>
      <button type="submit" class="btn btn-primary">
        <span class="htmx-indicator"><span class="loading-spinner"></span></span>
        <i data-lucide="plus" aria-hidden="true"></i> Add Plan
      </button>
    </form>
  </div>

  <div class="cards-grid" id="plans-list">
    <span class="htmx-indicator text-center htmx-indicator-block" aria-live="polite">
      <span class="loading-spinner loading-spinner-lg"></span>
    </span>
    ${cardsHTML}
  </div>`;

	return `<div id="plans" class="page">${innerContent}</div>`;
};
