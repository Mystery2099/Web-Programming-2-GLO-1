import type { HolidaysPageData } from '../templates/holidays.js';
import { holidaysPage } from '../templates/holidays.js';
import { addHolidayPage } from '../templates/pages/add-holiday.js';
import { layout } from '../templates/layout.js';
import { HolidayUseCases, CreateHolidayDTO } from '../use-cases/index.js';

/**
 * Holiday Controller
 * Handles HTTP requests for holiday-related operations
 * @module controllers/holiday-controller
 */
export class HolidayController {
	constructor(private holidayUseCases: HolidayUseCases) {}

	private buildHolidaysPageData(
		params: {
			search?: string;
			filter?: string;
			page?: string;
			itemsPerPage?: string;
			headers: Headers;
		},
		message = ''
	) {
		const isHtmx = params.headers.get('HX-Request') === 'true';
		const search = params.search || '';
		const filter = params.filter || '';
		const page = parseInt(params.page || '1', 10);
		const itemsPerPage = parseInt(params.itemsPerPage || '10', 10);

		const holidays = this.holidayUseCases.getAll({ search, type: filter });
		const types = this.holidayUseCases.getTypes();
		const totalCount = this.holidayUseCases.getCount();

		const holidaysData: HolidaysPageData = {
			holidays,
			types,
			totalCount,
			search,
			filter,
			message,
			page,
			itemsPerPage
		};

		const content = holidaysPage(holidaysData);
		return isHtmx ? content : layout(content, 'Holidays - March Celebration', 'holidays');
	}

	getHolidays(params: {
		search?: string;
		filter?: string;
		page?: string;
		itemsPerPage?: string;
		message?: string;
		headers: Headers;
	}) {
		return this.buildHolidaysPageData(params, params.message);
	}

	getAddHolidayPage(errorMessage?: string, errorField?: 'name' | 'day' | 'type') {
		return layout(
			addHolidayPage(errorMessage, errorField),
			'Add Holiday - March Celebration',
			'holidays'
		);
	}

	createHoliday(formData: Record<string, unknown>) {
		const dto: CreateHolidayDTO = {
			name: formData.name as string,
			day: formData.day as string,
			type: formData.type as string,
			description: formData.description as string
		};

		const result = this.holidayUseCases.createHoliday(dto);

		if (!result.success) {
			if (result.validationErrors && result.validationErrors.length > 0) {
				const firstError = result.validationErrors[0];
				return {
					error: {
						message: firstError.message,
						field: firstError.field
					}
				};
			}
			return {
				error: {
					message: result.error || 'An error occurred',
					field: 'name' as const
				}
			};
		}

		return {
			redirect: '/holidays?message=Holiday added successfully!'
		};
	}

	deleteHoliday(params: {
		id: string;
		search?: string;
		filter?: string;
		page?: string;
		itemsPerPage?: string;
		headers: Headers;
	}) {
		const numericId = parseInt(params.id, 10);
		this.holidayUseCases.deleteHoliday(numericId);

		return this.buildHolidaysPageData(params, 'Holiday deleted successfully!');
	}

	getAll() {
		return this.holidayUseCases.getAll();
	}
}
