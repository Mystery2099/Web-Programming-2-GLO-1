/**
 * Holiday Use Cases
 * Business logic for holiday operations
 * @module use-cases/holiday-use-cases
 */

import type { Holiday, HolidayType } from '../types/database.js';
import type { IHolidayRepository, HolidayFilters } from '../domain/ports/holiday-repository.js';

export interface CreateHolidayDTO {
	name: string;
	day: string;
	type: string;
	description?: string;
}

export interface HolidayValidationError {
	field: 'name' | 'day' | 'type';
	message: string;
}

export interface UseCaseResult<T> {
	success: boolean;
	data?: T;
	error?: string;
	validationErrors?: HolidayValidationError[];
}

export class HolidayUseCases {
	constructor(private holidayRepo: IHolidayRepository) {}

	getAll(filters?: HolidayFilters): Holiday[] {
		return this.holidayRepo.getAll(filters);
	}

	getById(id: number): Holiday | undefined {
		return this.holidayRepo.getById(id);
	}

	getTypes(): string[] {
		return this.holidayRepo.getTypes();
	}

	getCount(): number {
		return this.holidayRepo.getCount();
	}

	createHoliday(dto: CreateHolidayDTO): UseCaseResult<Holiday> {
		const name = dto.name?.trim() ?? '';
		const day = dto.day ?? '';
		const type = dto.type?.trim() ?? '';
		const description = dto.description?.trim() ?? '';

		const validationErrors: HolidayValidationError[] = [];

		if (!name) {
			validationErrors.push({ field: 'name', message: 'Holiday name is required' });
		} else if (name.length < 3 || name.length > 100) {
			validationErrors.push({ field: 'name', message: 'Holiday name must be 3-100 characters' });
		} else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(name)) {
			validationErrors.push({
				field: 'name',
				message: 'Holiday name cannot contain special characters'
			});
		}

		const parsedDay = parseInt(day, 10);
		if (!parsedDay || parsedDay < 1 || parsedDay > 31) {
			validationErrors.push({ field: 'day', message: 'Please select a valid day (1-31)' });
		}

		const validTypes = [
			'Cultural',
			'Global',
			'Fun',
			'Astronomical',
			'Environmental',
			'Religious',
			'Awareness'
		];
		if (!validTypes.includes(type)) {
			validationErrors.push({ field: 'type', message: 'Please select a valid holiday type' });
		}

		if (validationErrors.length > 0) {
			return { success: false, validationErrors };
		}

		const holiday = this.holidayRepo.create(name, parsedDay, type as HolidayType, description);

		if (!holiday) {
			return { success: false, error: 'Failed to create holiday' };
		}

		return { success: true, data: holiday };
	}

	deleteHoliday(id: number): boolean {
		return this.holidayRepo.hide(id);
	}
}
