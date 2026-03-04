window.initHolidaysPage = function initHolidaysPage() {
	const root = document.getElementById('holidays');
	if (!root || root.dataset.jsBound === 'true') return;
	root.dataset.jsBound = 'true';

	const itemsPerPageSelect = root.querySelector('[data-action="change-items-per-page"]');
	if (itemsPerPageSelect instanceof HTMLSelectElement) {
		itemsPerPageSelect.addEventListener('change', () => {
			const form = itemsPerPageSelect.form;
			if (!form) return;
			const pageInput = form.querySelector('input[name="page"]');
			if (pageInput instanceof HTMLInputElement) {
				pageInput.value = '1';
			}
			form.requestSubmit();
		});
	}

	root.querySelectorAll('.holidays-delete-form').forEach((form) => {
		if (!(form instanceof HTMLFormElement)) return;
		form.addEventListener('submit', (event) => {
			const message = form.dataset.confirmMessage || 'Are you sure you want to continue?';
			if (!window.confirm(message)) {
				event.preventDefault();
			}
		});
	});
};
