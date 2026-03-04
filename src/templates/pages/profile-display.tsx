import { Html } from '@elysiajs/html';
import type { Profile } from '@/types/database';
import { DEFAULT_PROFILE, getRandomPortrait } from './profile-data.js';

const { escapeHtml } = Html;

export interface ProfileDisplayProps {
	profile: Profile | undefined;
}

interface ProfileField {
	label: string;
	icon: string;
	value: string | number;
}

const createProfileFields = (profile: Profile | undefined): ProfileField[] => {
	const p = profile;
	return [
		{
			label: 'Favorite Spring Activity',
			icon: 'heart',
			value: p?.favorite_activity ?? DEFAULT_PROFILE.favorite_activity
		},
		{
			label: 'Go-to March Tradition',
			icon: 'calendar',
			value: p?.go_to_tradition ?? DEFAULT_PROFILE.go_to_tradition
		},
		{ label: 'March Mood', icon: 'smile', value: p?.march_mood ?? DEFAULT_PROFILE.march_mood },
		{
			label: 'Celebration Style',
			icon: 'palette',
			value: p?.celebration_style ?? DEFAULT_PROFILE.celebration_style
		},
		{
			label: 'Favorite March Color',
			icon: 'droplet',
			value: p?.favorite_color ?? DEFAULT_PROFILE.favorite_color
		},
		{
			label: 'Celebration Squad',
			icon: 'users',
			value: p?.squad_size ?? DEFAULT_PROFILE.squad_size
		},
		{
			label: 'Dream March Destination',
			icon: 'map-pin',
			value: p?.dream_destination ?? DEFAULT_PROFILE.dream_destination
		},
		{
			label: 'Bucket List Goals',
			icon: 'target',
			value: `${p?.bucket_list_count ?? 0} Adventures Planned`
		},
		{
			label: "St. Patrick's Day Plan",
			icon: 'clover',
			value: p?.st_patricks_preference ?? DEFAULT_PROFILE.st_patricks_preference
		},
		{ label: 'Spring Awakening Energy', icon: 'sun', value: `Level ${p?.spring_level ?? 2}` }
	];
};

export const ProfileDisplay = ({ profile }: ProfileDisplayProps) => {
	const portrait = getRandomPortrait();
	const name = profile?.ambassador_name ?? DEFAULT_PROFILE.ambassador_name;
	const motto = profile?.march_motto ?? DEFAULT_PROFILE.march_motto;
	const springLevel = profile?.spring_level ?? 2;
	const fields = createProfileFields(profile);

	return (
		<div class="profile-card">
			<div class="profile-header">
				<img
					src={portrait}
					alt={`Portrait of ${escapeHtml(name)}`}
					data-title={`Portrait of ${escapeHtml(name)}`}
					class="profile-avatar clickable-image"
				/>
				<div class="profile-info">
					<h2 class="profile-name">{escapeHtml(name)}</h2>
					<p>
						<i data-lucide="sparkles" aria-hidden="true"></i> Spring Level: {springLevel}/10
					</p>
					<p class="profile-motto">
						<em>"{escapeHtml(motto)}"</em>
					</p>
				</div>
			</div>

			<div class="profile-fields">
				{fields.map((field) => (
					<div class="profile-field">
						<label>
							<i data-lucide={field.icon} aria-hidden="true"></i> {field.label}
						</label>
						<span class="field-value">{escapeHtml(String(field.value))}</span>
					</div>
				))}
			</div>
		</div>
	);
};
