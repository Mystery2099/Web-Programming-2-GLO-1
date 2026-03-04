window.initAddHolidayPage = function initAddHolidayPage() {
	const root = document.getElementById('add-holiday');
	if (!root || root.dataset.jsBound === 'true') return;
	root.dataset.jsBound = 'true';

	const form = root.querySelector('.add-holiday-form');
	if (!(form instanceof HTMLFormElement)) return;

	const nameInput = form.querySelector('#holiday-name');
	const dayInput = form.querySelector('#holiday-day');
	const typeInput = form.querySelector('#holiday-type');

	if (!(nameInput instanceof HTMLInputElement)) return;
	if (!(dayInput instanceof HTMLSelectElement)) return;
	if (!(typeInput instanceof HTMLSelectElement)) return;

	const setInvalidState = (element, invalid) => {
		const group = element.closest('.form-group');
		if (!group) return;
		group.classList.toggle('invalid', invalid);
	};

	form.addEventListener('submit', (event) => {
		let isValid = true;

		const hasValidName = nameInput.value.trim().length >= 3;
		setInvalidState(nameInput, !hasValidName);
		if (!hasValidName) isValid = false;

		const hasDay = dayInput.value.length > 0;
		setInvalidState(dayInput, !hasDay);
		if (!hasDay) isValid = false;

		const hasType = typeInput.value.length > 0;
		setInvalidState(typeInput, !hasType);
		if (!hasType) isValid = false;

		if (!isValid) {
			event.preventDefault();
		}
	});
};
