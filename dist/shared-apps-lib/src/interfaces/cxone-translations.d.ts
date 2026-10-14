/**
 * Defines optional parameters used to format translated text.
 */
export interface TranslationOptions {
    format?: (string | number)[];
}
/**
 * Retrieves the localized string for the given translation key.
 */
export interface CXoneTranslations {
    translations: (key: string, options?: TranslationOptions) => string;
}
