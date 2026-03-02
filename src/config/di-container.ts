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

export interface Controllers {
	holidayController: HolidayController;
	planController: PlanController;
	tipController: TipController;
	profileController: ProfileController;
}

export const initializeDependencies = (): Controllers => {
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

	return {
		holidayController,
		planController,
		tipController,
		profileController
	};
};
