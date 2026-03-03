import { Html } from '@elysiajs/html';

export const head = (title = 'March Celebration Hub') => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{title}</title>
		<script>
			{`(() => {
				try {
					if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
						document.documentElement.classList.add('dark');
					}
				} catch {}
			})();`}
		</script>
		<link rel="preconnect" href="https://unpkg.com" />
		<script src="https://unpkg.com/htmx.org@2.0.8/dist/htmx.js" />
		<script src="https://unpkg.com/lucide@0.575.0/dist/umd/lucide.min.js" />
		<link rel="icon" type="image/png" href="/static/images/favicon/march_hub_favicon_gpt.png" />
		<link rel="stylesheet" href="/static/css/variables.css" />
		<link rel="stylesheet" href="/static/css/main.css" />
	</head>
);
