/// <reference types="react" />
import { SxProps, Theme } from '@mui/material';
import { GridFeatureMode, GridDensity, GridSortDirection, GridSortModel, GridRowSelectionModel, GridSortItem, GridValueGetterParams, GridValidRowModel, GridValueFormatterParams, ElementSize, GridRowParams, MuiEvent } from '@mui/x-data-grid';
export declare type CcfGridSortDirection = GridSortDirection[];
export declare type CcfGridSortModel = GridSortModel;
export declare type CcfGridSelectionModel = GridRowSelectionModel;
export declare type CcfGridSortItem = GridSortItem;
export declare type CcfGridValidRowModel = GridValidRowModel;
export declare type CcfGridValueFormatterParams = GridValueFormatterParams<any>;
export declare type CcfGridValueGetterParams = GridValueGetterParams<any, GridValidRowModel>;
export declare type CcfGridRowParams = GridRowParams;
export interface CcfGridProps {
    currentPageongrid?: number;
    /**
     * Row property used to set a row ID by.
     @example `<Component pageSize={5} />`
    */
    rowId?: string;
    /**
     * Number of grid columns displayed per page.
     @example `<Component pageSize={5} />`
    */
    pageSize?: number;
    /**
     * Width of entire grid, not individual columns.
     * @example `<Component gridWidth={'100%'} />`
     *
     * @remarks Number for pixels, string for percent.  */
    gridWidth?: number | string;
    /** Height of entire grid in pixels
     *@example `<Component gridHeight{400} />`
     */
    gridHeight?: number | string;
    /**
     * @remarks Allow checkboxes to select values of grid box
     */
    checkboxSelection?: boolean;
    /**
     * Every object in the `columns` array will create a new column
     */
    columns?: {
        /**
         * Field will correspond with object in a row.
         * If field is called `"lastName"` then the key/value pair in row
         *  will need to be `{lastName: 'Curtis'} `*/
        field: string;
        /**
         * headerName will be the name at the top of the column and doesn't
         * correspond to any values.
         *
         */
        headerName: string;
        /**
         * Pixel width of the column
         */
        width?: number;
        /**
         * Can the user edit the value in this column?
         */
        editable?: boolean;
        /**
         * Can pass type for typescript support throughout IDE.
         */
        type?: string;
        sortable?: boolean;
        minWidth?: number;
        flex?: number;
        /**
         * Function that allows to get a specific data instead of field to render in the cell.
         */
        valueGetter?: (params: CcfGridValueGetterParams) => any;
        /**
         * Function that allows to apply a formatter before rendering its value.
         */
        valueFormatter?: (params: CcfGridValueFormatterParams) => any;
        /**
         * The order of the sorting sequence.
         */
        sortingOrder?: CcfGridSortDirection | undefined;
        /**
         * To render kebab menu on each row .
         */
        renderCell?: (params: CcfGridValidRowModel) => any;
        /**
         * property used to hide/show the column in grid
         */
        hide?: boolean;
    }[];
    /**
     * key must correspond to a column field
     * @example `{ id: 1, col1: 'Hello', col2: 'World' },`
    */
    rows?: any[];
    /**
     * Numbers in pixels for height of each row in table
     */
    rowHeight?: number;
    /**
     * Can the user edit fields of the form in real time? Default: false.
     */
    isEditable?: boolean;
    /**
     * Property to manage loading state.
     */
    isLoading?: boolean;
    /**
     * @see https://mui.com/x/react-data-grid/style/
     * @see https://stackblitz.com/run?file=demo.tsx
     */
    sx?: {
        [key: string]: {
            [key: string]: string;
        };
    } | SxProps<Theme>;
    /**
     * Function to execute when a selection is made.
     */
    handleRowSelections?: ((data: CcfGridSelectionModel) => void) | undefined;
    /**
     * Property containing selections.
     */
    selections?: any;
    /**
     * Property to disable column menu.
     */
    disableColumnMenu?: boolean;
    /**
     * Property to display the no rows overlay component.
     */
    noRowsOverlay?: React.ReactElement;
    /**
     * Set the total number of rows, if it is different from the length of the value `rows` prop.
     * If some rows have children (for instance in the tree data), this number represents the amount of top level rows.
     */
    rowCount?: number;
    /**
     * Pagination can be processed on the server or client-side.
     * Set it to 'client' if you would like to handle the pagination on the client-side.
     * Set it to 'server' if you would like to handle the pagination on the server-side.
     */
    paginationMode?: GridFeatureMode;
    /**
     * Callback fired when the current page has changed.
     */
    onPageChange?: (page: number) => void;
    /**
     * Set the density of the grid
     */
    density?: GridDensity | undefined;
    /**
     * If `true`, the selection on click on a row or cell is disabled.
     */
    disableSelectionOnClick?: boolean;
    /**
     * Sorting can be processed on the server or client-side.
     * Set it to 'client' if you would like to handle sorting on the client-side.
     * Set it to 'server' if you would like to handle sorting on the server-side.
     */
    sortingMode?: GridFeatureMode;
    /**
     * Callback fired when the sort model changes before a column is sorted.
     */
    onSortModelChange?: (data: CcfGridSortModel) => void;
    /**
     * Set the sort model of the grid.
     */
    sortModel?: CcfGridSortModel;
    /**
     * Select the pageSize dynamically using the component UI.
     */
    rowsPerPageOptions?: [];
    /**
     * Callback fired on changing the size of grid
     */
    onResize?: (containerSize: ElementSize) => void;
    /**
     * Callback fired on changing the size of grid
     */
    keepNonExistentRowsSelected?: boolean;
    /**
     * event handler for row click action
     */
    onRowClick?: (params: CcfGridRowParams, event: MuiEvent<React.MouseEvent>) => void;
    /**
     * Whether virtualization is disabled.
     */
    disableVirtualization?: boolean;
    /**
     * Whether to show a header overlay for pinned columns.
     */
    showHeaderOverlayForPinnedColumn?: boolean;
    /**
     * Field name for the header.
     */
    headerFieldName?: string;
    /**
     * Custom text labels for DataGrid elements like sort buttons and menus
     */
    sortButtonLabels?: Record<string, string>;
}
/**
 * @example `<CcfGrid values={myArray} />`
 *
 * @returns Muix Grid
 *
 * @see - https://mui.com/x/react-data-grid/
 */
export declare const CcfGrid: ({ keepNonExistentRowsSelected, currentPageongrid, rowId, isEditable, pageSize, gridWidth, gridHeight, rows, columns, checkboxSelection, rowHeight, isLoading, sx, handleRowSelections, selections, disableColumnMenu, noRowsOverlay, rowCount, paginationMode, onPageChange, rowsPerPageOptions, density, disableSelectionOnClick, sortingMode, onSortModelChange, sortModel, onResize, onRowClick, disableVirtualization, showHeaderOverlayForPinnedColumn, headerFieldName, sortButtonLabels, }: CcfGridProps) => JSX.Element;
export default CcfGrid;
