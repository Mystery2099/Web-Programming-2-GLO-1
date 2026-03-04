import { Html } from '@elysiajs/html';
import { head } from './head.js';
import { header } from './header.js';
import { footer } from './footer.js';

export const layout = (content: unknown, title = 'March Celebration Hub', currentPage = 'home') => (
	<>
		{'<!DOCTYPE html>' as 'safe'}
		<html lang="en">
			{head(title)}
			<body>
				<div class="app-container">
					{header(currentPage)}
					<div class="content-shell">
						<main class="main-content">
							<div class="page">{content as 'safe'}</div>
						</main>
						{footer()}
					</div>
				</div>
				<link rel="stylesheet" href="/static/css/glightbox.css" />
				<script src="/static/js/glightbox.min.js"></script>
				<script src="https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js"></script>
				<script src="/static/js/pages/holidays-page.js"></script>
				<script src="/static/js/pages/plans-page.js"></script>
					<script src="/static/js/pages/settings-page.js"></script>
					<script src="/static/js/pages/add-holiday-page.js"></script>
					<script src="/static/js/client.js"></script>
				<script>
					{`document.addEventListener('DOMContentLoaded', () => {
						if (typeof lucide !== 'undefined') {
							lucide.createIcons();
						}

						if (typeof GLightbox !== 'undefined') {
							const lightbox = GLightbox({
								selector: '.clickable-image',
								touchNavigation: true,
								zoomable: true,
								draggable: true,
								loop: true,
								autoplayVideos: false,
								moreLength: 0
							});
						}
					});`}
				</script>
			</body>
		</html>
	</>
);
