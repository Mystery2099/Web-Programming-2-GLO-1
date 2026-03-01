import { escapeHtml } from './styles.js';
import type { Holiday } from '../types/database.js';

export interface HolidaysPageData {
	holidays: Holiday[];
	types: string[];
	totalCount: number;
	search: string;
	filter: string;
	message: string;
	page: number;
	itemsPerPage: number;
}

export const holidaysPage = ({
	holidays,
	types,
	totalCount,
	search = '',
	filter = '',
	message = '',
	page = 1,
	itemsPerPage = 10
}: HolidaysPageData) => {
	const totalPages = Math.ceil(holidays.length / itemsPerPage);
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedHolidays = holidays.slice(startIndex, endIndex);

	const innerContent = `
  <div class="holidays-page-header">
    <div>
      <h2><i data-lucide="calendar-days" aria-hidden="true"></i> March Holidays and Events</h2>
      <p>Explore the many celebrations happening throughout March!</p>
    </div>
    <a href="/holidays/add" class="btn btn-primary"><i data-lucide="plus" aria-hidden="true"></i> Add Holiday</a>
  </div>

  ${message ? `<div class="toast toast-success" aria-live="polite">${escapeHtml(message)}</div>` : ''}

  <div class="search-filter">
    <form hx-get="/holidays" hx-target="#holidays" hx-swap="innerHTML" class="holidays-search-form">
      <label for="holiday-search" class="sr-only">Search holidays</label>
      <input type="search"
             id="holiday-search"
             class="search-input"
             placeholder="Search holidays..."
             value="${escapeHtml(search)}"
             name="search">
      <label for="holiday-filter" class="sr-only">Filter by type</label>
      <select id="holiday-filter"
               class="filter-select"
               name="filter">
        <option value="">All Types</option>
        ${types.map((t) => `<option value="${escapeHtml(t)}" ${filter === t ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
      </select>
      <button type="submit" class="btn btn-secondary btn-small">Filter</button>
      <input type="hidden" name="page" value="${page}">
      <input type="hidden" name="itemsPerPage" value="${itemsPerPage}">
    </form>
  </div>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Holiday</th>
          <th>Type</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="holidays-list">
        ${paginatedHolidays
					.map(
						(h) => `
        <tr tabindex="0" role="button" aria-label="Holiday: ${escapeHtml(h.name)}" onclick="if(localStorage.getItem('march_highlightEnabled') === 'true') this.classList.toggle('highlighted')" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if(localStorage.getItem('march_highlightEnabled') === 'true') this.classList.toggle('highlighted'); }">
          <td data-label="Date">March ${h.day}</td>
          <td data-label="Holiday"><strong>${escapeHtml(h.name)}</strong></td>
          <td data-label="Type"><span class="tag">${escapeHtml(h.type)}</span></td>
          <td data-label="Description">${escapeHtml(h.description)}</td>
          <td data-label="Actions">
            <button class="btn btn-small holidays-btn-danger"
                    aria-label="Delete holiday"
                    hx-delete="/holidays/${h.id}?search=${encodeURIComponent(search || '')}&filter=${encodeURIComponent(filter || '')}&page=${page}&itemsPerPage=${itemsPerPage}"
                    hx-target="#holidays"
                    hx-swap="innerHTML"
                    hx-confirm="Are you sure you want to delete '${escapeHtml(h.name)}'?">
              <i data-lucide="trash-2" aria-hidden="true"></i> Delete
            </button>
          </td>
        </tr>`
					)
					.join('')}
      </tbody>
    </table>
  </div>
  <div class="holidays-pagination">
    <span>Showing ${startIndex + 1}-${Math.min(endIndex, holidays.length)} of ${holidays.length} holidays</span>
    ${
			totalPages > 1
				? `
      <div class="holidays-pagination-controls">
        <button class="btn btn-small" ${page === 1 ? 'disabled' : ''}
                hx-get="/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page - 1}&itemsPerPage=${itemsPerPage}"
                hx-target="#holidays"
                hx-swap="innerHTML">Previous</button>
        <span>Page ${page} of ${totalPages}</span>
        <button class="btn btn-small" ${page === totalPages ? 'disabled' : ''}
                hx-get="/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page + 1}&itemsPerPage=${itemsPerPage}"
                hx-target="#holidays"
                hx-swap="innerHTML">Next</button>
      </div>
    `
				: ''
		}
  </div>

  <script>
  (() => {
    const toast = document.querySelector('.toast');
    if (toast) {
      setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 3000);
    }
  })();
</script>

<style>
  .holidays-page-header {
    display: flex;
    justify-content: space-between;
    align-itemsPerPage: flex-start;
    margin-bottom: 1.5rem;
  }
  .holidays-page-header h2 {
    margin: 0;
  }
  .holidays-page-header p {
    margin: 0.5rem 0 0;
  }
  .holidays-search-form {
    display: flex;
    gap: 0.5rem;
    align-itemsPerPage: center;
  }
  .holidays-search-form .search-input,
  .holidays-search-form .filter-select {
    flex: 1;
  }
  .holidays-btn-danger {
    background-color: #ef4444;
    color: white;
  }
  .holidays-btn-danger:hover {
    background-color: #dc2626;
  }
  .holidays-toast {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    animation: slideIn 0.3s ease-out;
  }
  .holidays-toast-success {
    background-color: #10b981;
    color: white;
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  .holidays-pagination {
    display: flex;
    justify-content: space-between;
    align-itemsPerPage: center;
    padding: 1rem 0;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .holidays-pagination-controls {
    display: flex;
    align-itemsPerPage: center;
    gap: 1rem;
  }
  .holidays-pagination-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>`;

	return `<div id="holidays" class="page">${innerContent}</div>`;
};
