/**
 * March Celebration - Main Application Server
 * @module server/index
 */
import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { htmx } from '@gtramontina.com/elysia-htmx';
import { initializeDependencies } from '@/config/di-container';
import { registerAllRoutes } from '@/routes';
import { SERVER_PORT } from '@/config/constants';
import { layout } from '@/templates/layout';
import { htmxErrorFragment, notFoundPage, serverErrorPage } from '@/templates/pages';

const app = new Elysia()
	.use(html())
	.use(htmx())
	.use(staticPlugin({ assets: 'src/static', prefix: '/static' }))
	.onRequest((ctx) => {
		const path = new URL(ctx.request.url).pathname;
		console.log(`[${new Date().toISOString()}] ${ctx.request.method} ${path}`);
	})
	.onAfterResponse((ctx) => {
		const path = new URL(ctx.request.url).pathname;
		const status = ctx.set.status ?? 200;
		console.log(`[${new Date().toISOString()}] ${ctx.request.method} ${path} -> ${status}`);
	})
	.onError((ctx) => {
		const path = new URL(ctx.request.url).pathname;
		const caught: unknown = ctx.error;
		const isErrorObject = caught instanceof Error;
		const code = ctx.code;
		console.error(`[${new Date().toISOString()}] FATAL ${ctx.request.method} ${path}:`, {
			code,
			message: isErrorObject ? caught.message : String(caught),
			stack: isErrorObject ? caught.stack : undefined,
			cause: isErrorObject ? caught.cause : undefined
		});

		const status = code === 'NOT_FOUND' ? 404 : 500;
		ctx.set.status = status;
		const isHtmx = ctx.request.headers.get('HX-Request') === 'true';
		if (isHtmx) {
			return htmxErrorFragment(status, status === 404 ? 'Resource not found.' : 'Request failed.');
		}

		if (status === 404) {
			return layout(notFoundPage(), '404 - Page Not Found', 'home');
		}

		return layout(serverErrorPage(), '500 - Server Error', 'home');
	});

const controllers = initializeDependencies();
registerAllRoutes(app, controllers);

app.listen(SERVER_PORT);

console.log(`API Server running at http://localhost:${app.server?.port}`);
