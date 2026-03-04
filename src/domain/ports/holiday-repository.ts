/**
 * Holiday Repository Interface
 * Defines the contract for holiday data access
 * @module domain/ports/holiday-repository
 */

export interface HolidayFilters {
	search?: string;
	type?: string;
}

export interface IHolidayRepository {
	getAll(filters?: HolidayFilters): import('../../types/database.js').Holiday[];
	getById(id: number): import('../../types/database.js').Holiday | undefined;
	getByDay(day: number): import('../../types/database.js').Holiday | undefined;
	create(
		name: string,
		day: number,
		type: import('../../types/database.js').HolidayType,
		description: string
	): import('../../types/database.js').Holiday | undefined;
	hide(id: number): boolean;
	getTypes(): string[];
	getCount(): number;
}
