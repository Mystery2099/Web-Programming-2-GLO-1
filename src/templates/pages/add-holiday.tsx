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
		<div id="add-holiday" class="page">
			<a href="/holidays" class="back-link">
				<i data-lucide="arrow-left" aria-hidden="true"></i>
				<span>Back to Holidays</span>
			</a>

			<h2>
				<i data-lucide="calendar-plus" aria-hidden="true"></i> Add March Holiday
			</h2>
			<p>Add a new holiday to the March celebration!</p>

			<div class="form-card">
				<form action="/holidays" method="post" onsubmit="return validateHolidayForm(this)">
					<div class={`form-group ${fieldName === 'name' ? 'invalid' : ''}`}>
						<label for="holiday-name">Holiday Name:</label>
						<input
							type="text"
							id="holiday-name"
							name="name"
							placeholder="e.g., Ice Cream Day"
							maxlength={100}
							required
						/>
						<span
							class="error-msg"
							style={{ display: error && fieldName === 'name' ? 'block' : 'none', color: 'red' }}
						>
							{error ||
								'Please enter a valid holiday name (3-100 characters, no special characters)'}
						</span>
					</div>

					<div class={`form-group ${fieldName === 'day' ? 'invalid' : ''}`}>
						<label for="holiday-day">Day (March 1-31):</label>
						<select id="holiday-day" name="day" required>
							{days.map((day) => (
								<option value={day}>{`March ${day}`}</option>
							))}
						</select>
						<span
							class="error-msg"
							style={{ display: error && fieldName === 'day' ? 'block' : 'none', color: 'red' }}
						>
							{error || 'Please select a valid day'}
						</span>
					</div>

					<div class={`form-group ${fieldName === 'type' ? 'invalid' : ''}`}>
						<label for="holiday-type">Type:</label>
						<select id="holiday-type" name="type" required>
							{types.map((type) => (
								<option value={type}>{type}</option>
							))}
						</select>
						<span
							class="error-msg"
							style={{ display: error && fieldName === 'type' ? 'block' : 'none', color: 'red' }}
						>
							{error || 'Please select a valid holiday type'}
						</span>
					</div>

					<div class="form-group">
						<label for="holiday-description">Description (optional):</label>
						<textarea
							id="holiday-description"
							name="description"
							placeholder="Describe this holiday..."
							rows="3"
							maxlength={500}
						></textarea>
					</div>

					<div class="form-actions">
						<button type="submit" class="btn btn-primary">
							<i data-lucide="plus" aria-hidden="true"></i> Add Holiday
						</button>
						<a href="/holidays" class="btn btn-secondary btn-cancel">
							<i data-lucide="x" aria-hidden="true"></i> Cancel
						</a>
					</div>
				</form>
			</div>

			<script>
				{`function validateHolidayForm(form) {
					let isValid = true;
					const nameInput = form.querySelector('#holiday-name');
					const dayInput = form.querySelector('#holiday-day');

					if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
						nameInput.closest('.form-group').classList.add('invalid');
						isValid = false;
					} else {
						nameInput.closest('.form-group').classList.remove('invalid');
					}

					if (!dayInput.value) {
						dayInput.closest('.form-group').classList.add('invalid');
						isValid = false;
					} else {
						dayInput.closest('.form-group').classList.remove('invalid');
					}

					return isValid;
				}`}
			</script>

			<style>
				{`
					.form-group.invalid input,
					.form-group.invalid select,
					.form-group.invalid textarea {
						border-color: #ef4444;
					}

					.form-group .error-msg {
						font-size: 0.875rem;
						margin-top: 0.25rem;
						display: none;
					}
				`}
			</style>
		</div>
	);
};
