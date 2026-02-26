import { Dispatch, SetStateAction } from 'react';
/**
 * Declared individual objects containing label and iframe element
 */
export interface PersistentPanelFrame {
    /**
     * @remarks - label of custom workspace
     */
    label: string;
    /**
     * @remarks - Custom workspace iframe element
     */
    frame: () => JSX.Element;
}
interface CcfCustomWorkspaceProps {
    setAnchorElementCustomWorkspace: Dispatch<SetStateAction<HTMLDivElement | null>>;
    displayRef: React.RefObject<HTMLDivElement>;
}
/**
 * Custom Workpsace Container which includes header and iframe
 * @example - <CcfcustomWorkspace />
 * @returns
 */
declare const CcfcustomWorkspace: ({ setAnchorElementCustomWorkspace, displayRef }: CcfCustomWorkspaceProps) => JSX.Element;
export default CcfcustomWorkspace;
