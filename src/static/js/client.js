if (typeof window.marchAppInitialized === 'undefined') {
	window.marchAppInitialized = true;

	window.isDark = localStorage.getItem('theme') === 'dark';
	window.toggleTheme = function () {
		window.isDark = !window.isDark;
		document.body.classList.toggle('dark', window.isDark);
		const btn = document.getElementById('settings-theme-btn');
		if (btn) {
			const textSpan = btn.querySelector('span');
			const icon = btn.querySelector('i');
			if (textSpan) textSpan.textContent = window.isDark ? 'Disable Dark Mode' : 'Enable Dark Mode';
			if (icon) icon.setAttribute('data-lucide', window.isDark ? 'sun' : 'moon');
			lucide.createIcons();
		}
		localStorage.setItem('theme', window.isDark ? 'dark' : 'light');
	};

	if (window.isDark) {
		document.body.classList.add('dark');
	}

	const mobileToggle = document.querySelector('.mobile-nav-toggle');
	const sidebar = document.querySelector('.sidebar');
	const overlay = document.querySelector('.sidebar-overlay');

	if (mobileToggle) {
		mobileToggle.addEventListener('click', () => {
			sidebar.classList.toggle('open');
			overlay.classList.toggle('open');
		});
	}

	if (overlay) {
		overlay.addEventListener('click', () => {
			sidebar.classList.remove('open');
			overlay.classList.remove('open');
		});
	}

	document.querySelectorAll('.nav-link').forEach((link) => {
		link.addEventListener('click', () => {
			if (window.innerWidth <= 768) {
				sidebar.classList.remove('open');
				overlay.classList.remove('open');
			}
		});
	});

	document.addEventListener('DOMContentLoaded', () => {
		window.setupSearch('holiday-search', '#holidays-list', 'tr');
		window.setupSearch('tip-search', '#tips-list', '.card');
		window.loadPreferences();

		document.body.addEventListener('htmx:afterSwap', () => {
			lucide.createIcons();
		});
	});
}

window.baseSize = 16;
window.updateTextSize = function (size) {
	window.baseSize = size;
	const el = document.getElementById('settings-size-value');
	if (el) el.textContent = size + 'px';
	document.documentElement.style.setProperty('--text-size', size + 'px');
	window.savePreference('textSize', size);
};

window.highlightEnabled = false;
window.toggleHighlight = function () {
	window.highlightEnabled = !window.highlightEnabled;
	const btn = document.getElementById('settings-highlight-btn');
	if (btn) {
		const textSpan = btn.querySelector('span');
		if (textSpan) textSpan.textContent = window.highlightEnabled ? 'Disable' : 'Enable';
	}
	window.savePreference('highlightEnabled', window.highlightEnabled);
};

window.validateForm = function (form) {
	const input = form.querySelector('input');
	const group = form.querySelector('.form-group');
	const value = input.value.trim();

	if (!value || value.length < 3 || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
		group.classList.add('invalid');
		return false;
	}

	group.classList.remove('invalid');
	return true;
};

window.setupSearch = function (inputId, containerId, itemSelector) {
	const input = document.getElementById(inputId);
	if (!input) return;

	input.addEventListener('input', () => {
		const term = input.value.toLowerCase();
		document.querySelectorAll(containerId + ' ' + itemSelector).forEach((item) => {
			const text = item.textContent.toLowerCase();
			item.style.display = text.includes(term) ? '' : 'none';
		});
	});
};

window.savePreference = function (key, value) {
	localStorage.setItem('march_' + key, value);
	if (key === 'itemsPerPage') {
		const holidaysDiv = document.getElementById('holidays');
		if (holidaysDiv) {
			fetch('/holidays?itemsPerPage=' + value)
				.then((response) => response.text())
				.then((html) => {
					holidaysDiv.innerHTML = html;
					lucide.createIcons();
				});
		}
	}
};

window.loadPreferences = function () {
	const itemsPerPage = localStorage.getItem('march_itemsPerPage');
	const defaultFilter = localStorage.getItem('march_defaultHolidayFilter');
	const animations = localStorage.getItem('march_animations');
	const textSize = localStorage.getItem('march_textSize');
	const highlight = localStorage.getItem('march_highlightEnabled');

	if (itemsPerPage) {
		const el = document.getElementById('items-per-page');
		if (el) el.value = itemsPerPage;
	}

	if (defaultFilter) {
		const el = document.getElementById('default-holiday-filter');
		if (el) el.value = defaultFilter;
	}

	if (animations === 'false') {
		const el = document.getElementById('animations-toggle');
		if (el) el.checked = false;
		document.documentElement.setAttribute('data-animations-enabled', 'false');
	} else {
		document.documentElement.setAttribute('data-animations-enabled', 'true');
	}

	if (textSize) {
		const el = document.getElementById('settings-text-size');
		if (el) el.value = textSize;
		window.updateTextSize(textSize);
	}

	if (highlight === 'true') {
		window.highlightEnabled = true;
		const btn = document.getElementById('settings-highlight-btn');
		if (btn) {
			const textSpan = btn.querySelector('span');
			if (textSpan) textSpan.textContent = 'Disable';
		}
	}

	const themeBtn = document.getElementById('settings-theme-btn');
	if (themeBtn && window.isDark) {
		const textSpan = themeBtn.querySelector('span');
		const icon = themeBtn.querySelector('i');
		if (textSpan) textSpan.textContent = 'Disable Dark Mode';
		if (icon) icon.setAttribute('data-lucide', 'sun');
		lucide.createIcons();
	}
};

window.resetPreferences = function () {
	const keys = [
		'itemsPerPage',
		'defaultHolidayFilter',
		'animations',
		'textSize',
		'highlightEnabled'
	];
	keys.forEach((key) => localStorage.removeItem('march_' + key));
	localStorage.removeItem('theme');
	location.reload();
};

window.toggleAnimations = function (enabled) {
	localStorage.setItem('march_animations', enabled);
	document.documentElement.setAttribute('data-animations-enabled', enabled);
};
