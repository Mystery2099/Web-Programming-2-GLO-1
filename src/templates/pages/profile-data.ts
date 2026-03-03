import type { Profile } from '../../types/database.js';

export const PORTRAITS = [
	'/static/images/spring/mar_spring.jpg',
	'/static/images/spring/mar_spring2.jpg',
	'/static/images/spring/mar_spring3.jpg',
	'/static/images/spring/mar_spring4.jpg'
] as const;

export const MOODS = ['Celebratory', 'Reflective', 'Energetic', 'Cozy', 'Peaceful'] as const;
export const STYLES = [
	'Cultural & Outdoor',
	'Party & Social',
	'Intimate & Quiet',
	'Adventure & Active'
] as const;
export const SQUAD_SIZES = ['Small Group', 'Medium Group', 'Large Group', 'Just me'] as const;
export const PATRICKS_OPTIONS = [
	'Family dinner',
	'Pub/bar visit',
	'Parade/festival',
	'Quiet celebration'
] as const;

export type Mood = (typeof MOODS)[number];
export type Style = (typeof STYLES)[number];
export type SquadSize = (typeof SQUAD_SIZES)[number];
export type PatricksOption = (typeof PATRICKS_OPTIONS)[number];

export const DEFAULT_PROFILE: Profile = {
	id: 0,
	ambassador_name: 'Mathew Kennedy-Brewer',
	spring_level: 2,
	march_motto: 'Roll for initiative, compile your code. Dream about Kotlin',
	favorite_activity: 'Sleeping',
	go_to_tradition: 'Ricing my Desktop',
	march_mood: 'Reflective',
	celebration_style: 'Intimate & Quiet',
	favorite_color: 'Teal',
	squad_size: 'Small Group',
	dream_destination: 'Akihabara, Japan',
	bucket_list_count: 0,
	st_patricks_preference: 'Quiet celebration'
};

export const getRandomPortrait = (): string => {
	return PORTRAITS[Math.floor(Math.random() * PORTRAITS.length)];
};
