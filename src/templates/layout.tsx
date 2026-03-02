import { Html } from '@elysiajs/html';
import { styles } from './styles.js';
import { head } from './head.js';
import { header } from './header.js';
import { footer } from './footer.js';

export const layout = (content: unknown, title = 'March Celebration Hub', currentPage = 'home') => (
	<>
		{head(title)}
		<body>
			<div class="app-container">
				{header(currentPage)}
				<main class="main-content">
					<div class="page">{content as 'safe'}</div>
				</main>
			</div>
			{footer()}
			<link rel="stylesheet" href="/static/css/glightbox.css" />
			<script src="/static/js/glightbox.min.js"></script>
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
	</>
);
