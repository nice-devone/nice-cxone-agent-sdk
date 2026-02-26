/// <reference types="react" />
export interface CcfAppHeaderProps {
    helpUrl?: string;
    bodyRef?: React.RefObject<HTMLDivElement>;
    isConversationsStandAlone?: boolean;
}
/**
 * Component displays App header on landing screen
 * @param props - ? - CcfAppHeaderProps
 * @returns app header component for landing screen
 * @example <CcfAppHeader/>
 */
export declare function CcfAppHeader(props: CcfAppHeaderProps): JSX.Element;
export default CcfAppHeader;
