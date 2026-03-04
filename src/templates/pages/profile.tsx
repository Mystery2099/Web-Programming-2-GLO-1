import { Html } from '@elysiajs/html';
import type { Profile } from '@/types/database';
import { ProfileDisplay } from './profile-display.js';

export interface ProfilePageData {
	profile: Profile | undefined;
	message?: string;
}

export const profilePage = ({ profile, message = '' }: ProfilePageData) => (
	<div id="profile" class="page">
		<div class="profile-header-actions">
			<h2>
				<i data-lucide="user-circle" aria-hidden="true"></i> My March Journey
			</h2>
			<a href="/profile/edit" class="btn btn-outline btn-edit-profile">
				<i data-lucide="edit-3" aria-hidden="true"></i>
				<span>Edit Profile</span>
			</a>
		</div>
		<p>Your personal celebration identity and March adventures!</p>

		{message && (
			<div class="profile-notice" role="status" aria-live="polite">
				<i data-lucide="check-circle" aria-hidden="true"></i>
				<span>{message}</span>
			</div>
		)}

		<ProfileDisplay profile={profile} />
	</div>
);
