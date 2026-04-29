/// <reference types="react" />
import { CcfTranslationKey } from '@nice-devone/i18n';
export interface CcfAppToastMessageProps {
    type: string;
    titleKey?: CcfTranslationKey;
    messageKey?: CcfTranslationKey;
    descriptionKey?: CcfTranslationKey;
    primaryBtnText?: CcfTranslationKey;
    secondaryBtnText?: CcfTranslationKey;
    descriptionMessage?: string;
    titleMessage?: string;
    onClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
    triggerPrimaryHandler?: () => void;
    triggerSecondaryHandler?: () => void;
    extraArgs?: {
        format: (number | string)[];
    };
    children?: React.ReactNode;
    naturalCallingSkillListParams?: {
        translateDialerMessages: boolean;
        emptyList: boolean;
    };
    isLoading?: boolean;
    isIndeterminate?: boolean;
    loadingValue?: number;
    blockTransferWhenClosed?: boolean;
}
/***
 * @example Use three type of containers to load this component
 * ie. AppToastContainer - container to load toast message at application level
 *     ComponentToastContainer - container to load toast message at component level
 *     ToolTipToastContainer - container to show toast message as tooltip
 */
export declare function CcfAppToastMessage(props: CcfAppToastMessageProps): JSX.Element;
export default CcfAppToastMessage;
