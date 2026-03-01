/**
 * Template Types
 * TypeScript interfaces for template components
 * @module types/templates
 */

// Template Component Types

export type HTMLTemplate = string;

export interface PageConfig {
	title?: string;
	currentPage?: string;
	includeWrapper?: boolean;
}

// Client-side function types for window object
export interface MarchAppWindow {
	isDark: boolean;
	baseSize: number;
	highlightEnabled: boolean;
	marchAppInitialized?: boolean;
	toggleTheme: () => void;
	updateTextSize: (size: string | number) => void;
	toggleHighlight: () => void;
	validateForm: (form: HTMLFormElement) => boolean;
	validateHolidayForm: (form: HTMLFormElement) => boolean;
	setupSearch: (inputId: string, containerId: string, itemSelector: string) => void;
	savePreference: (key: string, value: string) => void;
	loadPreferences: () => void;
	resetPreferences: () => void;
	toggleAnimations: (enabled: boolean | string) => void;
}

declare global {
	interface Window extends MarchAppWindow {}
}
