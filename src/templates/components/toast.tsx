import { Html } from '@elysiajs/html';

export interface ToastProps {
	message: string;
	type?: 'success' | 'error' | 'info';
}

export const Toast = ({ message, type = 'success' }: ToastProps) => (
	<div class={`toast toast-${type}`} aria-live="polite" safe>
		{message}
	</div>
);
