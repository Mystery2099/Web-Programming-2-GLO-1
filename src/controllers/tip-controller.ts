import type { TipsPageData } from '../templates/pages/tips.js';
import { tipsPage } from '../templates/pages/tips.js';
import { TipUseCases } from '../use-cases/index.js';

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
