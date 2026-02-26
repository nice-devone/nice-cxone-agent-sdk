/// <reference types="react" />
interface CcfContactMessageTimeStampProps {
    createdAt: string;
    direction?: string;
    styles?: {
        inboundMessageTimeStamp: object;
        outboundMessageTimeStamp: object;
        timeStampTooltipArrow?: object;
        timeStampTooltip?: object;
    };
    timestampPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
    arrow?: boolean;
}
declare const _default: import("react").MemoExoticComponent<(props: CcfContactMessageTimeStampProps) => JSX.Element>;
export default _default;
