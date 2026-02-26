import dayjs from 'dayjs';
import { CcfTranslationKey } from '@nice-devone/i18n';
/**
 *
 * @param dateAndTime - dateTime
 * @returns - time in minutes/hours/days/months ago
 * @example - `createdAtAgoTimeStamp`
 */
export declare const createdAtAgoTimeStamp: (dateAndTime: string) => string;
/**
 * load locale for dayjs
 * @param language - string
 * @returns - locale for language
 * @example - `loadDayJSLocale`
 */
export declare const loadDayJSLocale: (language: string, translate: (input: CcfTranslationKey) => string) => void;
/**
 * load locale for current browser
 * @param language - string
 * @example - `loadDayJsCurrentLocale("en-us")`
 */
export declare const loadDayJsCurrentLocale: (language: string) => void;
export default dayjs;
