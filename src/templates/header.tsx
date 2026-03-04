import { Html } from '@elysiajs/html';

export const header = (currentPage = 'home') => (
	<>
		<button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
			<i data-lucide="menu" aria-hidden="true"></i>
		</button>
		<div class="sidebar-overlay"></div>
		<aside class="sidebar">
			<div class="sidebar-top">
				<div class="sidebar-logo">
					<span class="sidebar-logo-icon">
						<i data-lucide="sparkles" aria-hidden="true"></i>
					</span>
					<span class="sidebar-logo-text">March Hub</span>
				</div>
				<button
					type="button"
					class="desktop-sidebar-toggle"
					aria-label="Collapse sidebar"
					aria-pressed="false"
				>
					<i data-lucide="chevrons-left" aria-hidden="true"></i>
				</button>
			</div>
			<ul class="nav-links">
				<li>
					<a
						href="/"
						data-page="home"
						data-label="Home"
						class={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
					>
						<i data-lucide="home" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">Home</span>
					</a>
				</li>
				<li>
					<a
						href="/holidays"
						data-page="holidays"
						data-label="Holidays"
						class={`nav-link ${currentPage === 'holidays' ? 'active' : ''}`}
					>
						<i data-lucide="calendar-days" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">Holidays</span>
					</a>
				</li>
				<li>
					<a
						href="/profile"
						data-page="profile"
						data-label="My Journey"
						class={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
					>
						<i data-lucide="compass" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">My Journey</span>
					</a>
				</li>
				<li>
					<a
						href="/plans"
						data-page="plans"
						data-label="My Plans"
						class={`nav-link ${currentPage === 'plans' ? 'active' : ''}`}
					>
						<i data-lucide="layout-list" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">My Plans</span>
					</a>
				</li>
				<li>
					<a
						href="/tips"
						data-page="tips"
						data-label="Tips"
						class={`nav-link ${currentPage === 'tips' ? 'active' : ''}`}
					>
						<i data-lucide="lightbulb" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">Tips</span>
					</a>
				</li>
				<li>
					<a
						href="/settings"
						data-page="settings"
						data-label="Settings"
						class={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
					>
						<i data-lucide="settings" class="nav-icon" aria-hidden="true"></i>
						<span class="nav-label">Settings</span>
					</a>
				</li>
			</ul>
		</aside>
	</>
);
