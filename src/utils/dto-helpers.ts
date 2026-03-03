export const mapFieldsToDTO = <T extends Record<string, unknown>>(
	data: Record<string, unknown>,
	fields: (keyof T)[]
): Partial<T> => {
	const dto: Partial<T> = {};
	fields.forEach((field) => {
		const key = field as string;
		if (data[key] !== undefined && data[key] !== '') {
			dto[field] = data[key] as T[keyof T];
		}
	});
	return dto;
};

export const mapStringFields = <T extends Record<string, unknown>>(
	data: Record<string, unknown>,
	fields: (keyof T)[]
): Partial<T> => {
	const dto: Partial<T> = {};
	fields.forEach((field) => {
		const key = field as string;
		if (data[key] !== undefined && data[key] !== '') {
			dto[field] = String(data[key]) as T[keyof T];
		}
	});
	return dto;
};
