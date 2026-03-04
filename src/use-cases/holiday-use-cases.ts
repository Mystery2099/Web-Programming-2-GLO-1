/**
 * Holiday Use Cases
 * Business logic for holiday operations
 * @module use-cases/holiday-use-cases
 */

import type { Holiday, HolidayType } from '@/types/database';
import type { IHolidayRepository, HolidayFilters } from '../domain/ports/holiday-repository.js';
import { validateHoliday } from '@/services';

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
		const name = dto.name ?? '';
		const day = dto.day ?? '';
		const type = dto.type?.trim() ?? '';
		const description = dto.description ?? '';

		const result = validateHoliday(name, day, type, description);

		if (!result.valid) {
			return {
				success: false,
				validationErrors: result.errors as HolidayValidationError[]
			};
		}

		if (!result.data) {
			return { success: false, error: 'Failed to validate holiday' };
		}

		const holiday = this.holidayRepo.create(
			result.data.name,
			result.data.day,
			result.data.type as HolidayType,
			result.data.description ?? ''
		);

		if (!holiday) {
			return { success: false, error: 'Failed to create holiday' };
		}

		return { success: true, data: holiday };
	}

	deleteHoliday(id: number): boolean {
		return this.holidayRepo.hide(id);
	}
}
