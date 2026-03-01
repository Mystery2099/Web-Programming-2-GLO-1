/**
 * Profile Repository Interface
 * Defines the contract for profile data access
 * @module domain/ports/profile-repository
 */

export interface IProfileRepository {
	get(): import('../../types/database.js').Profile | undefined;
	update(data: Partial<import('../../types/database.js').Profile>): boolean;
}
