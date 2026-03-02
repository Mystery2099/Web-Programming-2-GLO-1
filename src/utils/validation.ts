const ALLOWED_TEXT_PATTERN = /^[a-zA-Z0-9\s\-_',.!?]+$/;

export const sanitizeText = (input: string): string => {
	const trimmed = input.trim();
	return trimmed.replace(/\s+/g, ' ');
};

export const isValidText = (text: string): boolean => {
	const sanitized = sanitizeText(text);
	return sanitized.length > 0 && ALLOWED_TEXT_PATTERN.test(sanitized);
};

export const hasSpecialChars = (str: string): boolean => !ALLOWED_TEXT_PATTERN.test(sanitizeText(str));

export { ALLOWED_TEXT_PATTERN };
