/// <reference types="react" />
import { CXoneMessageArray, CXoneMessageDraftsArray } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { TranslationSettingsRecord } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
interface CcfDigitalEmailV2Props {
    messages: CXoneMessageArray;
    digitalContactDetails: CXoneDigitalContact;
    translationSettings: TranslationSettingsRecord;
    messageDrafts?: CXoneMessageDraftsArray;
    sender?: string;
    channelType?: string;
    isPrivateChannel?: boolean;
    wysiwygEnabled: boolean;
}
/**
 * Component to render the new revamped Email on Interaction Space
 * @returns Revamped Email Component Sections
 * ```
 * @example
 * <CcfDigitalEmailV2/>
 * ```
  */
export declare function CcfDigitalEmailV2(props: CcfDigitalEmailV2Props): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfDigitalEmailV2>;
export default _default;
