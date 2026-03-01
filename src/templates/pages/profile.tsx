import { Html } from '@elysiajs/html';
import { escapeHtml } from '../styles.js';
import type { Profile } from '../../types/database.js';

export interface ProfilePageData {
	profile: Profile | undefined;
}

export const profilePage = ({ profile }: ProfilePageData) => {
	const portraits = [
		'/static/images/mar_spring.jpg',
		'/static/images/mar_spring2.jpg',
		'/static/images/mar_spring3.jpg',
		'/static/images/mar_spring4.jpg'
	];
	const randomPortrait = portraits[Math.floor(Math.random() * portraits.length)];

	const moods = ['Celebratory', 'Reflective', 'Energetic', 'Cozy', 'Peaceful'];
	const styles = ['Cultural & Outdoor', 'Party & Social', 'Intimate & Quiet', 'Adventure & Active'];
	const squadSizes = ['Small Group', 'Medium Group', 'Large Group', 'Just me'];
	const patricksOptions = [
		'Family dinner',
		'Pub/bar visit',
		'Parade/festival',
		'Quiet celebration'
	];

	return `
<div id="profile" class="page">
  <div class="profile-header-actions">
    <h2><i data-lucide="user-circle" aria-hidden="true"></i> My March Journey</h2>
    <button class="btn-edit-profile" data-action="toggle-edit-mode">
      <i data-lucide="edit-3" aria-hidden="true"></i>
      <span>Edit Profile</span>
    </button>
  </div>
  <p>Your personal celebration identity and March adventures!</p>

  <div class="profile-card">
    <div class="profile-header">
      <img src="${randomPortrait}"
           alt="Portrait of ${escapeHtml(profile?.ambassador_name || 'Mathew Kennedy-Brewer')}"
           data-title="Portrait of ${escapeHtml(profile?.ambassador_name || 'Mathew Kennedy-Brewer')}"
           class="profile-avatar clickable-image">
      <div class="profile-info">
        <h2 class="profile-name">${escapeHtml(profile?.ambassador_name || 'Mathew Kennedy-Brewer')}</h2>
        <p><i data-lucide="sparkles" aria-hidden="true"></i> Spring Level: ${profile?.spring_level || 2}/10</p>
        <p class="profile-motto"><em>"${escapeHtml(profile?.march_motto || 'Roll for initiative, compile your code. Dream about Kotlin')}"</em></p>
      </div>
    </div>

    <div class="profile-fields">
      <div class="profile-field">
        <label><i data-lucide="heart" aria-hidden="true"></i> Favorite Spring Activity</label>
        <span class="field-value">${escapeHtml(profile?.favorite_activity || 'Sleeping')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="calendar" aria-hidden="true"></i> Go-to March Tradition</label>
        <span class="field-value">${escapeHtml(profile?.go_to_tradition || 'Ricing my Desktop')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="smile" aria-hidden="true"></i> March Mood</label>
        <span class="field-value">${escapeHtml(profile?.march_mood || 'Reflective')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="palette" aria-hidden="true"></i> Celebration Style</label>
        <span class="field-value">${escapeHtml(profile?.celebration_style || 'Intimate & Quiet')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="droplet" aria-hidden="true"></i> Favorite March Color</label>
        <span class="field-value">${escapeHtml(profile?.favorite_color || 'Teal')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="users" aria-hidden="true"></i> Celebration Squad</label>
        <span class="field-value">${escapeHtml(profile?.squad_size || 'Small Group')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="map-pin" aria-hidden="true"></i> Dream March Destination</label>
        <span class="field-value">${escapeHtml(profile?.dream_destination || 'Akihabara, Japan')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="target" aria-hidden="true"></i> Bucket List Goals</label>
        <span class="field-value">${profile?.bucket_list_count || 0} Adventures Planned</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="clover" aria-hidden="true"></i> St. Patrick's Day Plan</label>
        <span class="field-value">${escapeHtml(profile?.st_patricks_preference || 'Quiet celebration')}</span>
      </div>

      <div class="profile-field">
        <label><i data-lucide="sun" aria-hidden="true"></i> Spring Awakening Energy</label>
        <span class="field-value">Level ${profile?.spring_level || 2}</span>
      </div>
    </div>
  </div>

  <form id="edit-profile-form" class="edit-form profile-edit-hidden" action="/profile" method="post" data-action="validate-profile">
    <h3><i data-lucide="edit-3" aria-hidden="true"></i> Edit Your Profile</h3>
    
    <div class="form-grid">
      <div class="form-group">
        <label for="ambassador-name">Ambassador Name</label>
        <input type="text" id="ambassador-name" name="ambassador_name" value="${escapeHtml(profile?.ambassador_name || 'Mathew Kennedy-Brewer')}" required>
      </div>

      <div class="form-group">
        <label for="march-motto">March Motto</label>
        <textarea id="march-motto" name="march_motto" rows="2">${escapeHtml(profile?.march_motto || 'Roll for initiative, compile the code. Dream about Kotlin')}</textarea>
      </div>

      <div class="form-group">
        <label for="favorite-activity">Favorite Spring Activity</label>
        <input type="text" id="favorite-activity" name="favorite_activity" value="${escapeHtml(profile?.favorite_activity || 'Sleeping')}">
      </div>

      <div class="form-group">
        <label for="go-to-tradition">Go-to March Tradition</label>
        <input type="text" id="go-to-tradition" name="go_to_tradition" value="${escapeHtml(profile?.go_to_tradition || 'Ricing my Desktop')}">
      </div>

      <div class="form-group">
        <label for="march-mood">March Mood</label>
        <select id="march-mood" name="march_mood">
          ${moods.map((mood) => `<option value="${mood}" ${profile?.march_mood === mood ? 'selected' : ''}>${mood}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label for="celebration-style">Celebration Style</label>
        <select id="celebration-style" name="celebration_style">
          ${styles.map((style) => `<option value="${style}" ${profile?.celebration_style === style ? 'selected' : ''}>${style}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label for="favorite-color">Favorite March Color</label>
        <input type="text" id="favorite-color" name="favorite_color" value="${escapeHtml(profile?.favorite_color || 'Teal')}">
      </div>

      <div class="form-group">
        <label for="squad-size">Celebration Squad</label>
        <select id="squad-size" name="squad_size">
          ${squadSizes.map((size) => `<option value="${size}" ${profile?.squad_size === size ? 'selected' : ''}>${size}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label for="dream-destination">Dream March Destination</label>
        <input type="text" id="dream-destination" name="dream_destination" value="${escapeHtml(profile?.dream_destination || 'Akihabara, Japan')}">
      </div>

      <div class="form-group">
        <label for="bucket-list-count">Bucket List Adventures</label>
        <input type="number" id="bucket-list-count" name="bucket_list_count" value="${profile?.bucket_list_count || 0}" min="0" max="100">
      </div>

      <div class="form-group">
        <label for="st-patricks">St. Patrick's Day Plan</label>
        <select id="st-patricks" name="st_patricks_preference">
          ${patricksOptions.map((option) => `<option value="${option}" ${profile?.st_patricks_preference === option ? 'selected' : ''}>${option}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label for="spring-level">Spring Level (1-10)</label>
        <input type="range" id="spring-level" name="spring_level" min="1" max="10" value="${profile?.spring_level || 2}" data-action="update-spring-level">
        <span id="spring-level-value">${profile?.spring_level || 2}</span>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary"><i data-lucide="save" aria-hidden="true"></i> Save Changes</button>
      <button type="button" class="btn btn-secondary btn-cancel" data-action="toggle-edit-mode"><i data-lucide="x" aria-hidden="true"></i> Cancel</button>
    </div>
  </form>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
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
    });
  </script>

  <style>
    .profile-edit-hidden {
      display: none;
    }

    .profile-header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .btn-edit-profile {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #C97A58, #B86A48);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-edit-profile:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(201, 122, 88, 0.3);
    }

    .edit-form {
      background: linear-gradient(135deg, #FAF8F5, #F5F2EB);
      border-radius: 16px;
      padding: 2rem;
      margin-top: 1.5rem;
      border: 2px solid rgba(201, 122, 88, 0.2);
    }

    .edit-form h3 {
      margin-bottom: 1.5rem;
      color: #C97A58;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 600;
      color: #2D3748;
      font-size: 0.875rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #E8E4DD;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      background: white;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #C97A58;
      box-shadow: 0 0 0 3px rgba(201, 122, 88, 0.1);
    }

    .form-group input.invalid {
      border-color: #E53E3E;
      animation: shake 0.3s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .form-group textarea {
      resize: vertical;
      min-height: 60px;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 2px solid rgba(201, 122, 88, 0.1);
    }

    .btn-primary,
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #C97A58, #B86A48);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(201, 122, 88, 0.3);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #E8E4DD, #D8D4CD);
      color: #666;
    }

    .btn-secondary:hover {
      background: linear-gradient(135deg, #D8D4CD, #C8C4BD);
      transform: translateY(-2px);
    }

    #spring-level-value {
      margin-left: 0.5rem;
      font-weight: 600;
      color: #C97A58;
    }
  </style>
</div>`;
};
