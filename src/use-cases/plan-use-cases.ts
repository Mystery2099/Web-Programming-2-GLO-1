/**
 * Plan Use Cases
 * Business logic for plan operations
 * @module use-cases/plan-use-cases
 */

import type { Plan } from '../types/database.js';
import type { IPlanRepository } from '../domain/ports/plan-repository.js';
import { validatePlanActivity } from '../services/validation.js';
import { sanitizeText } from '../utils/validation.js';

export interface CreatePlanDTO {
	activity: string;
}

export interface UseCaseResult<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export class PlanUseCases {
	constructor(private planRepo: IPlanRepository) {}

	getAll(includeHidden = false): Plan[] {
		return this.planRepo.getAll(includeHidden);
	}

	getById(id: number): Plan | undefined {
		return this.planRepo.getById(id);
	}

	createPlan(dto: CreatePlanDTO): UseCaseResult<Plan> {
		const activity = sanitizeText(dto.activity ?? '');

		const validationError = validatePlanActivity(activity);
		if (validationError) {
			return { success: false, error: validationError.message };
		}

		const plan = this.planRepo.create(activity);

		if (!plan) {
			return { success: false, error: 'Failed to create plan' };
		}

		return { success: true, data: plan };
	}

	toggleComplete(id: number): boolean {
		return this.planRepo.toggleComplete(id);
	}

	togglePin(id: number): boolean {
		return this.planRepo.togglePin(id);
	}

	deletePlan(id: number): boolean {
		return this.planRepo.hide(id);
	}
}
