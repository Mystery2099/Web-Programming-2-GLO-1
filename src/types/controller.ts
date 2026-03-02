export interface ErrorResponse {
	message: string;
	field?: string;
}

export interface HtmlSuccess {
	html?: unknown;
	redirect?: string;
	isPartial?: boolean;
}

export type ControllerResult = HtmlSuccess | { error: ErrorResponse };
