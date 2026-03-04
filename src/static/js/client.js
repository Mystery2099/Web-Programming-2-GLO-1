(function() {
	'use strict';
	
	console.log('[CLIENT] March Celebration app initializing...');
	console.log('[CLIENT] User Agent:', navigator.userAgent);
	console.log('[CLIENT] Screen:', screen.width, 'x', screen.height);
	console.log('[CLIENT] Language:', navigator.language);
	
	// Configure localforage
	localforage.config({
		name: 'march-celebration',
		storeName: 'preferences'
	});
	
	window.onerror = function(msg, url, line, col, error) {
		console.error('[CLIENT ERROR]', {
			message: msg,
			url: url,
			line: line,
			column: col,
			error: error?.stack,
			timestamp: new Date().toISOString()
		});
		return false;
	};
	
	window.onunhandledrejection = function(event) {
		console.error('[CLIENT UNHANDLED REJECTION]', {
			reason: event.reason,
			timestamp: new Date().toISOString()
		});
	};
	
	console.log('[CLIENT] Global error handlers registered');
})();

function writeThemeCookie(mode) {
	document.cookie = `march_theme=${mode}; path=/; max-age=31536000; samesite=lax`;
}

if (typeof window.marchAppInitialized === 'undefined') {
	window.marchAppInitialized = true;

	window.isDark = false;

	window.migratePreferences = async function () {
		const storageVersionKey = 'march_storageVersion';
		const currentVersion = await localforage.getItem(storageVersionKey);

		if (currentVersion === 1 || currentVersion === '1') {
			return;
		}

		const boolKeys = ['march_animations', 'march_sidebarCollapsed'];
		for (const key of boolKeys) {
			const value = await localforage.getItem(key);
			if (value === 'true') {
				await localforage.setItem(key, true);
			} else if (value === 'false') {
				await localforage.setItem(key, false);
			}
		}

		const theme = await localforage.getItem('theme');
		if (theme !== 'dark' && theme !== 'light') {
			const inferredTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
			await localforage.setItem('theme', inferredTheme);
		}

		await localforage.setItem(storageVersionKey, 1);
		console.log('[CLIENT] preferences migrated to storage version 1');
	};

	window.setTheme = async function (mode) {
		const nextMode = mode === 'dark' ? 'dark' : 'light';
		window.isDark = nextMode === 'dark';
		document.documentElement.classList.toggle('dark', window.isDark);
		document.body.classList.toggle('dark', window.isDark);
		await localforage.setItem('theme', nextMode);
		writeThemeCookie(nextMode);
		console.log('[CLIENT] theme set to:', nextMode);
	};

	window.getThemeMode = async function () {
		const savedTheme = await localforage.getItem('theme');
		if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

		return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	};

	window.toggleTheme = async function () {
		const currentTheme = await window.getThemeMode();
		return window.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

	(async () => {
		await window.migratePreferences();
		const mode = await window.getThemeMode();
		window.isDark = mode === 'dark';
		document.documentElement.classList.toggle('dark', window.isDark);
		document.body.classList.toggle('dark', window.isDark);
		writeThemeCookie(mode);
	})();

	document.addEventListener('DOMContentLoaded', async () => {
		await window.migratePreferences();
		const theme = await window.getThemeMode();
		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.body.classList.toggle('dark', theme === 'dark');
		writeThemeCookie(theme);
	});

	const mobileToggle = document.querySelector('.mobile-nav-toggle');
	const desktopSidebarToggle = document.querySelector('.desktop-sidebar-toggle');
	const sidebar = document.querySelector('.sidebar');
	const overlay = document.querySelector('.sidebar-overlay');

	const applySidebarCollapsedState = (collapsed) => {
		document.documentElement.setAttribute('data-sidebar', collapsed ? 'collapsed' : 'expanded');
		if (desktopSidebarToggle) {
			desktopSidebarToggle.setAttribute('aria-pressed', String(collapsed));
			desktopSidebarToggle.setAttribute(
				'aria-label',
				collapsed ? 'Expand sidebar' : 'Collapse sidebar'
			);
			desktopSidebarToggle.innerHTML = `<i data-lucide="${
				collapsed ? 'chevrons-right' : 'chevrons-left'
			}" aria-hidden="true"></i>`;
		}
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	};

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

	(async () => {
		const sidebarCollapsed = await localforage.getItem('march_sidebarCollapsed');
		const collapsed = isStoredTrue(sidebarCollapsed);
		applySidebarCollapsedState(collapsed);
		document.cookie = `march_sidebar=${collapsed ? 'collapsed' : 'expanded'}; path=/; max-age=31536000; samesite=lax`;
	})();

	if (desktopSidebarToggle) {
		desktopSidebarToggle.addEventListener('click', async () => {
			const collapsed = document.documentElement.getAttribute('data-sidebar') !== 'collapsed';
			applySidebarCollapsedState(collapsed);
			await localforage.setItem('march_sidebarCollapsed', collapsed);
			document.cookie = `march_sidebar=${collapsed ? 'collapsed' : 'expanded'}; path=/; max-age=31536000; samesite=lax`;
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
		console.log('[CLIENT] DOMContentLoaded fired');
		window.setupSearch('holiday-search', '#holidays-list', 'tr');
		window.setupSearch('tip-search', '#tips-list', '.card');
		window.loadPreferences();

		document.body.addEventListener('htmx:beforeSwap', (e) => {
			console.log('[HTMX] beforeSwap:', e.detail);
		});
		
		document.body.addEventListener('htmx:afterSwap', (e) => {
			console.log('[HTMX] afterSwap:', e.detail);
			lucide.createIcons();
		});
		
		document.body.addEventListener('htmx:responseError', (e) => {
			console.error('[HTMX] responseError:', e.detail);
		});
		
		document.body.addEventListener('htmx:sendError', (e) => {
			console.error('[HTMX] sendError:', e.detail);
		});
		
		document.body.addEventListener('htmx:xhr:abort', (e) => {
			console.log('[HTMX] xhr:abort:', e.detail);
		});
		
		console.log('[CLIENT] HTMX event listeners registered');
	});
}

window.baseSize = 16;
window.updateTextSize = function (size) {
	const numericSize = Math.min(24, Math.max(12, Number(size) || 16));
	window.baseSize = numericSize;
	const el = document.getElementById('settings-size-value');
	if (el) el.textContent = numericSize + 'px';
	document.documentElement.style.setProperty('--text-size', numericSize + 'px');
	window.savePreference('textSize', numericSize);
};

function isStoredTrue(value) {
	return value === true || value === 'true';
}

function isStoredFalse(value) {
	return value === false || value === 'false';
}

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

	window.savePreference = async function (key, value) {
		console.log('[CLIENT] savePreference:', key, '=', value);
		await localforage.setItem('march_' + key, value);
		if (key === 'itemsPerPage') {
			const holidaysDiv = document.getElementById('holidays');
			if (holidaysDiv) {
				console.log('[CLIENT] Fetching holidays with itemsPerPage:', value);
				fetch('/holidays?itemsPerPage=' + value)
					.then((response) => {
						console.log('[CLIENT] Fetch response status:', response.status);
						return response.text();
					})
					.then((html) => {
						holidaysDiv.innerHTML = html;
						lucide.createIcons();
					})
					.catch((err) => console.error('[CLIENT] Fetch error:', err));
			}
		}
	};

	window.loadPreferences = async function () {
		const itemsPerPage = await localforage.getItem('march_itemsPerPage');
		const defaultFilter = await localforage.getItem('march_defaultHolidayFilter');
		const animations = await localforage.getItem('march_animations');
		const textSize = await localforage.getItem('march_textSize');

		if (itemsPerPage) {
			const el = document.getElementById('items-per-page');
			if (el) el.value = itemsPerPage;
		}

		if (defaultFilter) {
			const el = document.getElementById('default-holiday-filter');
			if (el) el.value = defaultFilter;
		}

		if (isStoredFalse(animations)) {
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

	};

	window.resetPreferences = async function () {
		const keys = [
			'itemsPerPage',
			'defaultHolidayFilter',
			'animations',
			'textSize',
			'sidebarCollapsed'
		];
		await Promise.all(keys.map((key) => localforage.removeItem('march_' + key)));
		await localforage.removeItem('theme');
		document.cookie = 'march_theme=; path=/; max-age=0; samesite=lax';
		document.cookie = 'march_sidebar=; path=/; max-age=0; samesite=lax';
		location.reload();
	};

	window.toggleAnimations = async function (enabled) {
		const animationsEnabled = enabled === true || enabled === 'true';
		await localforage.setItem('march_animations', animationsEnabled);
		document.documentElement.setAttribute(
			'data-animations-enabled',
			animationsEnabled ? 'true' : 'false'
		);
	};
