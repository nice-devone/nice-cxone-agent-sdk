import { CXoneDigitalQuickResponse } from './cxone-digital-quick-response';
/**
 * Interface for Quick replies object
 */
export interface CXoneDigitalQuickReply extends CXoneDigitalQuickResponse {
    /**
     * @remarks - Unique identification of Quick reply
     */
    id: number;
    /**
     * @remarks - type of Quick replies
     */
    type: string;
    /**
     * @remarks - external variables is enabled or not
     */
    hasVariables: boolean;
    /**
     * @remarks - title of Quick reply
     */
    title: string;
    /**
     * @remarks - content of Quick reply
     */
    content: string;
    /**
     * @remarks - array of external variables
     */
    externalVariables: Array<string>;
    /**
     * @remarks - Favorite flag
     */
    isfavorite?: boolean;
    /**
    * @remarks - flag to indicate whether quick reply is selected or not
    */
    isSelected?: boolean;
}
/**
 * Interface for CXone digital contact quick replies
 */
export interface CXoneDigitalQuickReplies {
    /**
     * @remarks - record count for Quick replies
     */
    hits: number;
    /**
     * @remarks - Array of Quick replies
     */
    data: Array<CXoneDigitalQuickReply>;
}
/**
 * Interface for CXone digital contact quick replies
 */
export interface FavQuickReply {
    /**
    * @remarks - Unique identification of Quick reply
    */
    id: number;
    /**
     * @remarks - Favorite flag
     */
    isfavorite: boolean;
}
