/**
 * Holiday Repository
 * Data access layer for holiday operations
 * @module repositories/holiday
 */

import { Database } from 'bun:sqlite';
import type { Holiday, HolidayType } from '@/types/database';
import type { IHolidayRepository, HolidayFilters } from '../domain/ports/holiday-repository.js';

export class HolidayRepository implements IHolidayRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	/** Returns visible holidays, optionally filtered by type and text query. */
	getAll(filters: HolidayFilters = {}): Holiday[] {
		let query = 'SELECT * FROM holidays WHERE is_hidden = 0';
		const params: string[] = [];

		if (filters.type) {
			query += ' AND type = ?';
			params.push(filters.type);
		}

		query += ' ORDER BY day ASC';
		let holidays = this.db.query(query).all(...params) as Holiday[];

		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			holidays = holidays.filter(
				(h) =>
					h.name.toLowerCase().includes(searchLower) ||
					(h.description && h.description.toLowerCase().includes(searchLower))
			);
		}

		return holidays;
	}

	/** Returns a visible holiday by numeric ID. */
	getById(id: number): Holiday | undefined {
		return this.db.query('SELECT * FROM holidays WHERE id = ? AND is_hidden = 0').get(id) as
			| Holiday
			| undefined;
	}

	/** Returns a visible holiday scheduled on a specific March day. */
	getByDay(day: number): Holiday | undefined {
		return this.db.query('SELECT * FROM holidays WHERE day = ? AND is_hidden = 0').get(day) as
			| Holiday
			| undefined;
	}

	/** Creates a holiday record and returns the inserted row when successful. */
	create(name: string, day: number, type: HolidayType, description: string): Holiday | undefined {
		const result = this.db
			.query('INSERT INTO holidays (name, day, type, description) VALUES (?, ?, ?, ?)')
			.run(name, day, type, description);
		return this.getById(Number(result.lastInsertRowid));
	}

	/** Soft-deletes a holiday by marking it hidden; returns whether a row existed. */
	hide(id: number): boolean {
		const existing = this.db.query('SELECT name FROM holidays WHERE id = ?').get(id) as
			| { name: string }
			| undefined;
		if (existing) {
			this.db.query('UPDATE holidays SET is_hidden = 1 WHERE id = ?').run(id);
			return true;
		}
		return false;
	}

	/** Lists distinct holiday type values from visible holiday rows. */
	getTypes(): string[] {
		const results = this.db
			.query('SELECT DISTINCT type FROM holidays WHERE is_hidden = 0')
			.all() as { type: string }[];
		return results.map((r) => r.type);
	}

	/** Returns the number of visible holiday rows. */
	getCount(): number {
		const result = this.db
			.query('SELECT COUNT(*) as count FROM holidays WHERE is_hidden = 0')
			.get() as { count: number };
		return result.count;
	}
}
