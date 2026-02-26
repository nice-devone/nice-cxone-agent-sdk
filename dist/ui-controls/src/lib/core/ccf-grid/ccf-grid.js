import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CcfStickyOverlay } from '../ccf-sticky-overlay/ccf-sticky-overlay';
/**
 * @example `<CcfGrid values={myArray} />`
 *
 * @returns Muix Grid
 *
 * @see - https://mui.com/x/react-data-grid/
 */
export const CcfGrid = ({ keepNonExistentRowsSelected, currentPageongrid = 0, rowId = 'id', isEditable = false, pageSize = 25, gridWidth = '100%', gridHeight = '100%', rows = [], columns = [], checkboxSelection = true, rowHeight = 100, isLoading, sx, handleRowSelections, selections = [], disableColumnMenu = true, noRowsOverlay, rowCount, paginationMode = 'client', onPageChange, rowsPerPageOptions = [], density = 'standard', disableSelectionOnClick = false, sortingMode = 'client', onSortModelChange, sortModel, onResize, onRowClick, disableVirtualization = false, showHeaderOverlayForPinnedColumn = false, headerFieldName, sortButtonLabels, }) => {
    const [key, setKey] = useState(0);
    useEffect(() => {
        if (currentPageongrid === 0) {
            setKey(prevKey => prevKey + 1);
        }
    }, [rows]);
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
    const handlePaginationChange = (newModel) => {
        if (newModel && onPageChange) {
            onPageChange(newModel.page);
        }
    };
    return (_jsxs(Box, Object.assign({ sx: Object.assign({ height: gridHeight, width: gridWidth, position: showHeaderOverlayForPinnedColumn ? 'relative' : 'static' }, sx) }, { children: [showHeaderOverlayForPinnedColumn
                ? _jsx(CcfStickyOverlay, { columnWidth: 50, headerCellSelector: '.MuiDataGrid-columnHeader[data-field=' + headerFieldName + ']', columnHeadersSelector: '.MuiDataGrid-columnHeaders' })
                : null, _jsx(DataGrid, { rows: rows, columns: columns, columnVisibilityModel: columns
                    .filter(item => item.hide)
                    .reduce((acc, item) => {
                    acc[item.field] = false;
                    return acc;
                }, {}), initialState: {
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: pageSize,
                        },
                    },
                }, checkboxSelection: checkboxSelection, disableRowSelectionOnClick: disableSelectionOnClick, rowHeight: rowHeight, getRowId: (row) => row[rowId], loading: isLoading, onRowSelectionModelChange: handleRowSelections, rowSelectionModel: selections, disableColumnMenu: disableColumnMenu, rowCount: rowCount, paginationMode: paginationMode, onPaginationModelChange: handlePaginationChange, pageSizeOptions: rowsPerPageOptions, density: density, sortingMode: sortingMode, onSortModelChange: onSortModelChange, sortModel: sortModel, onResize: onResize, keepNonExistentRowsSelected: keepNonExistentRowsSelected, onRowClick: onRowClick, slots: {
                    noRowsOverlay: () => noRowsOverlay || null,
                    baseCheckbox: (props) => (_jsx(Checkbox, Object.assign({}, props, { inputProps: Object.assign(Object.assign({}, props.inputProps), { 'aria-checked': props.checked }) }))),
                }, disableVirtualization: disableVirtualization, localeText: sortButtonLabels }, key)] })));
};
export default CcfGrid;
//# sourceMappingURL=ccf-grid.js.map