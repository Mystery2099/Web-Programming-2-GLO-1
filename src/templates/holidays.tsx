import { Html } from '@elysiajs/html';
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

	return (
		<div id="holidays" class="page">
			<div class="holidays-page-header">
				<div>
					<h2>
						<i data-lucide="calendar-days" aria-hidden="true"></i> March Holidays and Events
					</h2>
					<p>Explore the many celebrations happening throughout March!</p>
				</div>
				<a href="/holidays/add" class="btn btn-primary">
					<i data-lucide="plus" aria-hidden="true"></i> Add Holiday
				</a>
			</div>

			{message && (
				<div class="toast toast-success" aria-live="polite" safe>
					{message}
				</div>
			)}

			<div class="search-filter">
				<form
					hx-get="/holidays"
					hx-target="#holidays"
					hx-swap="innerHTML"
					class="holidays-search-form"
				>
					<label for="holiday-search" class="sr-only">
						Search holidays
					</label>
					<input
						type="search"
						id="holiday-search"
						class="search-input"
						placeholder="Search holidays..."
						value={search}
						name="search"
					/>
					<label for="holiday-filter" class="sr-only">
						Filter by type
					</label>
					<select id="holiday-filter" class="filter-select" name="filter">
						<option value="">All Types</option>
						{types.map((t) => (
							<option value={t as 'safe'} selected={filter === t}>
								{t as 'safe'}
							</option>
						))}
					</select>
					<button type="submit" class="btn btn-secondary btn-small">
						Filter
					</button>
					<input type="hidden" name="page" value={String(page)} />
					<input type="hidden" name="itemsPerPage" value={String(itemsPerPage)} />
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
						{paginatedHolidays.map((h) => (
							<tr
								tabindex={0}
								role="button"
								aria-label={`Holiday: ${h.name}`}
								onclick={`if(localStorage.getItem('march_highlightEnabled') === 'true') this.classList.toggle('highlighted')`}
								onkeydown={`if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if(localStorage.getItem('march_highlightEnabled') === 'true') this.classList.toggle('highlighted'); }`}
								id={`row-${h.id}`}
							>
								<td data-label="Date">March {h.day}</td>
								<td data-label="Holiday">
									<strong>{h.name as 'safe'}</strong>
								</td>
								<td data-label="Type">
									<span class="tag">{h.type as 'safe'}</span>
								</td>
								<td data-label="Description">{h.description as 'safe'}</td>
								<td data-label="Actions">
									<button
										class="btn btn-small holidays-btn-danger"
										aria-label="Delete holiday"
										htmx-delete={`/holidays/${h.id}?search=${encodeURIComponent(search || '')}&filter=${encodeURIComponent(filter || '')}&page=${page}&itemsPerPage=${itemsPerPage}`}
										htmx-target="#holidays"
										htmx-swap="innerHTML"
										htmx-confirm={`Are you sure you want to delete '${h.name}'?`}
									>
										<i data-lucide="trash-2" aria-hidden="true"></i> Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div class="holidays-pagination">
				<span>
					Showing {startIndex + 1}-{Math.min(endIndex, holidays.length)} of {holidays.length}{' '}
					holidays
				</span>
				{totalPages > 1 && (
					<div class="holidays-pagination-controls">
						<button
							class="btn btn-small"
							disabled={page === 1}
							htmx-get={`/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page - 1}&itemsPerPage=${itemsPerPage}`}
							htmx-target="#holidays"
							htmx-swap="innerHTML"
						>
							Previous
						</button>
						<span>
							Page {page} of {totalPages}
						</span>
						<button
							class="btn btn-small"
							disabled={page === totalPages}
							htmx-get={`/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page + 1}&itemsPerPage=${itemsPerPage}`}
							htmx-target="#holidays"
							htmx-swap="innerHTML"
						>
							Next
						</button>
					</div>
				)}
			</div>

			<script>
				{`(() => {
					const toast = document.querySelector('.toast');
					if (toast) {
						setTimeout(() => {
							toast.style.animation = 'fadeOut 0.3s ease-out forwards';
							setTimeout(() => {
								toast.remove();
							}, 300);
						}, 3000);
					}
				})();`}
			</script>

			<style>
				{`.holidays-page-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
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
					align-items: center;
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
					align-items: center;
					padding: 1rem 0;
					flex-wrap: wrap;
					gap: 1rem;
				}
				.holidays-pagination-controls {
					display: flex;
					align-items: center;
					gap: 1rem;
				}
				.holidays-pagination-controls button:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}`}
			</style>
		</div>
	);
};
