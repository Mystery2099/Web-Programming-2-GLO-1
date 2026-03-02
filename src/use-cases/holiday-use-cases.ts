/**
 * Holiday Use Cases
 * Business logic for holiday operations
 * @module use-cases/holiday-use-cases
 */

import type { Holiday, HolidayType } from '../types/database.js';
import type { IHolidayRepository, HolidayFilters } from '../domain/ports/holiday-repository.js';
import { validateHoliday, type ValidationError } from '../services/validation.js';
import { sanitizeText } from '../utils/validation.js';

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
		const name = sanitizeText(dto.name ?? '');
		const day = dto.day ?? '';
		const type = dto.type?.trim() ?? '';
		const description = sanitizeText(dto.description ?? '');

		const result = validateHoliday(name, day, type);

		if (!result.valid) {
			return {
				success: false,
				validationErrors: result.errors as HolidayValidationError[]
			};
		}

		const parsedDay = parseInt(day, 10);
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
