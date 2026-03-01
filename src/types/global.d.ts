// Global Type Declarations

interface GLightboxOptions {
	selector: string;
	touchNavigation?: boolean;
	zoomable?: boolean;
	draggable?: boolean;
	loop?: boolean;
	autoplayVideos?: boolean;
	moreLength?: number;
}

interface GLightboxInstance {
	open: (options?: { index?: number }) => void;
	close: () => void;
	goTo: (index: number) => void;
	next: () => void;
	prev: () => void;
	destroy: () => void;
}

interface LucideNamespace {
	icons: Record<string, unknown>;
	createIcons: (options?: { nameAttr?: string; type?: string }) => void;
	replace: () => void;
}

declare global {
	interface Window {
		lucide: LucideNamespace;
		GLightbox: new (options: GLightboxOptions) => GLightboxInstance;
		htmx?: {
			ajax: (verb: string, path: string, options?: Record<string, unknown>) => void;
			on: (event: string, listener: (evt: Event) => void) => void;
			off: (event: string, listener: (evt: Event) => void) => void;
			trigger: (elt: Element | string, event: string, data?: Record<string, unknown>) => void;
			find: (selector: string) => Element | null;
			findAll: (selector: string) => Element[];
			process: (elt: Element) => void;
			refresh: (elt?: Element) => void;
			requestValidation: (elt: Element, validationPrefix?: string) => boolean;
		};
	}
}

export {};
