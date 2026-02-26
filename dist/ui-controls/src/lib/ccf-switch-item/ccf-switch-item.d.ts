/// <reference types="react" />
import { CcfTranslationKey } from '@nice-devone/i18n';
interface SettingsSwitchItemProps {
    handleChange: (event: React.SyntheticEvent<Element, Event>, checked: boolean) => void;
    hideLessThanExtraLarge?: boolean;
    icon?: JSX.Element;
    id?: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    name: string;
    text: CcfTranslationKey;
    listStyles?: any;
    labelStyles?: any;
    mdWidth?: number;
}
/**
 *
 * @param param0 - switch parms
 * @example CcfSettingsSwitchItem()
 * @returns
 */
export declare const CcfSwitchItem: ({ handleChange, hideLessThanExtraLarge, icon, id, isChecked, isDisabled, name, text, listStyles, labelStyles, mdWidth, }: SettingsSwitchItemProps) => JSX.Element;
export default CcfSwitchItem;
