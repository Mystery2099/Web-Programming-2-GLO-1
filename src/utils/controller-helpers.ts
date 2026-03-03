import type { ControllerResult } from '@/types/controller';

export type HtmlResponse = 
	| { html: string; isPartial: true }
	| { html: string; isPartial?: false };

export const htmlResponse = (html: string, isPartial = false): HtmlResponse => {
	if (isPartial) {
		return { html, isPartial: true };
	}
	return { html };
};

export const redirectResponse = (url: string): ControllerResult => ({ 
	redirect: url 
});

export const errorResponse = (message: string, field?: string): ControllerResult => ({ 
	error: { message, field } 
});
