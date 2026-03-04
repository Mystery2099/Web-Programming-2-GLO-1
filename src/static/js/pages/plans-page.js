window.initPlansPage = function initPlansPage() {
	const root = document.getElementById('plans');
	if (!root || root.dataset.jsBound === 'true') return;
	root.dataset.jsBound = 'true';

	const updatePlanSnapshot = () => {
		const list = document.getElementById('plans-list');
		if (!list) return;

		const cards = list.querySelectorAll('.card');
		const total = cards.length;
		const completed = list.querySelectorAll(".card[data-completed='1']").length;
		const pinned = list.querySelectorAll(".card[data-pinned='1']").length;
		const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

		const totalEl = document.getElementById('plans-total');
		const completedEl = document.getElementById('plans-completed');
		const pinnedEl = document.getElementById('plans-pinned');
		const rateEl = document.getElementById('plans-rate');
		const progressEl = document.getElementById('plans-progress-fill');

		if (totalEl) totalEl.textContent = String(total);
		if (completedEl) completedEl.textContent = String(completed);
		if (pinnedEl) pinnedEl.textContent = String(pinned);
		if (rateEl) rateEl.textContent = String(rate);
		if (progressEl) progressEl.style.width = rate + '%';
	};

	const list = document.getElementById('plans-list');
	if (list) {
		const observer = new MutationObserver(() => {
			updatePlanSnapshot();
		});
		observer.observe(list, { childList: true, subtree: true });
	}

	document.body.addEventListener('htmx:afterSwap', (event) => {
		const target = event.detail?.target ?? event.target;
		if (!(target instanceof Element)) return;
		if (target.id === 'plans-list' || target.closest('#plans-list')) {
			updatePlanSnapshot();
		}
	});

	updatePlanSnapshot();
};
