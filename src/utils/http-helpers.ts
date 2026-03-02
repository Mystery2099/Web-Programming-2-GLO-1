const HTML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#x27;',
};

export const escapeHtml = (str: string): string =>
	str.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] || char);

const URL_SAFE_PATTERN = /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;

export const sanitizeUrl = (url: string): string => {
	const trimmed = url.trim();
	if (!URL_SAFE_PATTERN.test(trimmed)) {
		return '/';
	}
	return trimmed;
};

export const redirectTo = (url: string): string => {
	const safeUrl = sanitizeUrl(url);
	return `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=${escapeHtml(safeUrl)}">
  </head>
  <body></body>
</html>`;
};

export const errorMessage = (message: string): string =>
	`<p style="color: red;">${escapeHtml(message)}</p>`;
