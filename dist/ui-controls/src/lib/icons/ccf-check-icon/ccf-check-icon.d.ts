import { SvgIconProps } from '@mui/material';
/**
 * interface for CcfCheckIconProps
 */
export interface CcfCheckIconProps {
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
   * CcfFilterIcon used to display check icon on filters button when filter is applied
   * @param props - CcfCheckIconProps
   * @example -- <CcfCheckIcon />
   */
export declare function CcfCheckIcon(props: CcfCheckIconProps): JSX.Element;
export default CcfCheckIcon;
