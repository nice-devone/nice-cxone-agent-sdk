import React from 'react';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
interface activeContact {
    caseId: string;
    interactionId: string;
    expandedViewDetails: boolean;
}
/**
 * Header fields to be displayed for digital contact
 */
export interface CcfContactContentHeaderProps {
    contactDetail: CXoneDigitalContact;
    activeContact: activeContact;
    isDraftOBDigitalContact: boolean;
}
/**
 * Component to displays interaction space header's content
 * @returns Interaction space header's content
 * @example
 * ```
 * <CcfContactContentHeader {...headerContent}/>
 * ```
 */
export declare function CcfContactContentHeader(props: CcfContactContentHeaderProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfContactContentHeader>;
export default _default;
