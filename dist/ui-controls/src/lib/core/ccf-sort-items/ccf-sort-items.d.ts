import { PopoverOrigin, PopoverPosition } from '@mui/material/Popover';
import { SxProps } from '@mui/system';
import { SortOrder } from '@nice-devone/digital-sdk';
/**
 * basic structure for accepatable props for CcfSortItems component
 */
export interface CcfSortItemsProps {
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    anchorPosition?: PopoverPosition;
    sortItemTxt: string;
    sortCriteriaList: string[];
    paperStyles?: SxProps;
    defaultSortOrder: SortOrder.DESC | SortOrder.ASC;
    defaultSortCriteria: string;
    performSorting: (arg: SortingParameters) => void;
}
/**
 * basic structure for accepatable arguments for performSorting method
 * @example
 * performSorting(SortingParameters)
 */
export interface SortingParameters {
    sortingOrder: SortOrder.DESC | SortOrder.ASC;
    sortingCriteria: string;
}
/**
 * component function for rendering sorting attributes
 * @example ' <CcfSortItems />'
 */
export declare function CcfSortItems({ anchorOrigin, transformOrigin, sortItemTxt, sortCriteriaList, paperStyles, anchorPosition, defaultSortOrder, defaultSortCriteria, performSorting, }: CcfSortItemsProps): JSX.Element;
export default CcfSortItems;
