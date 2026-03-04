/**
 * Tip Repository
 * Data access layer for tip operations
 * @module repositories/tip
 */

import { Database } from 'bun:sqlite';
import type { Tip } from '@/types/database';
import type { ITipRepository } from '@/domain/ports';

export class TipRepository implements ITipRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	/** Returns all safety tips without additional filtering. */
	getAll(): Tip[] {
		return this.db.query('SELECT * FROM tips').all() as Tip[];
	}

	/** Returns one tip by ID, if it exists. */
	getById(id: number): Tip | undefined {
		return this.db.query('SELECT * FROM tips WHERE id = ?').get(id) as Tip | undefined;
	}

	/** Performs a title/content LIKE search for the provided query fragment. */
	search(query: string): Tip[] {
		const searchTerm = `%${query}%`;
		return this.db
			.query('SELECT * FROM tips WHERE title LIKE ? OR content LIKE ?')
			.all(searchTerm, searchTerm) as Tip[];
	}

	/** Returns tips for a specific category value. */
	getByCategory(category: string): Tip[] {
		return this.db.query('SELECT * FROM tips WHERE category = ?').all(category) as Tip[];
	}
}
