import type { PlansPageData } from '../templates/pages/plans.js';
import { plansPage } from '../templates/pages/plans.js';
import { PlanUseCases, CreatePlanDTO } from '../use-cases/index.js';

/**
 * Plan Controller
 * Handles HTTP requests for plan-related operations
 * @module controllers/plan-controller
 */
export class PlanController {
	constructor(private planUseCases: PlanUseCases) {}

	getPlans() {
		return { plans: this.planUseCases.getAll() };
	}

	createPlan(formData: Record<string, unknown>) {
		const dto: CreatePlanDTO = {
			activity: formData.activity as string
		};

		const result = this.planUseCases.createPlan(dto);

		if (!result.success) {
			return { error: result.error };
		}

		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return { content: plansPage(plansData) };
	}

	toggleComplete(id: string) {
		const numericId = parseInt(id, 10);
		this.planUseCases.toggleComplete(numericId);
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return { content: plansPage(plansData) };
	}

	togglePin(id: string) {
		const numericId = parseInt(id, 10);
		this.planUseCases.togglePin(numericId);
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return { content: plansPage(plansData) };
	}

	deletePlan(id: string) {
		const numericId = parseInt(id, 10);
		this.planUseCases.deletePlan(numericId);
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return { content: plansPage(plansData) };
	}

	getAll(includeHidden = false) {
		return this.planUseCases.getAll(includeHidden);
	}
}
