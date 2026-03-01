/**
 * Plan Repository Interface
 * Defines the contract for plan data access
 * @module domain/ports/plan-repository
 */

export interface IPlanRepository {
	getAll(includeHidden?: boolean): import('../../types/database.js').Plan[];
	getById(id: number): import('../../types/database.js').Plan | undefined;
	create(activity: string): import('../../types/database.js').Plan | undefined;
	toggleComplete(id: number): boolean;
	togglePin(id: number): boolean;
	hide(id: number): boolean;
}
