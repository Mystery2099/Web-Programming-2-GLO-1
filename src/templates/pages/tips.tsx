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
					name="search"
					value={search}
					hx-get="/tips"
					hx-target="#tips-list"
					hx-trigger="input changed delay:300ms"
				/>
			</div>

		<div class="cards-grid" id="tips-list">{tipsList(tips)}</div>
	</div>
);
