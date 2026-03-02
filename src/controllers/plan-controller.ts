import type { PlansPageData } from '../templates/pages/plans.js';
import { plansPage } from '../templates/pages/plans.js';
import { PlanUseCases, CreatePlanDTO } from '../use-cases/index.js';
import type { ControllerResult } from '../types/controller.js';

export class PlanController {
	constructor(private planUseCases: PlanUseCases) {}

	private buildPlansHtml(): string {
		const plansData: PlansPageData = { plans: this.planUseCases.getAll() };
		return plansPage(plansData);
	}

	getPlans(): PlansPageData {
		return { plans: this.planUseCases.getAll() };
	}

	createPlan(formData: Record<string, unknown>): ControllerResult {
		const dto: CreatePlanDTO = { activity: formData.activity as string };
		const result = this.planUseCases.createPlan(dto);

		if (!result.success) {
			return { error: { message: result.error ?? 'Failed to create plan' } };
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

	getAll(includeHidden = false) {
		return this.planUseCases.getAll(includeHidden);
	}
}
