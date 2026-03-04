export interface ErrorResponse {
	message: string;
	field?: string;
}

export interface HtmlSuccess {
	html: string;
	isPartial?: boolean;
}

export interface RedirectSuccess {
	redirect: string;
}

export type ControllerResult = HtmlSuccess | RedirectSuccess | { error: ErrorResponse };
