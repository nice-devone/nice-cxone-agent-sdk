/// <reference types="react" />
import { Theme } from '@mui/material';
import { CcfTranslationKey } from '@nice-devone/i18n';
import CSS from 'csstype';
import { CXoneDigitalReplyChannel } from '@nice-devone/common-sdk';
export declare enum CcfLabelControlType {
    EMAIL = "email",
    TEXT = "text",
    DROPDOWN = "dropdown"
}
export interface CcfLabelBaseControl {
    label: CcfTranslationKey;
    styles?: {
        wrapper?: CSS.Properties;
        label?: CSS.Properties;
        colon?: CSS.Properties;
        control?: CSS.Properties;
        text?: CSS.Properties;
        tooltip?: CSS.Properties;
    };
    onBlur?: () => void;
}
interface CcfLabelStaticValue extends CcfLabelBaseControl {
    value: string;
    controlType?: string;
    isRequired?: boolean;
    errorMessage?: string;
    isValid?: (validity: boolean) => void;
    onValueChange?: (newValue: string) => void;
    replyChannels?: CXoneDigitalReplyChannel[];
}
interface CcfLabelDynamicControl extends CcfLabelBaseControl {
    value?: string;
    isRequired: boolean;
    controlType: string;
    errorMessage?: string;
    isValid?: (validity: boolean) => void;
    onValueChange: (newValue: string) => void;
    replyChannels?: CXoneDigitalReplyChannel[];
}
export declare type CcfLabelControlProps = CcfLabelStaticValue | CcfLabelDynamicControl;
interface LimitTagsTextProps {
    more: number;
    tooltipText: string;
    styles?: {
        label?: CSS.Properties;
        tooltip?: CSS.Properties;
    };
    theme: Theme;
}
/**
  * Method to get the limit tags text
  * @example - LimitTagsText()
  * @param more - number
*/
export declare const LimitTagsText: ({ more, tooltipText, styles, theme }: LimitTagsTextProps) => JSX.Element;
/**
 * Component to display label and dynamic control or static text
 * @returns a wrapper containing label and dynamic control or static text
 * ```
 * @example
 * <CcfLabelControl
 *  label="To"
 *  value="demo@nice.com"
 * />
 *
 * <CcfLabelControl
 *  label="Subject"
 *  isRequired=true
 *  controlType="text"
 *  onValueChange={handleSubjectChange}
 * />
 *
 * ```
 */
export declare function CcfLabelControl(props: CcfLabelControlProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfLabelControl>;
export default _default;
