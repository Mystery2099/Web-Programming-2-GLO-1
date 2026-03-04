/**
 * Tip Use Cases
 * Business logic for tip operations
 * @module use-cases/tip-use-cases
 */

import type { Tip } from '@/types/database';
import type { ITipRepository } from '@/domain/ports';

export class TipUseCases {
	constructor(private tipRepo: ITipRepository) {}

	getAll(): Tip[] {
		return this.tipRepo.getAll();
	}
	search(query: string): Tip[] {
		return this.tipRepo.search(query);
	}
}
