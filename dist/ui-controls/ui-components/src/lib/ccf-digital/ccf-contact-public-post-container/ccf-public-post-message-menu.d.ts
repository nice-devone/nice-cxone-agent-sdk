import * as React from 'react';
import { CXoneMessage, ReactionType } from '@nice-devone/common-sdk';
import { MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface CcfInteractionMenuProps {
    contactDetails: CXoneDigitalContact;
    message: CXoneMessage;
    actionFlags: ccfMessageActionFlags;
    showConfirmationDialog?: (state: boolean, actionType: MessageKebabMenu) => void;
    moreButtonStyles?: object;
    /**
    * Is original post or not
    */
    isOriginalPost: boolean;
    /**
    * Function to handle reply action
    */
    onReply?: (message: CXoneMessage) => void;
    /**
    * Function to handle add or remove reaction on post
    */
    addOrRemoveMessageReaction?: (isSelected: boolean, selectedReactionType: ReactionType) => void;
}
export interface ccfHandleMessageProps {
    msgId: string;
    isHidden: boolean;
    interactionId: string;
    caseId: string;
}
export interface ccfMessageDeleteProps {
    msgId: string;
    isDeleted: boolean;
    interactionId: string;
    caseId: string;
}
/**
 * interface for action flags
 */
export interface ccfMessageActionFlags {
    /**
    * Is current customer or not
    */
    isCurrentCustomer: boolean;
    /**
    * is share option selected or not
    */
    isShareSelected: boolean;
    /**
    * is message hidden or not
    */
    isMessageHidden: boolean;
    /**
    *  is message deleted or not
    */
    isMessageDeleted: boolean;
    /**
    * can delete the content or not
    */
    canDeleteContent: boolean;
    /**
    * can delete the author name or not
    */
    canDeleteAuthorName: boolean;
    /**
     * is reply allowed or not
     */
    isReplyAllowed: boolean;
}
/**
 * Component displays Kebab menu for messages
 * @returns Kebab menu for messages
 * ```
 * @example
 * <CcfPublicPostMessageMenu/>
 * ```
 */
export declare function CcfPublicPostMessageMenu(props: CcfInteractionMenuProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfPublicPostMessageMenu>;
export default _default;
