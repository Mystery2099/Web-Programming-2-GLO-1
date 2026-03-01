import type { Tip } from '../../types/database.js';

export interface TipsPageData {
	tips: Tip[];
	search: string;
}

export const tipsPage = ({ tips, search = '' }: TipsPageData) => (
	<div id="tips" class="page">
		<h2>
			<i data-lucide="lightbulb"></i> Safety Tips for March
		</h2>
		<p>Stay safe while enjoying March celebrations!</p>

		<div class="search-filter">
			<label for="tip-search" class="sr-only">
				Search tips
			</label>
			<input
				type="text"
				id="tip-search"
				class="search-input"
				placeholder="Search tips..."
				value={search}
				hx-get="/tips"
				hx-target="#tips-list"
				hx-trigger="input changed delay:300ms"
				hx-vals={JSON.stringify({ search: '' })}
			/>
		</div>

		<div class="cards-grid" id="tips-list">
			{tips.map((t) => (
				<div class="card">
					<h3>
						<i data-lucide="shield-check" aria-hidden="true"></i> {t.title as 'safe'}
					</h3>
					<p>{t.content as 'safe'}</p>
					<span class="tag">{t.category as 'safe'}</span>
				</div>
			))}
		</div>
	</div>
);
