import React from 'react';
import { CXoneRoutingQueue } from '@nice-devone/common-sdk';
/**
 * Interface for defining props of CcfApprovalMenu component
 */
export interface CcfApprovalMenuProps {
    /**
     * @remarks - flag to disable request approval/send message button
     */
    disableButton: boolean;
    /**
     * @remarks - user role permission to send reply to a message
     */
    canReply: boolean;
    /**
     * @remarks - user role permission to request approval for a message
     */
    canCreateDraft: boolean;
    /**
     * @remarks - list of routing queues
     */
    routingQueues: CXoneRoutingQueue[];
    /**
     * @remarks - caseId for the selected case
     */
    caseId: string;
    /**
     * @remarks - if editor text is empty or not
     */
    isEditorEmpty: boolean;
    /**
     * @remarks - number of attachments uploaded
     */
    uploadedAttachments?: number;
    /**
     * @remarks - callback function for clearing the editor after sending the message
     */
    clearEditor?: () => void;
    /**
   * @remarks - object id for inserted NBR
   */
    insertedNbrId?: string;
    /**
     * @remarks - toggle sparkle icon
     */
    toggleSparkleIcon?: () => void;
    /**
     * @remarks - set local editor state to redux for chat messages on send button click in case of approval menu
     */
    setLocalEditorState?: () => void;
    /**
     * @remarks - Boolean value to disable approval dropdown
     */
    disableApprovalDropDown?: boolean;
    /**
     * @remarks - Boolean value to display new email approval button group true when interaction is email and email revamp toggle is enabled
     */
    newEmailRevampEnabled?: boolean;
}
export declare const SEND_MESSAGE = "Send Message";
/**
 * Component displays Request Approval Menu
 * @returns Approval Menu options
 * ```
 * @example
 * <CcfApprovalMenu/>
 * ```
 */
export declare const CcfApprovalMenu: (props: CcfApprovalMenuProps) => JSX.Element;
declare const _default: React.MemoExoticComponent<(props: CcfApprovalMenuProps) => JSX.Element>;
export default _default;
