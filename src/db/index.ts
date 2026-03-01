/**
 * Database Module
 * Initializes and exports the SQLite database connection
 * @module db/index
 */

import { Database } from 'bun:sqlite';
import type { Holiday, Plan, Tip, Profile } from '../types/database';
import { createSchema } from './schema.js';
import { seedDatabase } from './seeds.js';

const db = new Database('march.db');

createSchema(db);
seedDatabase(db);

export { db };
export type { Holiday, Plan, Tip, Profile };
