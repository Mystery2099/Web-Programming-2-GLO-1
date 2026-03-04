const HTML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#x27;',
};

export const escapeHtml = (str: string): string =>
	str.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] || char);

export const sanitizeUrl = (url: string): string => {
	const trimmed = url.trim();
	if (!trimmed.startsWith('/')) {
		return '/';
	}

	if (trimmed.startsWith('//')) {
		return '/';
	}

	if (/[\r\n\t]/.test(trimmed)) {
		return '/';
	}

	return trimmed;
};

export const redirectTo = (url: string): string => {
	const safeUrl = sanitizeUrl(url);
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="0;url=${escapeHtml(safeUrl)}">
  </head>
  <body></body>
</html>`;
};
