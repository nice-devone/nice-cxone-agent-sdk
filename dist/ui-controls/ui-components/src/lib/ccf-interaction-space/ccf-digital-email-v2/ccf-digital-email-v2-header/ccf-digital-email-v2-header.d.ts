/// <reference types="react" />
import { CXoneMessage, CXoneRecipientArray } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
/**
 * Interface for the CcfEmailHeader component props.
 */
export interface CcfEmailHeaderProps {
    message: CXoneMessage;
    digitalContactDetails: CXoneDigitalContact;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
}
/**
 * Function to append formatted email addresses to a string.
 * @param existing - The existing string of email addresses.
 * @param formatted - The new formatted email address to append.
 * @returns The updated string of email addresses.
 * ```
 * @example
 * appendFormatted(existing, formatted)
 * ```
 */
export declare const appendFormatted: (existing: string, formatted: string) => string;
/**
 * Function to get to cc and bcc fields from recipients
 * @returns an object with to, cc and bcc properties
 * ```
 * @example
 * getToCcBccFields(recipients)
 * ```
 */
export declare function getToCcBccFields(recipients: CXoneRecipientArray, sender: string, isReplyAll?: boolean): {
    to: string;
    cc: string;
    bcc: string;
};
/**
 * CcfEmailHeader component displays the email header with sender details, date, and action icons.
 *
 * @param  props - The sender's details including full name, email, and date.
 * @returns  The rendered email header component.
 * @example
 * ```
 * <CcfEmailHeader message={message} digitalContactDetails={digitalContactDetails} />
 * ```
 */
export declare const CcfDigitalEmailV2Header: (props: CcfEmailHeaderProps) => JSX.Element;
declare const _default: import("react").MemoExoticComponent<(props: CcfEmailHeaderProps) => JSX.Element>;
export default _default;
