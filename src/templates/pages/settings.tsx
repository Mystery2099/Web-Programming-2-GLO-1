import { Html } from '@elysiajs/html';

export const settingsPage = () => (
	<div id="settings" class="page">
		<div class="settings-hero">
			<div class="settings-hero-content">
				<div class="settings-hero-icon">
					<i data-lucide="sliders-horizontal" aria-hidden="true"></i>
				</div>
				<div class="settings-hero-text">
					<h1>Settings</h1>
					<p>Customize your March Celebration Hub experience</p>
				</div>
			</div>
		</div>

		<div class="settings-content">
			<section class="settings-section">
				<div class="section-header">
					<div class="section-icon-wrapper appearance-icon">
						<i data-lucide="palette" aria-hidden="true"></i>
					</div>
					<div class="section-title">
						<h2>Appearance</h2>
						<p>Customize how the app looks and feels</p>
					</div>
				</div>
				
				<div class="settings-card">
					<div class="setting-row">
						<div class="setting-info">
							<div class="setting-icon dark-mode-icon">
								<i data-lucide="moon" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Dark Mode</label>
								<span class="setting-description">Switch between light and dark themes</span>
							</div>
						</div>
						<label class="theme-toggle-switch" data-action="toggle-theme" role="switch" aria-checked="false" id="settings-theme-toggle">
							<input type="checkbox" id="settings-theme-input" />
							<span class="toggle-track">
								<span class="toggle-thumb">
									<i data-lucide="moon" class="icon-moon" aria-hidden="true"></i>
									<i data-lucide="sun" class="icon-sun" aria-hidden="true"></i>
								</span>
							</span>
							<span class="toggle-status" id="settings-theme-status">Light</span>
						</label>
					</div>
					
					<div class="setting-row setting-row-border">
						<div class="setting-info">
							<div class="setting-icon text-size-icon">
								<i data-lucide="type" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Text Size</label>
								<span class="setting-description">Adjust font size for better readability</span>
							</div>
						</div>
						<div class="text-size-control">
							<span class="text-size-preview" id="settings-size-preview">Aa</span>
							<div class="range-wrapper-enhanced">
								<input
									type="range"
									id="settings-text-size"
									min={12}
									max={24}
									value="16"
									data-action="update-text-size"
									class="range-slider"
								/>
								<div class="range-labels">
									<span>Small</span>
									<span id="settings-size-value" class="range-value">16px</span>
									<span>Large</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="settings-section">
				<div class="section-header">
					<div class="section-icon-wrapper interactive-icon">
						<i data-lucide="sparkles" aria-hidden="true"></i>
					</div>
					<div class="section-title">
						<h2>Interactive Features</h2>
						<p>Control animations and interactions</p>
					</div>
				</div>
				
				<div class="settings-card">
					<div class="setting-row">
						<div class="setting-info">
							<div class="setting-icon animation-icon">
								<i data-lucide="wand-2" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Animation Effects</label>
								<span class="setting-description">Enable smooth transitions and animations</span>
							</div>
						</div>
						<label class="theme-toggle-switch" role="switch" aria-checked="true" id="settings-animations-toggle">
							<input type="checkbox" id="animations-toggle" checked data-action="toggle-animations" />
							<span class="toggle-track">
								<span class="toggle-thumb">
									<i data-lucide="pause" class="icon-off" aria-hidden="true"></i>
									<i data-lucide="sparkles" class="icon-on" aria-hidden="true"></i>
								</span>
							</span>
							<span class="toggle-status" id="settings-animations-status">On</span>
						</label>
					</div>
				</div>
			</section>

			<section class="settings-section settings-actions">
				<div class="settings-card settings-card-actions">
					<div class="actions-content">
						<div class="actions-icon">
							<i data-lucide="save" aria-hidden="true"></i>
						</div>
						<div class="actions-text">
							<h3>Auto-Save Active</h3>
							<p>Your preferences are automatically saved to your browser</p>
						</div>
					</div>
					<button class="btn-reset" data-action="reset-preferences">
						<i data-lucide="rotate-ccw" aria-hidden="true"></i>
						<span>Reset to Defaults</span>
					</button>
				</div>
			</section>
		</div>

		<script>
			{`document.addEventListener('DOMContentLoaded', () => {
				const isStoredFalse = (value) => value === false || value === 'false';

				const toggleThemeInput = document.querySelector('#settings-theme-input');
				const toggleThemeLabel = document.querySelector('#settings-theme-toggle');
				const themeStatus = document.querySelector('#settings-theme-status');
				const applyThemeToggleUi = (mode) => {
					const isDark = mode === 'dark';
					if (toggleThemeInput) toggleThemeInput.checked = isDark;
					if (toggleThemeLabel) toggleThemeLabel.setAttribute('aria-checked', String(isDark));
					if (themeStatus) themeStatus.textContent = isDark ? 'Dark' : 'Light';
				};

				if (toggleThemeInput && toggleThemeLabel) {
					(async () => {
						const themeMode = await getThemeMode();
						applyThemeToggleUi(themeMode);
					})();

					toggleThemeInput.addEventListener('change', async (e) => {
						const selectedTheme = e.target.checked ? 'dark' : 'light';
						await setTheme(selectedTheme);
						applyThemeToggleUi(selectedTheme);
					});
				}

				const textSizeInput = document.querySelector('[data-action="update-text-size"]');
				const textSizeValue = document.getElementById('settings-size-value');
				const textSizePreview = document.getElementById('settings-size-preview');
				if (textSizeInput && textSizeValue) {
					textSizeInput.addEventListener('input', (e) => {
						const nextSize = e.target.value;
						textSizeValue.textContent = nextSize + 'px';
						if (textSizePreview) {
							textSizePreview.style.fontSize = nextSize + 'px';
						}
					});
					textSizeInput.addEventListener('change', (e) => {
						updateTextSize(e.target.value);
					});
				}

				const animationsToggle = document.querySelector('#animations-toggle');
				const animationsStatus = document.querySelector('#settings-animations-status');
				if (animationsToggle && animationsStatus) {
					// Initialize status from current state
					(async () => {
						const animationsEnabled = !isStoredFalse(await localforage.getItem('march_animations'));
						animationsStatus.textContent = animationsEnabled ? 'On' : 'Off';
						animationsToggle.checked = animationsEnabled;
						document
							.querySelector('#settings-animations-toggle')
							.setAttribute('aria-checked', String(animationsEnabled));
					})();
					
					animationsToggle.addEventListener('change', (e) => {
						toggleAnimations(e.target.checked);
						animationsStatus.textContent = e.target.checked ? 'On' : 'Off';
						document.querySelector('#settings-animations-toggle').setAttribute('aria-checked', e.target.checked);
					});
				}

				const resetBtn = document.querySelector('[data-action="reset-preferences"]');
				if (resetBtn) {
					resetBtn.addEventListener('click', resetPreferences);
				}
			});`}
		</script>
	</div>
);
