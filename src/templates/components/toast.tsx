import { Html } from '@elysiajs/html';
import { escapeHtml } from '@/utils/http-helpers';

export interface ToastProps {
	message: string;
	type?: 'success' | 'error' | 'info';
}

export const Toast = ({ message, type = 'success' }: ToastProps) => (
	<div class={`toast toast-${type}`} aria-live="polite">
		{escapeHtml(message)}
	</div>
);
