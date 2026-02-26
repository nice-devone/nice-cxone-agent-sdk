import { CXoneMessage } from '@nice-devone/common-sdk';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface CcfEmailFooterProps {
    message: CXoneMessage;
    digitalContactDetails: CXoneDigitalContact;
    updateDisplayFooter: () => void;
}
/**
 * CcfDigitalEmailFooter component display footer with reply, reply all forward and action notes buttons
 *
 * @param  props - The sender's details including full name, email, and date.
 * @returns  The rendered email header component.
 * @example
 * ```
 * <CcfDigitalEmailFooter message={message} digitalContactDetails={digitalContactDetails} updateDisplayFooter= {() => void}/>
 * ```
 */
export declare const CcfDigitalEmailFooter: (props: CcfEmailFooterProps) => JSX.Element;
export default CcfDigitalEmailFooter;
