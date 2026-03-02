import { Html } from '@elysiajs/html';

export const footer = () => (
	<footer class="main-footer">
		<div class="footer-decoration"></div>
		<div class="footer-content">
			<div class="footer-brand">
				<div class="footer-logo">✦</div>
				<h2 class="footer-title">March Celebration Hub</h2>
				<p class="footer-tagline">Celebrating moments, creating memories</p>
			</div>
			<div class="footer-divider"></div>
			<div class="footer-info">
				<p class="footer-year">&copy; 2026 All Rights Reserved</p>
				<p class="footer-tech">
					<span class="tech-badge">Bun</span>
					<span class="tech-badge">Elysia</span>
					<span class="tech-badge">HTMX</span>
					<span class="tech-badge">SQLite</span>
				</p>
				<p class="footer-course">CISY 7203 GLO #1</p>
			</div>
		</div>
		<div class="footer-decoration"></div>
	</footer>
);
