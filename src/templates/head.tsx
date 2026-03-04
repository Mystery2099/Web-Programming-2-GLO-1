import { Html } from '@elysiajs/html';

export const head = (title = 'March Celebration Hub') => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{title}</title>
		<script>
			{`(() => {
				try {
					const cookieMap = Object.fromEntries(
						document.cookie
							.split('; ')
							.filter(Boolean)
							.map((entry) => {
								const [key, ...rest] = entry.split('=');
								return [key, rest.join('=')];
							})
					);

					const themeCookie = cookieMap.march_theme;
					if (themeCookie === 'dark' || themeCookie === 'light') {
						document.documentElement.classList.toggle('dark', themeCookie === 'dark');
					} else if (
						window.matchMedia &&
						window.matchMedia('(prefers-color-scheme: dark)').matches
					) {
						document.documentElement.classList.add('dark');
					}

					const cookieValue = cookieMap.march_sidebar;
					if (cookieValue === 'collapsed' || cookieValue === 'expanded') {
						document.documentElement.setAttribute('data-sidebar', cookieValue);
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
