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
export interface CcfDigitalEmailContactHeaderProps {
    contactDetail: CXoneDigitalContact;
    activeContact: activeContact;
    isDraftOBDigitalContact: boolean;
}
/**
 * Component to displays interaction space header's content
 * @returns Interaction space header's content
 * @example
 * ```
 * <CcfDigitalEmailContactHeader {...headerContent}/>
 * ```
 */
export declare function CcfDigitalEmailContactHeader(props: CcfDigitalEmailContactHeaderProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfDigitalEmailContactHeader>;
export default _default;
