import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
/**
 * component function for rendering table component
 * @example ' <CcfTable />'
 */
export function CcfTable({ headerStyle, headersData, rowStyle, rowsData, tableStyle, colWidths, containerStyle, stickyHeader, onRowClick, tabIndexForCells = true, }) {
    const firstCellRef = React.useRef(null);
    React.useEffect(() => {
        var _a;
        (_a = firstCellRef === null || firstCellRef === void 0 ? void 0 : firstCellRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const handleRowClick = React.useCallback((event) => {
        const rowIndex = Number(event.currentTarget.dataset.rowIndex);
        if (Number.isNaN(rowIndex) || !rowsData) {
            return;
        }
        onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowsData[rowIndex]);
    }, [rowsData, onRowClick]);
    const handleRowKeyUp = React.useCallback((event) => {
        if (event.key !== 'Enter') {
            return;
        }
        const rowIndex = Number(event.currentTarget.dataset.rowIndex);
        if (Number.isNaN(rowIndex) || !rowsData) {
            return;
        }
        onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowsData[rowIndex]);
    }, [rowsData, onRowClick]);
    return (_jsx(TableContainer, Object.assign({ sx: containerStyle }, { children: _jsxs(Table, Object.assign({ sx: tableStyle, stickyHeader: stickyHeader, "aria-label": "customized table", role: "presentation" }, { children: [colWidths ? (_jsx("colgroup", { children: colWidths === null || colWidths === void 0 ? void 0 : colWidths.map((colWidth, id) => _jsx("col", { width: colWidth }, id)) })) : '', _jsx(TableHead, { children: _jsx(TableRow, Object.assign({ sx: headerStyle }, { children: headersData === null || headersData === void 0 ? void 0 : headersData.map((header) => (_jsx(TableCell, Object.assign({ "aria-label": header }, { children: header }), header))) })) }), _jsx(TableBody, { children: rowsData === null || rowsData === void 0 ? void 0 : rowsData.map((row, rowIndex) => (_jsx(TableRow, Object.assign({ "data-testid": 'row-click' + row.key, "data-row-index": rowIndex, sx: rowStyle, onClick: handleRowClick, onKeyUp: handleRowKeyUp }, { children: row.data.map((obj, index) => (_createElement(TableCell, Object.assign({ ref: (rowIndex === 0 && index === 0) ? firstCellRef : undefined }, (tabIndexForCells ? { tabIndex: 0 } : {}), { key: row.key ? row.key + index : index }), obj))) }), row.key))) })] })) })));
}
export default memo(CcfTable);
//# sourceMappingURL=ccf-table.js.map