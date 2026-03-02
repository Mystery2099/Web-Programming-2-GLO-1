export const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export const hasSpecialChars = (str: string): boolean => SPECIAL_CHARS_REGEX.test(str);
