import { CXoneRecipientArray } from '@nice-devone/common-sdk';
export interface CcfContactEmailHeaderProps {
    sender: string;
    recipients: CXoneRecipientArray;
    subject: string;
    time: string;
    hasVisibleTitle: boolean;
    channelDisplayName: string;
    isExpanded: boolean;
}
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
 * Component displays Email Header for selected contact
 * @returns Email Header for selected contact
 * ```
 * @example
 * <CcfContactEmailHeader/>
 * ```
 */
export declare function CcfContactEmailHeader(props: CcfContactEmailHeaderProps): JSX.Element;
