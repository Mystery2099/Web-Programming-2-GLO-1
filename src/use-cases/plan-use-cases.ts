/**
 * Plan Use Cases
 * Business logic for plan operations
 * @module use-cases/plan-use-cases
 */

import type { Plan } from '../types/database.js';
import type { IPlanRepository } from '../domain/ports/plan-repository.js';
import { hasSpecialChars } from '../utils/validation.js';

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
		const activity = dto.activity?.trim() ?? '';

		if (!activity) {
			return { success: false, error: 'Activity is required' };
		}

		if (activity.length < 3) {
			return { success: false, error: 'Activity must be at least 3 characters' };
		}

		if (activity && hasSpecialChars(activity)) {
			return { success: false, error: 'Activity cannot contain special characters' };
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
