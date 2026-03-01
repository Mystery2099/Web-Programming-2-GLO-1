/**
 * Tip Repository
 * Data access layer for tip operations
 * @module repositories/tip
 */

import { Database } from 'bun:sqlite';
import type { Tip } from '../types/database.js';
import type { ITipRepository } from '../domain/ports/tip-repository.js';

export class TipRepository implements ITipRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	getAll(): Tip[] {
		return this.db.query('SELECT * FROM tips').all() as Tip[];
	}

	getById(id: number): Tip | undefined {
		return this.db.query('SELECT * FROM tips WHERE id = ?').get(id) as Tip | undefined;
	}

	search(query: string): Tip[] {
		const searchTerm = `%${query}%`;
		return this.db
			.query('SELECT * FROM tips WHERE title LIKE ? OR content LIKE ?')
			.all(searchTerm, searchTerm) as Tip[];
	}

	getByCategory(category: string): Tip[] {
		return this.db.query('SELECT * FROM tips WHERE category = ?').all(category) as Tip[];
	}
}
