/// <reference types="react" />
import { EditorState } from 'lexical';
import { CXoneDigitalReplyChannel, CXoneMessage, CXoneRecipientArray } from '@nice-devone/common-sdk';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
/**
 * Attributes required for Handling Reply, reply all or forward Action
 */
export interface handleActionItemClickProps {
    /**
    * @remarks - reply / replyAll / forward
    */
    action: string;
    /**
    * @remarks - message object for which the action needs to be performed
    */
    message: CXoneMessage;
    /**
    * @remarks - current caseId
    */
    caseId: string;
    /**
    * @remarks - current interactionId
    */
    interactionId: string;
    /**
    * @remarks - list of email Ids
    */
    fromAddressList: CXoneDigitalReplyChannel[];
    /**
    * @remarks - current case's sender
    */
    sender: string;
    /**
    * @remarks - ref Object if email is forwarded
    */
    isEmailForwardSelected: React.MutableRefObject<boolean>;
    /**
    * @remarks - empty state of lexical editor
    */
    emptyEditorState: EditorState;
    /**
    * @remarks - RegExp of prefix that should be added before email title
    */
    titlePrefixRegex: RegExp;
    /**
    * @remarks - flag to check if the contact is outbound
    */
    isOutbound?: boolean;
    /**
    * @remarks - Translated string of 're''
    */
    replyPrefixTranslated: string;
    /**
    * @remarks - method to update footer'
    */
    updateDisplayFooter?: () => void;
    /**
    * @remarks - thunk dispatch to dispatch actions
    */
    dispatch: ThunkDispatch<unknown, void, Action>;
}
/**
     * Method used to get the valid from address
     * @param from - current from address
     * @param fromAddressList -list of from Address
     * @example
     * ```
     * getValidFromAddressToReply('test@abcm.com',['watson@nice.com'])
     * ```
     */
export declare const getValidFromAddressToReply: (from: string, fromAddressList: CXoneDigitalReplyChannel[]) => string;
/**
 * Function to get to cc and bcc fields from recipients
 * @returns an object with to, cc and bcc properties
 * ```
 * @example
 * getToCcBccFields(recipients, sender, true)
 * ```
 */
export declare function getToCcBccFields(recipients: CXoneRecipientArray, sender: string, isReplyAll?: boolean): {
    to: string;
    cc: string;
    bcc: string;
};
/**
     * Transform subject for respective action
     * @param message - message: CXoneMessage type
     * @param action - type of action
     * @param isContentRemoved - flag to check if content is removed
     * @param titleTranslated - title prefix regexp
     * @param replyTranslated - reply prefix string
     * @example - addSubject(message, 'Reply', true)
     */
export declare const addSubject: (message: CXoneMessage, action: string, isContentRemoved: boolean | undefined, titleTranslated: RegExp, replyTranslated: string) => string;
/**
   * Handles click events for various email actions and updates the state accordingly.
   *
   * @param props - handleActionItemClickProps
   * @example handleActionItemClick('reply',message, caseId, interactionId, fromAddressList, senderm, isEmailForwardSelected, updateDisplayFooter, dispatch )
   * */
export declare const handleActionItemClick: (props: handleActionItemClickProps) => void;
/**
   * Function to analyze the HTML content of the email message.
   * It checks if the first 3 lines contain only text or if there are images or tables.
   * @param html - The HTML content of the email message.
   * @example analyzeHtmlContent
   */
export declare const analyzeHtmlContent: (html: string) => {
    onlyTextInFirstThreeLines: boolean;
    moreThanThreeLines: boolean;
    firstThreeLinesHtml: string;
    fullHtml: string;
};
