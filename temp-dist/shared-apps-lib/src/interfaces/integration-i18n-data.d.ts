/**
 * Interface for localization data to be
 * sent to cxone-agent from integration apps
 */
import { ISupportedLocales } from "@nice-devone/i18n";
export interface Integrationi18nData {
    /**
     * Locale string, should be one of ISupportedLocales
     */
    locale: ISupportedLocales;
}
