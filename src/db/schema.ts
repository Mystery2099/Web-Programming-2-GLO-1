/**
 * Database Schema
 * Creates and maintains the database table structure
 * @module db/schema
 */

import { Database } from 'bun:sqlite';

export const createSchema = (db: Database): void => {
	db.run(`
		CREATE TABLE IF NOT EXISTS holidays (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			day INTEGER NOT NULL,
			type TEXT NOT NULL,
			description TEXT,
			is_hidden INTEGER DEFAULT 0
		)
	`);

	try {
		db.run(`ALTER TABLE holidays ADD COLUMN is_hidden INTEGER DEFAULT 0`);
	} catch {
		// Column already exists
	}

	db.run(`
		CREATE TABLE IF NOT EXISTS plans (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			activity TEXT NOT NULL,
			is_completed INTEGER DEFAULT 0,
			is_hidden INTEGER DEFAULT 0,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP,
			is_pinned INTEGER DEFAULT 0
		)
	`);

	try {
		db.run(`ALTER TABLE plans ADD COLUMN is_hidden INTEGER DEFAULT 0`);
	} catch {
		// Column already exists
	}

	try {
		db.run(`ALTER TABLE plans ADD COLUMN is_pinned INTEGER DEFAULT 0`);
	} catch {
		// Column already exists
	}

	db.run(`
		CREATE TABLE IF NOT EXISTS tips (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			content TEXT NOT NULL,
			category TEXT DEFAULT 'safety'
		)
	`);

	db.run(`
		CREATE TABLE IF NOT EXISTS profile (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			ambassador_name TEXT NOT NULL,
			favorite_activity TEXT,
			go_to_tradition TEXT,
			march_mood TEXT,
			celebration_style TEXT,
			favorite_color TEXT,
			march_motto TEXT,
			squad_size TEXT,
			dream_destination TEXT,
			bucket_list_count INTEGER,
			st_patricks_preference TEXT,
			spring_level INTEGER
		)
	`);
};
