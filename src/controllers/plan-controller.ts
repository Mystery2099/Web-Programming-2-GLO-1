import type { PlansPageData } from '../templates/pages/plans.js';
import { plansList, plansPage } from '../templates/pages/plans.js';
import { PlanUseCases, CreatePlanDTO } from '../use-cases/index.js';
import type { ControllerResult } from '../types/controller.js';

export class PlanController {
	constructor(private planUseCases: PlanUseCases) {}

	private buildPlansHtml() {
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return plansList(plansData);
	}

	getPlans() {
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return plansPage(plansData);
	}

	getAll(asJson = false) {
		return asJson
			? this.planUseCases.getAll()
			: { html: this.buildPlansHtml(), isPartial: true };
	}

	createPlan(formData: Record<string, unknown>): ControllerResult {
		const dto: CreatePlanDTO = {
			activity: formData.activity as string
		};

		const result = this.planUseCases.createPlan(dto);

		if (!result.success) {
			return { error: { message: result.error || 'An error occurred' } };
		}

		return { html: this.buildPlansHtml(), isPartial: true };
	}

	toggleComplete(id: string): ControllerResult {
		const numericId = parseInt(id, 10);
		this.planUseCases.toggleComplete(numericId);
		return { html: this.buildPlansHtml(), isPartial: true };
	}

	togglePin(id: string): ControllerResult {
		const numericId = parseInt(id, 10);
		this.planUseCases.togglePin(numericId);
		return { html: this.buildPlansHtml(), isPartial: true };
	}

	deletePlan(id: string): ControllerResult {
		const numericId = parseInt(id, 10);
		this.planUseCases.deletePlan(numericId);
		return { html: this.buildPlansHtml(), isPartial: true };
	}
}
