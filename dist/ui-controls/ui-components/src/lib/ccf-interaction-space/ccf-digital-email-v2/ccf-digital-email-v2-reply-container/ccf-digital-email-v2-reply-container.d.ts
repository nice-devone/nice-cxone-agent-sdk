/// <reference types="react" />
import { PopOverMenuItem } from '@nice-devone/ui-controls';
import { CXoneMessage } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
/**
 * Interface for the CcfDigitalEmailV2ReplyContainer component props.
 */
interface CcfDigitalEmailV2ReplyContainerProps {
    canDeleteContent: boolean;
    canDeleteAuthorName: boolean;
    digitalContactDetails: CXoneDigitalContact;
    onKebabMenuItemSelection: (item: PopOverMenuItem) => () => void;
    message: CXoneMessage;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
}
/**
 * Component to render the new revamped Email reply forward options on Email header
 * @returns Reply Forward Options on Revamped Email
 * ```
 * @example
 * <CcfDigitalEmailV2ReplyContainer/>
 * ```
 */
export declare function CcfDigitalEmailV2ReplyContainer(props: CcfDigitalEmailV2ReplyContainerProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfDigitalEmailV2ReplyContainer>;
export default _default;
