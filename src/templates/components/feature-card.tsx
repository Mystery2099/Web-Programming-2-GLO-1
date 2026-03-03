import { Html } from '@elysiajs/html';

export interface FeatureCardProps {
	icon: string;
	title: string;
	description: string;
	href: string;
	linkText: string;
}

export const FeatureCard = ({ icon, title, description, href, linkText }: FeatureCardProps) => (
	<div class="card home-feature-card">
		<div class="card-icon-wrapper">
			<i data-lucide={icon} class="card-icon-lg"></i>
		</div>
		<h3>{title}</h3>
		<p>{description}</p>
		<a href={href} class="card-link">
			<span>{linkText}</span>
			<i data-lucide="arrow-right" class="link-arrow"></i>
		</a>
	</div>
);
