/**
 * Tip Use Cases
 * Business logic for tip operations
 * @module use-cases/tip-use-cases
 */

import type { Tip } from '../types/database.js';
import type { ITipRepository } from '../domain/ports/tip-repository.js';

export class TipUseCases {
	constructor(private tipRepo: ITipRepository) {}

	getAll(): Tip[] {
		return this.tipRepo.getAll();
	}

	getById(id: number): Tip | undefined {
		return this.tipRepo.getById(id);
	}

	search(query: string): Tip[] {
		return this.tipRepo.search(query);
	}

	getByCategory(category: string): Tip[] {
		return this.tipRepo.getByCategory(category);
	}
}
