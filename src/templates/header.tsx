import { Html } from '@elysiajs/html';

export const header = (currentPage = 'home') => (
	<>
		<button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
			<i data-lucide="menu" aria-hidden="true"></i>
		</button>
		<div class="sidebar-overlay"></div>
		<aside class="sidebar">
			<div class="sidebar-logo">
				<i data-lucide="sparkles" aria-hidden="true"></i> March Hub
			</div>
			<ul class="nav-links">
				<li>
					<a href="/" data-page="home" class={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>
						<i data-lucide="home" aria-hidden="true"></i> Home
					</a>
				</li>
				<li>
					<a
						href="/holidays"
						data-page="holidays"
						class={`nav-link ${currentPage === 'holidays' ? 'active' : ''}`}
					>
						<i data-lucide="calendar-days" aria-hidden="true"></i> Holidays
					</a>
				</li>
				<li>
					<a
						href="/profile"
						data-page="profile"
						class={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
					>
						<i data-lucide="compass" aria-hidden="true"></i> My Journey
					</a>
				</li>
				<li>
					<a
						href="/plans"
						data-page="plans"
						class={`nav-link ${currentPage === 'plans' ? 'active' : ''}`}
					>
						<i data-lucide="layout-list" aria-hidden="true"></i> My Plans
					</a>
				</li>
				<li>
					<a
						href="/tips"
						data-page="tips"
						class={`nav-link ${currentPage === 'tips' ? 'active' : ''}`}
					>
						<i data-lucide="lightbulb" aria-hidden="true"></i> Tips
					</a>
				</li>
				<li>
					<a
						href="/settings"
						data-page="settings"
						class={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
					>
						<i data-lucide="settings" aria-hidden="true"></i> Settings
					</a>
				</li>
			</ul>
		</aside>
	</>
);
