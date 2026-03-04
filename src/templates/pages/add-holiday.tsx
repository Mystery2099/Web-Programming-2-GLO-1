import { Html } from '@elysiajs/html';

export const addHolidayPage = (error = '', fieldName = '') => {
	const types = [
		'Cultural',
		'Global',
		'Fun',
		'Astronomical',
		'Environmental',
		'Religious',
		'Awareness'
	];
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	return (
		<div id="add-holiday" class="page add-holiday-page">
			<a href="/holidays" class="back-link add-holiday-back-link">
				<i data-lucide="arrow-left" aria-hidden="true"></i>
				<span>Back to Holidays</span>
			</a>

			<div class="add-holiday-header">
				<h2>
					<i data-lucide="calendar-plus" aria-hidden="true"></i> Add March Holiday
				</h2>
				<p>Add a new holiday to the March celebration.</p>
			</div>

			<div class="add-holiday-form-card">
				<form class="form add-holiday-form" action="/holidays" method="post">
					<div class={`form-group ${fieldName === 'name' ? 'invalid' : ''}`}>
						<label for="holiday-name">Holiday Name</label>
						<input
							type="text"
							id="holiday-name"
							class="form-input"
							name="name"
							placeholder="e.g., Ice Cream Day"
							maxlength={100}
							required
						/>
						<span class={`error-message ${error && fieldName === 'name' ? 'is-visible' : ''}`}>
							{error ||
								'Please enter a valid holiday name (3-100 characters, no special characters).'}
						</span>
					</div>

					<div class="form-row">
						<div class={`form-group ${fieldName === 'day' ? 'invalid' : ''}`}>
							<label for="holiday-day">Day (March 1-31)</label>
							<select id="holiday-day" name="day" class="form-select" required>
								{days.map((day) => (
									<option value={String(day)}>{`March ${day}`}</option>
								))}
							</select>
							<span class={`error-message ${error && fieldName === 'day' ? 'is-visible' : ''}`}>
								{error || 'Please select a valid day.'}
							</span>
						</div>

						<div class={`form-group ${fieldName === 'type' ? 'invalid' : ''}`}>
							<label for="holiday-type">Type</label>
							<select id="holiday-type" name="type" class="form-select" required>
								{types.map((type) => (
									<option value={type}>{type}</option>
								))}
							</select>
							<span class={`error-message ${error && fieldName === 'type' ? 'is-visible' : ''}`}>
								{error || 'Please select a valid holiday type.'}
							</span>
						</div>
					</div>

					<div class="form-group">
						<label for="holiday-description">Description (optional)</label>
						<textarea
							id="holiday-description"
							name="description"
							class="form-textarea"
							placeholder="Describe this holiday..."
							rows="3"
							maxlength={500}
						></textarea>
					</div>

					<div class="form-actions add-holiday-actions">
						<button type="submit" class="btn btn-primary">
							<i data-lucide="plus" aria-hidden="true"></i> Add Holiday
						</button>
						<a href="/holidays" class="btn btn-outline btn-cancel">
							<i data-lucide="x" aria-hidden="true"></i> Cancel
						</a>
					</div>
				</form>
			</div>

		</div>
	);
};
