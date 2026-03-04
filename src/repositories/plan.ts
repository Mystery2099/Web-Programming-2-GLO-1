/**
 * Plan Repository
 * Data access layer for plan operations
 * @module repositories/plan
 */

import { Database } from 'bun:sqlite';
import type { Plan } from '@/types/database';
import type { IPlanRepository } from '@/domain/ports';

export class PlanRepository implements IPlanRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	getAll(includeHidden = false): Plan[] {
		const query = includeHidden
			? 'SELECT * FROM plans ORDER BY is_pinned DESC, created_at DESC'
			: 'SELECT * FROM plans WHERE is_hidden = 0 ORDER BY is_pinned DESC, created_at DESC';
		return this.db.query(query).all() as Plan[];
	}

	getById(id: number): Plan | undefined {
		return this.db.query('SELECT * FROM plans WHERE id = ? AND is_hidden = 0').get(id) as
			| Plan
			| undefined;
	}

	create(activity: string): Plan | undefined {
		const result = this.db.query('INSERT INTO plans (activity) VALUES (?)').run(activity);
		return this.getById(Number(result.lastInsertRowid));
	}

	toggleComplete(id: number): boolean {
		const existing = this.db.query('SELECT is_completed FROM plans WHERE id = ?').get(id) as
			| { is_completed: number }
			| undefined;
		if (existing) {
			this.db
				.query('UPDATE plans SET is_completed = ? WHERE id = ?')
				.run(existing.is_completed ? 0 : 1, id);
			return true;
		}
		return false;
	}

	togglePin(id: number): boolean {
		const existing = this.db.query('SELECT is_pinned FROM plans WHERE id = ?').get(id) as
			| { is_pinned: number }
			| undefined;
		if (existing) {
			this.db
				.query('UPDATE plans SET is_pinned = ? WHERE id = ?')
				.run(existing.is_pinned ? 0 : 1, id);
			return true;
		}
		return false;
	}

	hide(id: number): boolean {
		const existing = this.db.query('SELECT id FROM plans WHERE id = ?').get(id) as
			| { id: number }
			| undefined;
		if (existing) {
			this.db.query('UPDATE plans SET is_hidden = 1 WHERE id = ?').run(id);
			return true;
		}
		return false;
	}
}
