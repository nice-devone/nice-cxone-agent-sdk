import { translations } from "./lib/english/english.translations";
export declare type CcfTranslatorProviderType = typeof translations;
export declare type CcfTranslationKey = keyof typeof translations.text;
export declare type CcfTranslations = typeof translations.text;
