import { Dispatch, SetStateAction } from 'react';
interface CcfCustomWorkspacePreloaderProps {
    anchorElcustomWorkspace: HTMLDivElement | null;
    setAnchorElementCustomWorkspace: Dispatch<SetStateAction<HTMLDivElement | null>>;
}
/**
 *
 * @param props - CcfCustomWorkspacePreloaderProps
 * @returns Preloaded iframes for custom workspaces
 * @example - <CcfCustomWorkspacePreloader />
 */
export declare const CcfCustomWorkspacePreloader: (props: CcfCustomWorkspacePreloaderProps) => JSX.Element;
export default CcfCustomWorkspacePreloader;
