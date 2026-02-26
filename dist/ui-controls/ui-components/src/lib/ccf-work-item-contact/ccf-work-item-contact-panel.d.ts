import { CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export interface CcfWorkItemContactPanelProps {
    /**
    * @remarks - workItemContact - the CXoneWorkItemContact that holds information on the
    *  associated workitem for these controls
    */
    workItemContact: CXoneWorkItemContact;
    contactId: string;
}
/**
 *
 * @param props - CcfWorkItemContactPanelProps
 * @returns - WorkItem contact panel with controls
 * @example - <CcfWorkItemContactPanel />
 */
export declare const CcfWorkItemContactPanel: (props: CcfWorkItemContactPanelProps) => JSX.Element;
