/**
 * Server Types
 * TypeScript interfaces for server operations
 * @module types/server
 */

// Server Route Types

export interface ValidationResult {
	valid: boolean;
	error?: string;
	field?: string;
}

export interface HolidayFormData {
	name: string;
	day: string;
	type: string;
	description?: string;
}

export interface PlanFormData {
	activity: string;
}

export interface HolidayQueryParams {
	search?: string;
	filter?: string;
	message?: string;
	page?: string;
	itemsPerPage?: string;
}

export interface TipQueryParams {
	search?: string;
}

export interface RouteContext {
	params: Record<string, string>;
	query: Record<string, string>;
	body: Record<string, unknown> | null;
	request: Request;
}

export interface HTMXContext extends RouteContext {
	isHtmx: boolean;
}
