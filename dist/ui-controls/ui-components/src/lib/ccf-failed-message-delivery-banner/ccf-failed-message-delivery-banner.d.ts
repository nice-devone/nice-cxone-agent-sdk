/**
 * Interface typedoc for props - failed message delivery component
 */
interface CcfFailedMessageDeliveryBannerProps {
    caseId: string;
    interactionId?: string | null;
    failedMessage: any;
    messageAuthor: string;
    channelDisplayName?: string;
    wysiwygEnabled: boolean;
}
/**
 * Will be displayed under failed to deliver message
 * @param props - CcfFailedMessageDeliveryBannerProps
 * @returns JSX to show banner
 * @example -
 * ```
 * <CcfFailedMessageDeliveryBanner failedMessage: FailedMessageDetails caseId: string bannerLabel: string }/>
 * ```
 */
export declare function CcfFailedMessageDeliveryBanner(props: CcfFailedMessageDeliveryBannerProps): JSX.Element;
export default CcfFailedMessageDeliveryBanner;
