/**
 * March Celebration - Main Application Server
 * @module server/index
 */
import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { htmx } from '@gtramontina.com/elysia-htmx';
import { db } from '../db/index.js';
import {
	HolidayRepository,
	PlanRepository,
	TipRepository,
	ProfileRepository
} from '../repositories/index.js';
import { HolidayUseCases, PlanUseCases, TipUseCases, ProfileUseCases } from '../use-cases/index.js';
import {
	HolidayController,
	PlanController,
	TipController,
	ProfileController
} from '../controllers/index.js';
import { layout } from '../templates/layout.js';
import { homePage, addHolidayPage, settingsPage } from '../templates/pages/index.js';
import { plansPage } from '../templates/pages/plans.js';

const APP_NAME = 'March Celebration';
const PAGE_TITLES = {
	home: `${APP_NAME} Hub`,
	holidays: `Holidays - ${APP_NAME}`,
	addHoliday: `Add Holiday - ${APP_NAME}`,
	plans: `My Plans - ${APP_NAME}`,
	tips: `Tips - ${APP_NAME}`,
	settings: `Settings - ${APP_NAME}`,
	profile: `Profile - ${APP_NAME}`
} as const;

interface QueryParams {
	search?: string;
	filter?: string;
	page?: string;
	itemsPerPage?: string;
	message?: string;
}

const redirectTo = (url: string): string =>
	`<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=${url}">
  </head>
  <body></body>
</html>`;

const errorMessage = (message: string): string => `<p style="color: red;">${message}</p>`;

const holidayRepo = new HolidayRepository(db);
const planRepo = new PlanRepository(db);
const tipRepo = new TipRepository(db);
const profileRepo = new ProfileRepository(db);

const holidayUseCases = new HolidayUseCases(holidayRepo);
const planUseCases = new PlanUseCases(planRepo);
const tipUseCases = new TipUseCases(tipRepo);
const profileUseCases = new ProfileUseCases(profileRepo);

const holidayController = new HolidayController(holidayUseCases);
const planController = new PlanController(planUseCases);
const tipController = new TipController(tipUseCases);
const profileController = new ProfileController(profileUseCases);

const app = new Elysia()
	.use(html())
	.use(htmx())
	.use(staticPlugin({ assets: 'src/static', prefix: '/static' }))
	.get('/', () => layout(homePage(), PAGE_TITLES.home, 'home'))
	.get('/home', () => layout(homePage(), PAGE_TITLES.home, 'home'))
	.get('/holidays', ({ query, request }) => {
		const params = query as QueryParams;
		return holidayController.getHolidays({
			...params,
			headers: request.headers
		});
	})
	.get('/holidays/add', ({ query }) => {
		const params = query as { error?: string; field?: string };
		return holidayController.getAddHolidayPage(
			params.error,
			params.field as 'name' | 'day' | 'type'
		);
	})
	.get('/profile', () => profileController.getProfile())
	.post('/profile', ({ body }) => {
		const formData = body as Record<string, unknown>;
		profileController.updateProfile(formData);
		return redirectTo('/profile');
	})
	.get('/plans', () => {
		const { plans } = planController.getPlans();
		return layout(plansPage({ plans }), PAGE_TITLES.plans, 'plans');
	})
	.get('/tips', ({ query }) => {
		const search = (query.search as string) || '';
		const { content } = tipController.getTips(search);
		return layout(content, PAGE_TITLES.tips, 'tips');
	})
	.get('/settings', () => layout(settingsPage(), PAGE_TITLES.settings, 'settings'))

	.get('/api/holidays', () => holidayController.getAll())
	.post('/holidays', ({ body }) => {
		const formData = body as Record<string, unknown>;
		const result = holidayController.createHoliday(formData);

		if ('error' in result && result.error) {
			return holidayController.getAddHolidayPage(result.error.message, result.error.field);
		}

		if ('redirect' in result) {
			return redirectTo(result.redirect);
		}

		return result;
	})
	.delete('/holidays/:id', ({ params, query, request }) => {
		const { id } = params;
		const queryParams = query as QueryParams;
		return holidayController.deleteHoliday({
			id,
			...queryParams,
			headers: request.headers
		});
	})
	.get('/api/plans', () => planController.getAll(true))
	.get('/api/tips', () => tipController.getAll())
	.post('/plans', ({ body }) => {
		const formData = body as Record<string, unknown>;
		const result = planController.createPlan(formData);

		if ('error' in result) {
			return errorMessage(result.error ?? 'An error occurred');
		}

		return result.content;
	})
	.put('/plans/:id', ({ params }) => {
		const { id } = params;
		const { content } = planController.toggleComplete(id);
		return content;
	})
	.put('/plans/:id/pin', ({ params }) => {
		const { id } = params;
		const { content } = planController.togglePin(id);
		return content;
	})
	.delete('/plans/:id', ({ params }) => {
		const { id } = params;
		const { content } = planController.deletePlan(id);
		return content;
	})
	.get('/*', () => layout(homePage(), PAGE_TITLES.home, 'home'))
	.listen(3000);

console.log(`API Server running at http://localhost:${app.server?.port}`);
