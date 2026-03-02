/**
 * March Celebration - Main Application Server
 * @module server/index
 */
import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { htmx } from '@gtramontina.com/elysia-htmx';
import { initializeDependencies } from '../config/di-container.js';
import { registerAllRoutes } from '../routes/index.js';
import { SERVER_PORT } from '../config/constants.js';

const app = new Elysia()
	.use(html())
	.use(htmx())
	.use(staticPlugin({ assets: 'src/static', prefix: '/static' }));

const controllers = initializeDependencies();
registerAllRoutes(app, controllers);

app.listen(SERVER_PORT);

console.log(`API Server running at http://localhost:${app.server?.port}`);
