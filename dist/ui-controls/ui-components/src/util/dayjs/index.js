import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
/**
 * util to use date related functionalities
 * @returns - dayjs functions
 * @example - `initializeDaysJS`
 */
const initializeDaysJS = () => {
    dayjs.extend(relativeTime);
    dayjs.extend(localeData);
    dayjs.extend(updateLocale);
};
/**
 *
 * @param language - string
 * @returns - custom dayjs configuration
 * @example - `setCustomConfig`
 */
const setCustomConfig = (language, translate) => {
    dayjs.updateLocale(language, {
        relativeTime: {
            future: 'in %s',
            past: `%s ${translate('pastTimeStamp')}`,
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
        },
    });
};
/**
 *
 * @param dateAndTime - dateTime
 * @returns - time in minutes/hours/days/months ago
 * @example - `createdAtAgoTimeStamp`
 */
export const createdAtAgoTimeStamp = (dateAndTime) => {
    return dayjs(dateAndTime).fromNow();
};
/**
 * load locale for dayjs
 * @param language - string
 * @returns - locale for language
 * @example - `loadDayJSLocale`
 */
export const loadDayJSLocale = (language, translate) => {
    //  if language is different than english load locale else english is default locale
    if (language && language !== 'en-US') {
        // set project specific config before loading locale
        setCustomConfig(language, translate);
        import(`dayjs/locale/${language.toLowerCase()}.js`).then(() => {
            dayjs.locale(language);
        });
    }
    else {
        setCustomConfig('en', translate);
    }
};
/**
 * load locale for current browser
 * @param language - string
 * @example - `loadDayJsCurrentLocale("en-us")`
 */
export const loadDayJsCurrentLocale = (language) => {
    import(`dayjs/locale/${language.toLowerCase()}.js`);
};
initializeDaysJS();
export default dayjs;
//# sourceMappingURL=index.js.map