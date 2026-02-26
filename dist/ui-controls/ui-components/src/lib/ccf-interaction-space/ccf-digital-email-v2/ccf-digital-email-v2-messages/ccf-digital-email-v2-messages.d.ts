/// <reference types="react" />
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { CXoneMessage } from '@nice-devone/common-sdk';
import { TranslationSettingsRecord } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Interface for the MessageAnalysis object.
 */
export interface MessageAnalysis {
    moreThanThreeLines: boolean;
    onlyTextInFirstThreeLines: boolean;
    firstThreeLinesHtml?: string;
    fullHtml?: string;
}
/**
 * Interface for the CcfEmailMessages component props.
 */
export interface CcfEmailMessagesProps {
    message: CXoneMessage;
    digitalContactDetails: CXoneDigitalContact;
    translationSettings: TranslationSettingsRecord;
    channelType?: string;
    caseId?: string;
    isSingleMessage?: boolean;
    messageAnalysis?: MessageAnalysis;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
}
/**
 * Component to render all email individual messages on Interaction Space in Revamped format
 * @returns Email Messages in revamped format
 * ```
 * @example
 * <CcfDigitalEmailV2Messages/>
 * ```
  */
export declare function CcfDigitalEmailV2Messages(props: CcfEmailMessagesProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfDigitalEmailV2Messages>;
export default _default;
