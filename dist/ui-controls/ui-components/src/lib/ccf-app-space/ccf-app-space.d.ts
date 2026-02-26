import { SetStateAction, Dispatch } from 'react';
interface CcfAppSpaceProps {
    setAnchorElementCustomWorkspace: Dispatch<SetStateAction<HTMLDivElement | null>>;
    customWorkSpaceAppSpaceRef: React.RefObject<HTMLDivElement>;
}
/**
 * CcfAppSpace - returns app space panel
 * @returns - appspace
 * @example - `<CcfAppSpace />`
 */
export declare const CcfAppSpace: ({ setAnchorElementCustomWorkspace, customWorkSpaceAppSpaceRef }: CcfAppSpaceProps) => JSX.Element;
export default CcfAppSpace;
