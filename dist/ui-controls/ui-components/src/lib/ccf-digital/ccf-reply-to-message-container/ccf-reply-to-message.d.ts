export interface CcfReplyToMessageProps {
    caseId: string;
    interactionId?: string;
    idOnExternalPlatform?: string;
}
/**
 * renders the single chat message
 * @param props - CcfReplyToMessageProps
 * @example <CcfReplyToMessage />
 * @returns CcfReplyToMessageComponent
 */
declare const CcfReplyToMessage: ({ caseId, interactionId, idOnExternalPlatform, }: CcfReplyToMessageProps) => JSX.Element;
export default CcfReplyToMessage;
