/**
 * Database Seeds
 * Populates initial data for the application
 * @module db/seeds
 */

import { Database } from 'bun:sqlite';

export const seedDatabase = (db: Database): void => {
	const holidayCount = db.query('SELECT COUNT(*) as count from holidays').get() as {
		count: number;
	};
	if (holidayCount.count === 0) {
		const insert = db.prepare(
			'INSERT INTO holidays (name, day, type, description) VALUES (?, ?, ?, ?)'
		);
		const holidays: [string, number, string, string][] = [
			[
				"St. David's Day",
				1,
				'Cultural',
				'National day of Wales, celebrating Welsh culture and heritage'
			],
			[
				"International Women's Day",
				8,
				'Global',
				"Celebrating women's achievements and advocating for gender equality"
			],
			[
				'Pi Day',
				14,
				'Fun',
				'Celebrate the mathematical constant π (3.14159...) with pies and math activities'
			],
			[
				"St. Patrick's Day",
				17,
				'Cultural',
				'Celebrating Irish culture and heritage with parades and green festivities'
			],
			[
				'First Day of Spring',
				19,
				'Astronomical',
				'The vernal equinox marks the beginning of spring in the Northern Hemisphere'
			],
			[
				'World Forestry Day',
				21,
				'Environmental',
				'Raising awareness about the importance of forests and sustainable forestry'
			],
			[
				'World Water Day',
				22,
				'Environmental',
				'Focusing on the importance of freshwater and sustainable water management'
			],
			[
				'International Day for the Elimination of Racial Discrimination',
				21,
				'Global',
				'Promoting equality and fighting racial discrimination worldwide'
			],
			[
				'National Cookie Day',
				24,
				'Fun',
				'A day to enjoy your favorite cookies and perhaps bake some new ones'
			],
			[
				'Easter Sunday',
				31,
				'Religious',
				'Christian celebration of the resurrection of Jesus Christ'
			],
			[
				'National Single Parent Day',
				26,
				'Awareness',
				'Honoring and supporting single parents who raise children alone'
			],
			[
				'World Theatre Day',
				27,
				'Cultural',
				'Celebrating the importance of theatre and its impact on culture'
			]
		];
		holidays.forEach((h) => insert.run(...h));
	}

	const tipCount = db.query('SELECT COUNT(*) as count from tips').get() as { count: number };
	if (tipCount.count === 0) {
		const insert = db.prepare('INSERT INTO tips (title, content, category) VALUES (?, ?, ?)');
		const tips: [string, string, string][] = [
			[
				'Stay Weather Aware',
				'March weather can be unpredictable. Always check the forecast before heading out and dress in layers.',
				'weather'
			],
			[
				'Allergy Season Begins',
				'If you have seasonal allergies, start taking medications early and keep windows closed on windy days.',
				'health'
			],
			[
				'Outdoor Activity Safety',
				'When hiking or walking outdoors, wear appropriate footwear and stay on marked trails.',
				'outdoor'
			],
			[
				"St. Patrick's Day Safety",
				'If celebrating with alcohol, designate a sober driver or use ride-sharing services.',
				'safety'
			],
			[
				'Sun Protection',
				"Even on cloudy days, UV rays can be strong. Don't forget sunscreen when spending time outdoors.",
				'health'
			],
			[
				'Spring Cleaning Safety',
				'Use cleaning products in well-ventilated areas and keep chemicals away from children and pets.',
				'safety'
			],
			[
				'Driving in Rain',
				'March often brings rain. Slow down, use headlights, and maintain safe following distances.',
				'safety'
			],
			[
				'Pet Safety',
				'Spring plants can be toxic to pets. Keep lilies and tulips away from cats and dogs.',
				'health'
			],
			[
				'Sports Safety',
				'If participating in spring sports, always warm up properly and use appropriate protective gear.',
				'outdoor'
			],
			[
				'Festival Crowd Safety',
				'Stay aware of your surroundings at large gatherings, keep valuables secure, and have a meeting point.',
				'safety'
			]
		];
		tips.forEach((t) => insert.run(...t));
	}

	const profileCount = db.query('SELECT COUNT(*) as count from profile').get() as { count: number };
	if (profileCount.count === 0) {
		const insert = db.prepare(
			`INSERT INTO profile (
				ambassador_name, favorite_activity, go_to_tradition, march_mood,
				celebration_style, favorite_color, march_motto, squad_size,
				dream_destination, bucket_list_count, st_patricks_preference, spring_level
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		);
		insert.run(
			'Mathew Kennedy-Brewer',
			'Sleeping',
			'Ricing my Desktop',
			'Reflective',
			'Intimate & Quiet',
			'Teal',
			'Roll for initiative, compile the code. Dream about Kotlin',
			'Small Group',
			'Akihabara, Japan',
			0,
			'Quiet celebration',
			2
		);
	}

	const plansCount = db.query('SELECT COUNT(*) as count from plans').get() as { count: number };
	if (plansCount.count === 0) {
		const insert = db.prepare('INSERT INTO plans (activity, is_completed) VALUES (?, ?)');
		const plans: [string, number][] = [
			['Plant spring bulbs in the garden', 0],
			['Go on a scenic spring nature walk', 0],
			['Try a new seasonal spring recipe', 0],
			["Attend local St. Patrick's Day parade", 0],
			['Watch sunset on spring equinox', 0],
			['Bake shamrock-shaped cookies', 0],
			['Visit botanical gardens for spring blooms', 0],
			['Plan and host a spring cleaning party', 0],
			['Learn about March astronomy and planets', 0],
			['Organize a March-themed movie night', 0],
			['Create a spring playlist and share it', 0],
			['Take photos of first spring flowers', 0]
		];
		plans.forEach((p) => insert.run(...p));
	}
};
