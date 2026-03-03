import { z } from 'zod';

const sanitizedOptionalText = z
	.string()
	.transform((val) => val.trim().replace(/\s+/g, ' '))
	.refine((val) => val.length <= 200, {
		message: 'Must be 200 characters or less'
	});

export const profileSchema = z.object({
	ambassador_name: sanitizedOptionalText,
	favorite_activity: sanitizedOptionalText,
	go_to_tradition: sanitizedOptionalText,
	march_mood: sanitizedOptionalText,
	celebration_style: sanitizedOptionalText,
	favorite_color: sanitizedOptionalText,
	march_motto: sanitizedOptionalText,
	squad_size: sanitizedOptionalText,
	dream_destination: sanitizedOptionalText,
	st_patricks_preference: sanitizedOptionalText
});

export type ProfileSchema = z.infer<typeof profileSchema>;
