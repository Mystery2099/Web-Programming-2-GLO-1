import { escapeHtml } from '../styles.js';

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

	return `
<div id="add-holiday" class="page">
  <a href="/holidays" class="back-link">
    <i data-lucide="arrow-left" aria-hidden="true"></i>
    <span>Back to Holidays</span>
  </a>

  <h2><i data-lucide="calendar-plus" aria-hidden="true"></i> Add March Holiday</h2>
  <p>Add a new holiday to the March celebration!</p>

  <div class="form-card">
    <form action="/holidays" method="post" onsubmit="return validateHolidayForm(this)">
      <div class="form-group${fieldName === 'name' ? ' invalid' : ''}">
        <label for="holiday-name">Holiday Name:</label>
        <input type="text"
               id="holiday-name"
               name="name"
               placeholder="e.g., Ice Cream Day"
               maxlength="100"
               required>
        <span class="error-msg" style="display: ${error && fieldName === 'name' ? 'block' : 'none'}; color: red;">${error || 'Please enter a valid holiday name (3-100 characters, no special characters)'}</span>
      </div>

      <div class="form-group${fieldName === 'day' ? ' invalid' : ''}">
        <label for="holiday-day">Day (March 1-31):</label>
        <select id="holiday-day" name="day" required>
          ${days.map((day) => `<option value="${day}">March ${day}</option>`).join('')}
        </select>
        <span class="error-msg" style="display: ${error && fieldName === 'day' ? 'block' : 'none'}; color: red;">${error || 'Please select a valid day'}</span>
      </div>

      <div class="form-group${fieldName === 'type' ? ' invalid' : ''}">
        <label for="holiday-type">Type:</label>
        <select id="holiday-type" name="type" required>
          ${types.map((type) => `<option value="${type}">${type}</option>`).join('')}
        </select>
        <span class="error-msg" style="display: ${error && fieldName === 'type' ? 'block' : 'none'}; color: red;">${error || 'Please select a valid holiday type'}</span>
      </div>

      <div class="form-group">
        <label for="holiday-description">Description (optional):</label>
        <textarea id="holiday-description"
                  name="description"
                  placeholder="Describe this holiday..."
                  rows="3"
                  maxlength="500"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary"><i data-lucide="plus" aria-hidden="true"></i> Add Holiday</button>
        <a href="/holidays" class="btn btn-secondary btn-cancel"><i data-lucide="x" aria-hidden="true"></i> Cancel</a>
      </div>
    </form>
  </div>
</div>

<script>
  function validateHolidayForm(form) {
    let isValid = true;
    const nameInput = form.querySelector('#holiday-name');
    const dayInput = form.querySelector('#holiday-day');

    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      nameInput.closest('.form-group').classList.add('invalid');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('invalid');
    }

    const nameRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (nameRegex.test(nameInput.value)) {
      nameInput.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    const day = parseInt(dayInput.value);
    if (!day || day < 1 || day > 31) {
      dayInput.closest('.form-group').classList.add('invalid');
      isValid = false;
    } else {
      dayInput.closest('.form-group').classList.remove('invalid');
    }

    return isValid;
  }
</script>

<style>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    transition: all 0.2s ease;
    margin-bottom: 1.5rem;
    background: rgba(201, 122, 88, 0.08);
    border: 2px solid transparent;
  }

  .back-link:hover {
    background: rgba(201, 122, 88, 0.15);
    transform: translateX(-4px);
    border-color: rgba(201, 122, 88, 0.2);
  }

  .back-link span {
    color: inherit;
  }

  .back-link i {
    transition: transform 0.2s ease;
  }

  .back-link:hover i {
    transform: translateX(-3px);
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-start;
  }

  .btn-cancel {
    background: linear-gradient(135deg, #E8E4DD, #D8D4CD);
    color: #666;
    border: 2px solid rgba(0, 0, 0, 0.05);
  }

  .btn-cancel:hover {
    background: linear-gradient(135deg, #D8D4CD, #C8C4BD);
    color: #444;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
</style>
`;
};
