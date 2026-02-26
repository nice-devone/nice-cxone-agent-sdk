import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { MenuItem, useTheme } from '@mui/material';
import { CcfDraggableIcon, CcfTypography } from '@nice-devone/ui-controls';
import { getDefaultColumns, SEARCH_TABS_LABEL } from '../ccf-digital-search.slice';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
import { useSelector } from 'react-redux';
import { ColumnType } from './ccf-customizable-menu';
import { getStyle } from './ccf-draggable-columns-styles';
/**
 * CcfCustomizableColumns - to display list of interaction search columns
 * @example - `<CcfCustomizableColumns />`
 */
export const CcfDraggableColumns = (props) => {
    const defaultColumns = useSelector(getDefaultColumns);
    const { droppableId, activeTab } = props;
    const columns = defaultColumns.filter((col) => {
        return droppableId === ColumnType.SELECTED_COLUMNS ? !col.hide && col.headerName : col.hide && col.headerName;
    });
    const theme = useTheme();
    const styles = CcfDigitalSearchStyle(theme);
    return (_jsx(Droppable, Object.assign({ droppableId: droppableId }, { children: (provided) => (_jsxs("div", Object.assign({}, provided.droppableProps, { ref: provided.innerRef }, { children: [columns.map((item, index) => (_jsx(Draggable, Object.assign({ draggableId: item.field, index: index }, { children: (provided, snapshot) => (_jsx("div", Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getStyle(snapshot, provided.draggableProps.style, theme) }, { children: _jsxs(MenuItem, Object.assign({ "data-testid": `option-${item.field}`, sx: styles.menuItem, dense: true }, { children: [_jsx(CcfDraggableIcon, { fontSize: "small" }), _jsx(CcfTypography, Object.assign({ sx: { fontSize: '0.75rem' } }, { children: item.headerName }))] }), item.field) }))) }), item.field))), provided.placeholder, (activeTab === SEARCH_TABS_LABEL.INTERACTIONS && columns.length === 0) ? _jsx(MenuItem, Object.assign({ sx: styles.menuItem, dense: true }, { children: _jsx(CcfTypography, Object.assign({ sx: { fontSize: '0.75rem' } }, { children: "Drag and drop here" })) })) : null] }))) })));
};
//# sourceMappingURL=ccf-draggable-columns.js.map