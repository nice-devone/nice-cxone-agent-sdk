import { SvgIconProps } from '@mui/material';
/**
 * interface for CcfFilterIconProps
 */
export interface CcfFilterIconProps {
    /**
     * @remarks  used to set svg icon props for filter options
     */
    svgIconProps: SvgIconProps;
    /**
    * @remarks  used to inform filter is selected or not
    */
    isFilterSelected: boolean;
}
/**
 * CcfFilterIcon used to display filter icon in the contact card history panel
 * @param props - CcfFilterIconProps
 * @example -- <CcfFilterIcon />
 */
export declare function CcfFilterIcon(props: CcfFilterIconProps): JSX.Element;
export default CcfFilterIcon;
