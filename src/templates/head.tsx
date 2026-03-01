import { Html } from '@elysiajs/html';
import { styles } from './styles.js';

export const head = (title = 'March Celebration Hub') => (
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{title}</title>
		<link rel="preconnect" href="https://unpkg.com" />
		<script src="https://unpkg.com/htmx.org@2.0.8/dist/htmx.js" />
		<script src="https://unpkg.com/lucide@latest" />
		<link rel="icon" type="image/png" href="/static/images/march_hub_favicon_gpt.png" />
		<style>{styles}</style>
	</head>
);
