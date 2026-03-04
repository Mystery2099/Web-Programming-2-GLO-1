import { Html } from '@elysiajs/html';
import type { Tip } from '@/types/database';

export interface TipsPageData {
	tips: Tip[];
	search: string;
}

export const tipsList = (tips: Tip[]) => (
	<>
		{tips.length > 0 ? (
			tips.map((t) => (
				<div class="card">
					<h3>
						<i data-lucide="shield-check" aria-hidden="true"></i> {t.title}
					</h3>
					<p>{t.content}</p>
					<span class="tag">{t.category}</span>
				</div>
			))
		) : (
			<div class="empty-state">
				<div class="empty-state__icon">💡</div>
				<h3 class="empty-state__title">No tips match your search</h3>
				<p class="empty-state__description">
					Try a different keyword to discover more March safety and celebration tips.
				</p>
			</div>
		)}
	</>
);

export const tipsPage = ({ tips, search = '' }: TipsPageData) => {
	const categoryCount = new Set(tips.map((tip) => tip.category)).size;

	return (
		<div id="tips" class="page">
			<h2>
				<i data-lucide="lightbulb"></i> Safety Tips for March
			</h2>
			<p>Stay safe while enjoying March celebrations!</p>

			<div class="tips-top-grid">
				<div class="search-filter tips-search-card">
					<div class="tips-search-head">
						<h3>
							<i data-lucide="search" aria-hidden="true"></i> Find A Tip
						</h3>
						<p>Filter by keyword to quickly find the right guidance.</p>
					</div>
					<label for="tip-search" class="sr-only">
						Search tips
					</label>
					<input
						type="text"
						id="tip-search"
						class="search-input"
						placeholder="Search tips..."
						name="search"
						value={search}
						hx-get="/tips"
						hx-target="#tips-list"
						hx-trigger="input changed delay:300ms"
					/>
					<p class="tips-search-meta">
						{tips.length} tips across {categoryCount} categories.
					</p>
				</div>

				<aside class="tips-side-panel" aria-label="Safety focus">
					<h3>
						<i data-lucide="shield-alert" aria-hidden="true"></i> Focus For March
					</h3>
					<ul class="tips-focus-list">
						<li>Layer for shifting weather and rain.</li>
						<li>Use safer transport for celebration nights.</li>
						<li>Protect breathing and skin during spring bloom.</li>
					</ul>
				</aside>
			</div>

			<div class="cards-grid" id="tips-list">{tipsList(tips)}</div>
		</div>
	);
};
