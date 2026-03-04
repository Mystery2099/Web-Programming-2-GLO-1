import localforage from "localforage";

window.initSettingsPage = function initSettingsPage() {
	const root = document.getElementById('settings');
	if (!root || root.dataset.jsBound === 'true') return;
	root.dataset.jsBound = 'true';

	const isStoredFalse = (value) => value === false || value === 'false';

	const toggleThemeInput = root.querySelector('#settings-theme-input');
	const toggleThemeLabel = root.querySelector('#settings-theme-toggle');
	const themeStatus = root.querySelector('#settings-theme-status');

	const applyThemeToggleUi = (mode) => {
		const isDark = mode === 'dark';
		if (toggleThemeInput) toggleThemeInput.checked = isDark;
		if (toggleThemeLabel) toggleThemeLabel.setAttribute('aria-checked', String(isDark));
		if (themeStatus) themeStatus.textContent = isDark ? 'Dark' : 'Light';
	};

	if (toggleThemeInput && toggleThemeLabel) {
		(async () => {
			const themeMode = await window.getThemeMode();
			applyThemeToggleUi(themeMode);
		})();

		toggleThemeInput.addEventListener('change', async (event) => {
			const target = event.target;
			if (!(target instanceof HTMLInputElement)) return;
			const selectedTheme = target.checked ? 'dark' : 'light';
			await window.setTheme(selectedTheme);
			applyThemeToggleUi(selectedTheme);
		});
	}

	const textSizeInput = root.querySelector('[data-action="update-text-size"]');
	const textSizeValue = root.querySelector('#settings-size-value');
	const textSizePreview = root.querySelector('#settings-size-preview');

	if (textSizeInput instanceof HTMLInputElement && textSizeValue) {
		textSizeInput.addEventListener('input', (event) => {
			const target = event.target;
			if (!(target instanceof HTMLInputElement)) return;
			const nextSize = target.value;
			textSizeValue.textContent = `${nextSize}px`;
			if (textSizePreview instanceof HTMLElement) {
				textSizePreview.style.fontSize = `${nextSize}px`;
			}
		});

		textSizeInput.addEventListener('change', (event) => {
			const target = event.target;
			if (!(target instanceof HTMLInputElement)) return;
			window.updateTextSize(target.value);
		});
	}

	const animationsToggle = root.querySelector('#animations-toggle');
	const animationsStatus = root.querySelector('#settings-animations-status');
	const animationsToggleLabel = root.querySelector('#settings-animations-toggle');

	if (animationsToggle instanceof HTMLInputElement && animationsStatus && animationsToggleLabel) {
		(async () => {
			const stored = await localforage.getItem('march_animations');
			const animationsEnabled = !isStoredFalse(stored);
			animationsStatus.textContent = animationsEnabled ? 'On' : 'Off';
			animationsToggle.checked = animationsEnabled;
			animationsToggleLabel.setAttribute('aria-checked', String(animationsEnabled));
		})();

		animationsToggle.addEventListener('change', (event) => {
			const target = event.target;
			if (!(target instanceof HTMLInputElement)) return;
			window.toggleAnimations(target.checked);
			animationsStatus.textContent = target.checked ? 'On' : 'Off';
			animationsToggleLabel.setAttribute('aria-checked', String(target.checked));
		});
	}

	const resetButton = root.querySelector('[data-action="reset-preferences"]');
	if (resetButton) {
		resetButton.addEventListener('click', () => {
			window.resetPreferences();
		});
	}
};
