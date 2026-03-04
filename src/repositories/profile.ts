/**
 * Profile Repository
 * Data access layer for profile operations
 * @module repositories/profile
 */

import { Database } from 'bun:sqlite';
import type { Profile } from '@/types/database';
import type { IProfileRepository } from '@/domain/ports';

export class ProfileRepository implements IProfileRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	/** Returns the single persisted profile row, if present. */
	get(): Profile | undefined {
		return this.db.query('SELECT * FROM profile LIMIT 1').get() as Profile | undefined;
	}

	/** Updates allowed profile fields on the single profile row. */
	update(data: Partial<Profile>): boolean {
		const profile = this.get();
		if (!profile) return false;

		const fields: string[] = [];
		const values: (string | number | bigint | boolean | Uint8Array | null)[] = [];

		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'id' && value !== undefined) {
				fields.push(`${key} = ?`);
				values.push(value);
			}
		});

		if (fields.length === 0) return false;

		values.push(profile.id);
		this.db.query(`UPDATE profile SET ${fields.join(', ')} WHERE id = ?`).run(...values);
		return true;
	}
}
