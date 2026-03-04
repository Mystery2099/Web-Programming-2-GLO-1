import { Html } from '@elysiajs/html';

const { escapeHtml } = Html;

interface ErrorPageContent {
	statusCode: number;
	title: string;
	message: string;
	ctaLabel: string;
	ctaHref: string;
}

const renderErrorContent = ({
	statusCode,
	title,
	message,
	ctaLabel,
	ctaHref
}: ErrorPageContent) => (
	<div class="error-page">
		<div class="error-card">
			<p class="error-code">{statusCode}</p>
			<h1 class="error-title">{escapeHtml(title)}</h1>
			<p class="error-message">{escapeHtml(message)}</p>
			<div class="error-actions">
				<a href={ctaHref} class="btn btn-primary">
					{escapeHtml(ctaLabel)}
				</a>
				<a href="/holidays" class="btn btn-outline">
					Go To Holidays
				</a>
			</div>
		</div>
	</div>
);

export const notFoundPage = () =>
	renderErrorContent({
		statusCode: 404,
		title: 'Page Not Found',
		message: "The page you're looking for doesn't exist or may have moved.",
		ctaLabel: 'Back To Home',
		ctaHref: '/'
	});

export const serverErrorPage = () =>
	renderErrorContent({
		statusCode: 500,
		title: 'Something Went Wrong',
		message: 'An unexpected error occurred while loading this page. Please try again.',
		ctaLabel: 'Try Home Again',
		ctaHref: '/'
	});

export const htmxErrorFragment = (statusCode: number, message: string) => (
	<div class="error-fragment" role="alert">
		<strong>Error {statusCode}:</strong> {escapeHtml(message)}
	</div>
);
