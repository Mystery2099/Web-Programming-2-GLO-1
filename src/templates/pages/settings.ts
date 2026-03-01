export const settingsPage = () => `
<div id="settings" class="page">
  <div class="settings-header">
    <h1><i data-lucide="settings" class="settings-icon" aria-hidden="true"></i>Settings</h1>
    <p>Personalize your March Celebration Hub experience</p>
  </div>

  <div class="settings-content">
    <section class="settings-section">
      <div class="section-icon">
        <i data-lucide="palette" aria-hidden="true"></i>
      </div>
      <div class="section-content">
        <h2>Appearance</h2>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Dark Mode</label>
            <span class="setting-description">Switch between light and dark themes</span>
          </div>
          <button id="settings-theme-btn" class="btn-ghost" data-action="toggle-theme">
            <i data-lucide="moon" aria-hidden="true"></i>
            <span>Enable Dark Mode</span>
          </button>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Text Size</label>
            <span class="setting-description">Adjust font size for better readability</span>
          </div>
          <div class="range-wrapper">
            <input type="range" id="settings-text-size" min="12" max="24" value="16" data-action="update-text-size">
            <span id="settings-size-value">16px</span>
          </div>
        </div>
      </div>
    </section>

    <section class="settings-section">
      <div class="section-icon">
        <i data-lucide="zap" aria-hidden="true"></i>
      </div>
      <div class="section-content">
        <h2>Interactive Features</h2>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Row Highlighting</label>
            <span class="setting-description">Highlight rows when clicking in tables</span>
          </div>
          <button id="settings-highlight-btn" class="btn-ghost" data-action="toggle-highlight">
            <i data-lucide="highlighter" aria-hidden="true"></i>
            <span>Enable</span>
          </button>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Animation Effects</label>
            <span class="setting-description">Enable smooth transitions and animations</span>
          </div>
          <label class="toggle">
            <input type="checkbox" id="animations-toggle" checked data-action="toggle-animations">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>

    <section class="settings-section">
      <div class="section-icon">
        <i data-lucide="sliders" aria-hidden="true"></i>
      </div>
      <div class="section-content">
        <h2>Data Display</h2>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Items Per Page</label>
            <span class="setting-description">Control how many items show at once</span>
          </div>
          <select id="items-per-page" class="setting-select" data-pref="itemsPerPage">
            <option value="5">5 items</option>
            <option value="10" selected>10 items</option>
            <option value="25">25 items</option>
            <option value="0">Show all</option>
          </select>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <label class="setting-label">Default Holiday Filter</label>
            <span class="setting-description">Pre-select holiday type filter</span>
          </div>
          <select id="default-holiday-filter" class="setting-select" data-pref="defaultHolidayFilter">
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
      <div class="section-content">
        <p>Your preferences are automatically saved to your browser</p>
        <button class="btn-secondary" data-action="reset-preferences">
          <i data-lucide="rotate-ccw" class="settings-btn-icon" aria-hidden="true"></i>
          Reset to Defaults
        </button>
      </div>
    </section>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const toggleThemeBtn = document.querySelector('[data-action="toggle-theme"]');
      if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', toggleTheme);
      }

      const textSizeInput = document.querySelector('[data-action="update-text-size"]');
      const textSizeValue = document.getElementById('settings-size-value');
      if (textSizeInput && textSizeValue) {
        textSizeInput.addEventListener('input', (e) => updateTextSize(e.target.value));
      }

      const highlightBtn = document.querySelector('[data-action="toggle-highlight"]');
      if (highlightBtn) {
        highlightBtn.addEventListener('click', toggleHighlight);
      }

      const animationsToggle = document.querySelector('#animations-toggle');
      if (animationsToggle) {
        animationsToggle.addEventListener('change', (e) => toggleAnimations(e.target.checked));
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
    });
  </script>
</div>
`;
