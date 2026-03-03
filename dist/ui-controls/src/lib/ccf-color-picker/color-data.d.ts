import { CcfTranslationKey } from '@nice-devone/i18n';
export interface ColorDataStyleConfig {
    group: string;
    label: CcfTranslationKey;
    id: string;
    property: string;
    value: string;
}
export declare type CustomStyleConfig = Array<ColorDataStyleConfig>;
export declare const TEXT_COLOR_GROUP = "TEXT_COLOR";
export declare const HIGHLIGHT_COLOR_GROUP = "HIGHLIGHT_COLOR";
export declare const colorData: CustomStyleConfig;
export default colorData;
