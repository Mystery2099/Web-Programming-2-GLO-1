import { escapeHtml } from '../styles.js';
import type { Tip } from '../../types/database.js';

export interface TipsPageData {
	tips: Tip[];
	search: string;
}

export const tipsPage = ({ tips, search = '' }: TipsPageData) => {
	return `
<div id="tips" class="page">
  <h2><i data-lucide="lightbulb"></i> Safety Tips for March</h2>
  <p>Stay safe while enjoying March celebrations!</p>

  <div class="search-filter">
    <label for="tip-search" class="sr-only">Search tips</label>
    <input type="text" id="tip-search" class="search-input" placeholder="Search tips..."
           value="${escapeHtml(search)}"
           hx-get="/tips"
           hx-target="#tips-list"
           hx-trigger="input changed delay:300ms"
           hx-vals='{"search": this.value}'>
  </div>

  <div class="cards-grid" id="tips-list">
    ${tips
			.map(
				(t) => `
    <div class="card">
      <h3><i data-lucide="shield-check" aria-hidden="true"></i> ${escapeHtml(t.title)}</h3>
      <p>${escapeHtml(t.content)}</p>
      <span class="tag">${escapeHtml(t.category)}</span>
    </div>`
			)
			.join('')}
  </div>
</div>`;
};
