import { CXoneMessage, CXoneMessageArray } from '@nice-devone/common-sdk';
/**
 * @example getParentChildMessageTree
 * @param messages - CXoneMessageArray
 */
export declare function getParentChildMessageTree(messages: CXoneMessageArray): any;
/**
 * @example getParentChildMap
 * @param messageList - CXoneMessageArray
 *  on initial load of messages we will be calling this and storing parent child map in store
 */
export declare function getParentChildMap(messageList: CXoneMessageArray): Map<any, any>;
/**
 * @example addNewMessageIntoMap
 * @param message - CXoneMessage
 * @param flatParentChildMap - map of exisiting parent child messages
 * whenever we receive new message on WS we will add its entry into exisiting messages map
 */
export declare function addNewMessageIntoMap(newMessage: CXoneMessage, flatParentChildMap: Map<string, any>): Map<string, string>;
/**
 * @example getNewCommentPath
 * @param commentId - id of message for which we need to find path in tree
 * @param replyToMessage - id of parent message
 * @param flatParentChildMap - map of exisiting parent child messages
 */
export declare function getNewCommentPath(_commentId: string, replyToMessage: string, flatParentChildMap?: Map<string, any>): string[];
