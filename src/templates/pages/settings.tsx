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
							<span class="toggle-status" id="settings-theme-status">On</span>
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
							<div class="setting-icon highlight-icon">
								<i data-lucide="highlighter" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Row Highlighting</label>
								<span class="setting-description">Highlight rows when clicking in tables</span>
							</div>
						</div>
						<label class="theme-toggle-switch" data-action="toggle-highlight" role="switch" aria-checked="false" id="settings-highlight-toggle">
							<input type="checkbox" id="settings-highlight-input" />
							<span class="toggle-track">
								<span class="toggle-thumb">
									<i data-lucide="mouse-pointer-off" class="icon-off" aria-hidden="true"></i>
									<i data-lucide="mouse-pointer" class="icon-on" aria-hidden="true"></i>
								</span>
							</span>
							<span class="toggle-status" id="settings-highlight-status">Off</span>
						</label>
					</div>
					
					<div class="setting-row setting-row-border">
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

			<section class="settings-section">
				<div class="section-header">
					<div class="section-icon-wrapper data-icon">
						<i data-lucide="layout-grid" aria-hidden="true"></i>
					</div>
					<div class="section-title">
						<h2>Data Display</h2>
						<p>Configure how data is presented</p>
					</div>
				</div>
				
				<div class="settings-card">
					<div class="setting-row">
						<div class="setting-info">
							<div class="setting-icon items-icon">
								<i data-lucide="list" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Items Per Page</label>
								<span class="setting-description">Control how many items show at once</span>
							</div>
						</div>
						<select id="items-per-page" class="setting-select-enhanced" data-pref="itemsPerPage">
							<option value="5">5 items</option>
							<option value="10" selected>10 items</option>
							<option value="25">25 items</option>
							<option value="0">Show all</option>
						</select>
					</div>
					
					<div class="setting-row setting-row-border">
						<div class="setting-info">
							<div class="setting-icon filter-icon">
								<i data-lucide="filter" aria-hidden="true"></i>
							</div>
							<div class="setting-text">
								<label class="setting-label">Default Holiday Filter</label>
								<span class="setting-description">Pre-select holiday type filter</span>
							</div>
						</div>
						<select id="default-holiday-filter" class="setting-select-enhanced" data-pref="defaultHolidayFilter">
							<option value="">All Types</option>
							<option value="Cultural">Cultural</option>
							<option value="Global">Global</option>
							<option value="Fun">Fun</option>
							<option value="Environmental">Environmental</option>
						</select>
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
				const toggleThemeInput = document.querySelector('#settings-theme-input');
				const toggleThemeLabel = document.querySelector('#settings-theme-toggle');
				const themeStatus = document.querySelector('#settings-theme-status');
				if (toggleThemeInput && toggleThemeLabel) {
					// Initialize status from current state
					if (themeStatus) {
						const isDark = document.body.classList.contains('dark');
						themeStatus.textContent = isDark ? 'On' : 'Off';
						toggleThemeInput.checked = isDark;
					}
					
					toggleThemeInput.addEventListener('change', (e) => {
						toggleTheme();
						toggleThemeLabel.setAttribute('aria-checked', e.target.checked);
						if (themeStatus) {
							themeStatus.textContent = e.target.checked ? 'On' : 'Off';
						}
					});
				}

				const textSizeInput = document.querySelector('[data-action="update-text-size"]');
				const textSizeValue = document.getElementById('settings-size-value');
				const textSizePreview = document.getElementById('settings-size-preview');
				if (textSizeInput && textSizeValue) {
					textSizeInput.addEventListener('input', (e) => {
						updateTextSize(e.target.value);
						if (textSizePreview) {
							textSizePreview.style.fontSize = e.target.value + 'px';
						}
					});
				}

				const highlightInput = document.querySelector('#settings-highlight-input');
				const highlightLabel = document.querySelector('#settings-highlight-toggle');
				const highlightStatus = document.querySelector('#settings-highlight-status');
				if (highlightInput && highlightLabel && highlightStatus) {
					// Initialize status from current state
					const highlightEnabled = localStorage.getItem('march_highlight') === 'true';
					highlightInput.checked = highlightEnabled;
					highlightStatus.textContent = highlightEnabled ? 'On' : 'Off';
					highlightLabel.setAttribute('aria-checked', highlightEnabled);
					
					highlightInput.addEventListener('change', (e) => {
						toggleHighlight();
						highlightLabel.setAttribute('aria-checked', e.target.checked);
						highlightStatus.textContent = e.target.checked ? 'On' : 'Off';
					});
				}

				const animationsToggle = document.querySelector('#animations-toggle');
				const animationsStatus = document.querySelector('#settings-animations-status');
				if (animationsToggle && animationsStatus) {
					// Initialize status from current state
					const animationsEnabled = localStorage.getItem('march_animations') !== 'false';
					animationsStatus.textContent = animationsEnabled ? 'On' : 'Off';
					
					animationsToggle.addEventListener('change', (e) => {
						toggleAnimations(e.target.checked);
						animationsStatus.textContent = e.target.checked ? 'On' : 'Off';
						document.querySelector('#settings-animations-toggle').setAttribute('aria-checked', e.target.checked);
					});
				}

				const itemsPerPageSelect = document.getElementById('items-per-page');
				if (itemsPerPageSelect) {
					itemsPerPageSelect.addEventListener('change', (e) => savePreference('itemsPerPage', e.target.value));
				}

				const defaultHolidayFilter = document.getElementById('default-holiday-filter');
				if (defaultHolidayFilter) {
					defaultHolidayFilter.addEventListener('change', (e) => savePreference('defaultHolidayFilter', e.target.value));
				}

				const resetBtn = document.querySelector('[data-action="reset-preferences"]');
				if (resetBtn) {
					resetBtn.addEventListener('click', resetPreferences);
				}
			});`}
		</script>
	</div>
);
