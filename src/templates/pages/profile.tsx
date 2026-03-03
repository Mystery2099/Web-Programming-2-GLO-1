import { Html } from '@elysiajs/html';
import type { Profile } from '@/types/database';
import { MOODS, STYLES, SQUAD_SIZES, PATRICKS_OPTIONS, getRandomPortrait } from './profile-data.js';

const { escapeHtml } = Html;

export interface ProfilePageData {
	profile: Profile | undefined;
}

export const profilePage = ({ profile }: ProfilePageData) => {
	const randomPortrait = getRandomPortrait();

	return (
		<div id="profile" class="page">
			<div class="profile-header-actions">
				<h2>
					<i data-lucide="user-circle" aria-hidden="true"></i> My March Journey
				</h2>
				<button class="btn-edit-profile" data-action="toggle-edit-mode">
					<i data-lucide="edit-3" aria-hidden="true"></i>
					<span>Edit Profile</span>
				</button>
			</div>
			<p>Your personal celebration identity and March adventures!</p>

			<div class="profile-card">
				<div class="profile-header">
					<img
						src={randomPortrait}
						alt={`Portrait of ${escapeHtml(profile?.ambassador_name ?? 'Mathew Kennedy-Brewer')}`}
						data-title={`Portrait of ${escapeHtml(profile?.ambassador_name ?? 'Mathew Kennedy-Brewer')}`}
						class="profile-avatar clickable-image"
					/>
					<div class="profile-info">
						<h2 class="profile-name">
							{escapeHtml(profile?.ambassador_name ?? 'Mathew Kennedy-Brewer')}
						</h2>
						<p>
							<i data-lucide="sparkles" aria-hidden="true"></i> Spring Level:{' '}
							{profile?.spring_level ?? 2}/10
						</p>
						<p class="profile-motto">
							<em>
								"
								{escapeHtml(
									profile?.march_motto ??
										'Roll for initiative, compile your code. Dream about Kotlin'
								)}
								"
							</em>
						</p>
					</div>
				</div>

				<div class="profile-fields">
					<div class="profile-field">
						<label>
							<i data-lucide="heart" aria-hidden="true"></i> Favorite Spring Activity
						</label>
						<span class="field-value">{escapeHtml(profile?.favorite_activity ?? 'Sleeping')}</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="calendar" aria-hidden="true"></i> Go-to March Tradition
						</label>
						<span class="field-value">
							{escapeHtml(profile?.go_to_tradition ?? 'Ricing my Desktop')}
						</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="smile" aria-hidden="true"></i> March Mood
						</label>
						<span class="field-value">{escapeHtml(profile?.march_mood ?? 'Reflective')}</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="palette" aria-hidden="true"></i> Celebration Style
						</label>
						<span class="field-value">
							{escapeHtml(profile?.celebration_style ?? 'Intimate & Quiet')}
						</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="droplet" aria-hidden="true"></i> Favorite March Color
						</label>
						<span class="field-value">{escapeHtml(profile?.favorite_color ?? 'Teal')}</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="users" aria-hidden="true"></i> Celebration Squad
						</label>
						<span class="field-value">{escapeHtml(profile?.squad_size ?? 'Small Group')}</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="map-pin" aria-hidden="true"></i> Dream March Destination
						</label>
						<span class="field-value">
							{escapeHtml(profile?.dream_destination ?? 'Akihabara, Japan')}
						</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="target" aria-hidden="true"></i> Bucket List Goals
						</label>
						<span class="field-value">{profile?.bucket_list_count ?? 0} Adventures Planned</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="clover" aria-hidden="true"></i> St. Patrick's Day Plan
						</label>
						<span class="field-value">
							{escapeHtml(profile?.st_patricks_preference ?? 'Quiet celebration')}
						</span>
					</div>

					<div class="profile-field">
						<label>
							<i data-lucide="sun" aria-hidden="true"></i> Spring Awakening Energy
						</label>
						<span class="field-value">Level {profile?.spring_level ?? 2}</span>
					</div>
				</div>
			</div>

			<form
				id="edit-profile-form"
				class="edit-form form profile-edit-hidden"
				action="/profile"
				method="post"
				data-action="validate-profile"
			>
				<h3>
					<i data-lucide="edit-3" aria-hidden="true"></i> Edit Your Profile
				</h3>

				<div class="form-grid">
					<div class="form-group">
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

					<div class="form-group form-group-wide">
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

					<div class="form-group">
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

					<div class="form-group">
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

					<div class="form-group">
						<label for="march-mood">March Mood</label>
						<select id="march-mood" name="march_mood" class="form-select">
							{MOODS.map((mood) => (
								<option value={mood} selected={profile?.march_mood === mood}>
									{mood as 'safe'}
								</option>
							))}
						</select>
					</div>

					<div class="form-group">
						<label for="celebration-style">Celebration Style</label>
						<select id="celebration-style" name="celebration_style" class="form-select">
							{STYLES.map((style) => (
								<option value={style} selected={profile?.celebration_style === style}>
									{style as 'safe'}
								</option>
							))}
						</select>
					</div>

					<div class="form-group">
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

					<div class="form-group">
						<label for="squad-size">Celebration Squad</label>
						<select id="squad-size" name="squad_size" class="form-select">
							{SQUAD_SIZES.map((size) => (
								<option value={size} selected={profile?.squad_size === size}>
									{size as 'safe'}
								</option>
							))}
						</select>
					</div>

					<div class="form-group form-group-wide">
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

					<div class="form-group">
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
							data-action="update-spring-level"
						/>
						<span id="spring-level-value">{profile?.spring_level ?? 2}</span>
					</div>
				</div>

				<div class="form-actions">
					<button type="submit" class="btn btn-primary">
						<i data-lucide="save" aria-hidden="true"></i> Save Changes
					</button>
					<button type="button" class="btn btn-secondary btn-cancel" data-action="toggle-edit-mode">
						<i data-lucide="x" aria-hidden="true"></i> Cancel
					</button>
				</div>
			</form>

			<script>{`document.addEventListener('DOMContentLoaded', () => {
      const toggleButtons = document.querySelectorAll('[data-action="toggle-edit-mode"]');
      const profileCard = document.querySelector('.profile-card');
      const editForm = document.getElementById('edit-profile-form');
      const editButton = document.querySelector('.btn-edit-profile');

      toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
          if (editForm.classList.contains('profile-edit-hidden')) {
            profileCard.style.display = 'none';
            editForm.classList.remove('profile-edit-hidden');
            editButton.style.display = 'none';
          } else {
            profileCard.style.display = 'block';
            editForm.classList.add('profile-edit-hidden');
            editButton.style.display = 'inline-flex';
          }
        });
      });

      const springLevelInput = document.getElementById('spring-level');
      const springLevelValue = document.getElementById('spring-level-value');
      if (springLevelInput && springLevelValue) {
        springLevelInput.addEventListener('input', (e) => {
          springLevelValue.textContent = e.target.value;
        });
      }

      const editFormEl = document.getElementById('edit-profile-form');
      if (editFormEl) {
        editFormEl.addEventListener('submit', (e) => {
          const nameInput = editFormEl.querySelector('#ambassador-name');
          if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            e.preventDefault();
            return false;
          }
          nameInput.classList.remove('invalid');
        });
      }
    });`}</script>

			<style>{`
				.profile-edit-hidden {
					display: none;
				}
				
				@keyframes shake {
					0%, 100% { transform: translateX(0); }
					25% { transform: translateX(-5px); }
					75% { transform: translateX(5px); }
				}
			`}</style>
		</div>
	);
};
