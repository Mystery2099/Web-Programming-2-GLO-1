import { Html } from '@elysiajs/html';
import type { Profile } from '@/types/database';
import { MOODS, STYLES, SQUAD_SIZES, PATRICKS_OPTIONS } from './profile-data.js';

const { escapeHtml } = Html;

export interface ProfileEditPageData {
	profile: Profile | undefined;
	error?: string;
	field?: string;
}

export const profileEditPage = ({ profile, error = '', field = '' }: ProfileEditPageData) => (
	<div id="profile-edit" class="page profile-edit-page">
		<a href="/profile" class="back-link profile-edit-back-link">
			<i data-lucide="arrow-left" aria-hidden="true"></i>
			<span>Back to Profile</span>
		</a>

		<div class="profile-edit-header">
			<h2>
				<i data-lucide="edit-3" aria-hidden="true"></i> Edit Your Profile
			</h2>
			<p>Update your March identity and celebration preferences.</p>
		</div>

		{error && (
			<div class="profile-edit-error" role="alert">
				<i data-lucide="alert-circle" aria-hidden="true"></i>
				<span>{escapeHtml(error)}</span>
			</div>
		)}

		<form id="edit-profile-form" class="edit-form form" action="/profile" method="post">
			<div class="form-grid">
				<div class={`form-group ${field === 'ambassador_name' ? 'invalid' : ''}`}>
					<label for="ambassador-name">Ambassador Name</label>
					<input
						type="text"
						id="ambassador-name"
						class="form-input"
						name="ambassador_name"
						value={escapeHtml(profile?.ambassador_name ?? 'Mathew Kennedy-Brewer')}
						maxlength={200}
						required
					/>
				</div>

				<div class={`form-group form-group-wide ${field === 'march_motto' ? 'invalid' : ''}`}>
					<label for="march-motto">March Motto</label>
					<textarea
						id="march-motto"
						name="march_motto"
						rows="2"
						class="form-textarea"
						maxlength={200}
					>
						{escapeHtml(
							profile?.march_motto ?? 'Roll for initiative, compile the code. Dream about Kotlin'
						)}
					</textarea>
				</div>

				<div class={`form-group ${field === 'favorite_activity' ? 'invalid' : ''}`}>
					<label for="favorite-activity">Favorite Spring Activity</label>
					<input
						type="text"
						id="favorite-activity"
						class="form-input"
						name="favorite_activity"
						value={escapeHtml(profile?.favorite_activity ?? 'Sleeping')}
						maxlength={200}
					/>
				</div>

				<div class={`form-group ${field === 'go_to_tradition' ? 'invalid' : ''}`}>
					<label for="go-to-tradition">Go-to March Tradition</label>
					<input
						type="text"
						id="go-to-tradition"
						class="form-input"
						name="go_to_tradition"
						value={escapeHtml(profile?.go_to_tradition ?? 'Ricing my Desktop')}
						maxlength={200}
					/>
				</div>

				<div class={`form-group ${field === 'march_mood' ? 'invalid' : ''}`}>
					<label for="march-mood">March Mood</label>
					<select id="march-mood" name="march_mood" class="form-select">
						{MOODS.map((mood) => (
							<option value={mood} selected={profile?.march_mood === mood}>
								{mood as 'safe'}
							</option>
						))}
					</select>
				</div>

				<div class={`form-group ${field === 'celebration_style' ? 'invalid' : ''}`}>
					<label for="celebration-style">Celebration Style</label>
					<select id="celebration-style" name="celebration_style" class="form-select">
						{STYLES.map((style) => (
							<option value={style} selected={profile?.celebration_style === style}>
								{style as 'safe'}
							</option>
						))}
					</select>
				</div>

				<div class={`form-group ${field === 'favorite_color' ? 'invalid' : ''}`}>
					<label for="favorite-color">Favorite March Color</label>
					<input
						type="text"
						id="favorite-color"
						class="form-input"
						name="favorite_color"
						value={escapeHtml(profile?.favorite_color ?? 'Teal')}
						maxlength={200}
					/>
				</div>

				<div class={`form-group ${field === 'squad_size' ? 'invalid' : ''}`}>
					<label for="squad-size">Celebration Squad</label>
					<select id="squad-size" name="squad_size" class="form-select">
						{SQUAD_SIZES.map((size) => (
							<option value={size} selected={profile?.squad_size === size}>
								{size as 'safe'}
							</option>
						))}
					</select>
				</div>

				<div class={`form-group form-group-wide ${field === 'dream_destination' ? 'invalid' : ''}`}>
					<label for="dream-destination">Dream March Destination</label>
					<input
						type="text"
						id="dream-destination"
						class="form-input"
						name="dream_destination"
						value={escapeHtml(profile?.dream_destination ?? 'Akihabara, Japan')}
						maxlength={200}
					/>
				</div>

				<div class="form-group">
					<label for="bucket-list-count">Bucket List Adventures</label>
					<input
						type="number"
						id="bucket-list-count"
						class="form-input"
						name="bucket_list_count"
						value={String(profile?.bucket_list_count ?? 0)}
						min="0"
						max="100"
						step="1"
					/>
				</div>

				<div class={`form-group ${field === 'st_patricks_preference' ? 'invalid' : ''}`}>
					<label for="st-patricks">St. Patrick's Day Plan</label>
					<select id="st-patricks" name="st_patricks_preference" class="form-select">
						{PATRICKS_OPTIONS.map((option) => (
							<option value={option} selected={profile?.st_patricks_preference === option}>
								{option as 'safe'}
							</option>
						))}
					</select>
				</div>

				<div class="form-group">
					<label for="spring-level">Spring Level (1-10)</label>
					<input
						type="range"
						id="spring-level"
						class="range-slider"
						name="spring_level"
						min="1"
						max="10"
						value={String(profile?.spring_level ?? 2)}
					/>
					<span id="spring-level-value">{profile?.spring_level ?? 2}</span>
				</div>
			</div>

			<div class="form-actions">
				<button type="submit" class="btn btn-primary">
					<i data-lucide="save" aria-hidden="true"></i> Save Changes
				</button>
				<a href="/profile" class="btn btn-outline btn-cancel">
					<i data-lucide="x" aria-hidden="true"></i> Cancel
				</a>
			</div>
		</form>

		<script>{`document.addEventListener('DOMContentLoaded', () => {
			const springLevelInput = document.getElementById('spring-level');
			const springLevelValue = document.getElementById('spring-level-value');
			if (springLevelInput && springLevelValue) {
				springLevelInput.addEventListener('input', (e) => {
					const target = e.target;
					if (target && 'value' in target) {
						springLevelValue.textContent = String(target.value);
					}
				});
			}
		});`}</script>
	</div>
);
