import { CcfTranslationKey } from '@nice-devone/i18n';
export interface CcfButtonListProps {
    items: CcfButtonListItemProps[];
    controlWidth: string;
    iconTooltipTranslationKey: CcfTranslationKey;
}
export interface CcfButtonListItemProps {
    labelTranslationKey: CcfTranslationKey;
    action: () => void;
    isDisable?: boolean;
}
/**
 * Component used to display Button
 * @param items - List of buttons
 * @param controlWidth - control width
 * @param iconTooltipTranslationKey - tooltip for the down arrow icon
 * @example <CcfButtonList />
 * @returns  Button
 */
export declare function CcfButtonList({ items, controlWidth, iconTooltipTranslationKey, ...other }: CcfButtonListProps): JSX.Element;
export default CcfButtonList;
