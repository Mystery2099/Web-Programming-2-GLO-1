import { Html } from '@elysiajs/html';
import type { Holiday } from '@/types/database';
import { Toast } from '../components/toast.js';

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
	const totalPages = Math.ceil(totalCount / itemsPerPage);
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

			{message && <Toast message={message} type="success" />}

			<div class="search-filter">
				<form
					hx-get="/holidays"
					hx-target="#holidays"
					hx-swap="innerHTML"
					hx-push-url="true"
					class="holidays-search-form"
				>
					<div class="holidays-filter-main">
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
									<option value={t} selected={filter === t}>
										{t}
									</option>
								))}
						</select>
					</div>
					<div class="holidays-filter-meta">
						<div class="holidays-items-group">
							<label for="items-per-page" class="holidays-items-label">
								Items per page
							</label>
							<select
								id="items-per-page"
								class="filter-select holidays-items-select"
								name="itemsPerPage"
								onchange="const pageInput = this.form.querySelector('input[name=page]'); if (pageInput) pageInput.value = '1'; this.form.requestSubmit();"
							>
								<option value="5" selected={itemsPerPage === 5}>
									5
								</option>
								<option value="10" selected={itemsPerPage === 10}>
									10
								</option>
								<option value="25" selected={itemsPerPage === 25}>
									25
								</option>
								<option value="50" selected={itemsPerPage === 50}>
									50
								</option>
							</select>
						</div>
						<button type="submit" class="btn btn-primary btn-small holidays-apply-btn">
							Apply
						</button>
					</div>
					<input type="hidden" name="page" value={String(page)} />
				</form>
			</div>

			<div class="table-container">
				{paginatedHolidays.length > 0 ? (
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
								<tr id={`row-${h.id}`}>
									<td data-label="Date">March {h.day}</td>
									<td data-label="Holiday">
										<strong>{h.name}</strong>
									</td>
									<td data-label="Type">
										<span class="tag">{h.type}</span>
									</td>
									<td data-label="Description">{h.description ?? ''}</td>
									<td data-label="Actions">
										<form
											method="post"
											action={`/holidays/${h.id}/delete?search=${encodeURIComponent(search || '')}&filter=${encodeURIComponent(filter || '')}&page=${page}&itemsPerPage=${itemsPerPage}`}
											onsubmit={`return confirm("Are you sure you want to delete '${String(h.name).replace(/'/g, "\\'")}'?")`}
										>
											<button
												type="submit"
												class="btn btn-small btn-danger btn-icon-only"
												aria-label="Delete holiday"
											>
												<i data-lucide="trash-2" aria-hidden="true"></i>
											</button>
										</form>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div class="empty-state">
						<div class="empty-state__icon">📅</div>
						<h3 class="empty-state__title">No holidays found</h3>
						<p class="empty-state__description">
							Try adjusting your search or filters, or add a new holiday to get started.
						</p>
						<a href="/holidays/add" class="btn btn-primary empty-state__action">
							<i data-lucide="plus" aria-hidden="true"></i> Add Holiday
						</a>
					</div>
				)}
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
							hx-get={`/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page - 1}&itemsPerPage=${itemsPerPage}`}
							hx-target="#holidays"
							hx-swap="innerHTML"
							hx-push-url="true"
						>
							Previous
						</button>
						<span>
							Page {page} of {totalPages}
						</span>
						<button
							class="btn btn-small"
							disabled={page === totalPages}
							hx-get={`/holidays?search=${encodeURIComponent(search)}&filter=${encodeURIComponent(filter)}&page=${page + 1}&itemsPerPage=${itemsPerPage}`}
							hx-target="#holidays"
							hx-swap="innerHTML"
							hx-push-url="true"
						>
							Next
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
