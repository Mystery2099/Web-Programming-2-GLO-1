/**
 * Tip Repository Interface
 * Defines the contract for tip data access
 * @module domain/ports/tip-repository
 */

export interface ITipRepository {
	getAll(): import('../../types/database.js').Tip[];
	getById(id: number): import('../../types/database.js').Tip | undefined;
	search(query: string): import('../../types/database.js').Tip[];
	getByCategory(category: string): import('../../types/database.js').Tip[];
}
