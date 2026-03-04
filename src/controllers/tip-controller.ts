import type { TipsPageData } from '@/templates/pages/tips';
import { tipsPage } from '@/templates/pages';
import { TipUseCases } from '@/use-cases';

export class TipController {
	constructor(private tipUseCases: TipUseCases) {}

	getTips(search = '') {
		const tips = search ? this.tipUseCases.search(search) : this.tipUseCases.getAll();
		const tipsData: TipsPageData = { tips, search };
		return { html: tipsPage(tipsData) };
	}

	getAll() {
		return this.tipUseCases.getAll();
	}
}
