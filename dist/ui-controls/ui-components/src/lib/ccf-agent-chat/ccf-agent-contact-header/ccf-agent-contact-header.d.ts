interface CcfAgentContactProps {
    onBackClick?: () => void;
    isSmView?: boolean;
    isContentSearchEnabled?: boolean;
}
/**
 * Component for ccf agents header
 * @example - <CcfAgentContactHeader />
 * @returns
 */
export declare const CcfAgentContactHeader: ({ onBackClick, isSmView, isContentSearchEnabled }: CcfAgentContactProps) => JSX.Element;
export default CcfAgentContactHeader;
