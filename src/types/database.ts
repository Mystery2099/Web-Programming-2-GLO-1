/**
 * Database Types
 * TypeScript interfaces for database entities
 * @module types/database
 */

// Shared constants
export const HOLIDAY_TYPES = [
	'Cultural',
	'Global',
	'Fun',
	'Astronomical',
	'Environmental',
	'Religious',
	'Awareness'
] as const;

export type HolidayType = (typeof HOLIDAY_TYPES)[number];

export interface Holiday {
	id: number;
	name: string;
	day: number;
	type: HolidayType;
	description: string | null;
	is_hidden: number;
}

export interface Plan {
	id: number;
	activity: string;
	is_completed: number;
	is_hidden: number;
	created_at: string;
	is_pinned: number;
}

export interface Tip {
	id: number;
	title: string;
	content: string;
	category: string;
}

export interface Profile {
	id: number;
	ambassador_name: string;
	favorite_activity: string;
	go_to_tradition: string;
	march_mood: string;
	celebration_style: string;
	favorite_color: string;
	march_motto: string;
	squad_size: string;
	dream_destination: string;
	bucket_list_count: number;
	st_patricks_preference: string;
	spring_level: number;
}

