import { CXoneDigitalQuickReply } from './cxone-digital-quick-replies';
/**
 * Interface for Quick replies object for outbound
 */
export interface CXoneDigitalOutboundQuickReply {
    /**
     * @remarks - Array of QUick replies for the outbound
     */
    allQuickReplies: CXoneDigitalQuickReply[];
    /**
     * @remarks - Object of next links
     */
    nextLinks: CXoneDigitalNextLinks;
    /**
     * @remarks - total records count
     */
    totalRecords?: number;
}
/**
 * Interface for CXone digital links in outbound Quick replies response
 */
export interface CXoneDigitalNextLinks {
    /**
     * @remarks - represents the current links
     */
    self: string | null;
    /**
     * @remarks - represents the next links
     */
    next: string | null;
    /**
     * @remarks - represents the previous link
     */
    previous: string | null;
}
