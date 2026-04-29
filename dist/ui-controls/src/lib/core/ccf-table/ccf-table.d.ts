import { SxProps } from '@mui/system';
import * as React from 'react';
export interface RowDataStructure {
    key?: number;
    label?: string;
    data: any;
}
/**
 * basic structure for accepatable props for CcfTable component
 */
export interface CcfTableProps {
    headersData?: string[];
    rowsData?: RowDataStructure[];
    colWidths?: string[];
    headerStyle?: SxProps;
    rowStyle?: SxProps;
    tableStyle?: SxProps;
    containerStyle?: SxProps;
    stickyHeader?: boolean;
    onRowClick?: (arg: RowDataStructure) => void;
    tabIndexForCells?: boolean;
}
/**
 * component function for rendering table component
 * @example ' <CcfTable />'
 */
export declare function CcfTable({ headerStyle, headersData, rowStyle, rowsData, tableStyle, colWidths, containerStyle, stickyHeader, onRowClick, tabIndexForCells, }: CcfTableProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfTable>;
export default _default;
