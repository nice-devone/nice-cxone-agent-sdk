import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTheme, Box, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ccfTableActionMenuPluginStyles from './ccf-table-action-menu-plugin.styles';
import { $deleteTableColumn, $getElementGridForTableNode, $getTableCellNodeFromLexicalNode, $getTableColumnIndexFromTableCellNode, $getTableNodeFromLexicalNodeOrThrow, $getTableRowIndexFromTableCellNode, $insertTableColumn, $insertTableRow, $isTableCellNode, $isTableRowNode, $removeTableRowAtIndex, getTableSelectionFromTableElement, TableCellHeaderStates, TableCellNode, } from '@lexical/table';
import { $getRoot, $getSelection, $isRangeSelection, DEPRECATED_$isGridSelection, } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HIGHLIGHT_COLOR_GROUP, colorData, useTranslator } from '@nice-devone/ui-controls';
/**
 *
 * @example <TableActionMenu/>
 * @returns Table cell action menues
 */
export const TableActionMenu = ({ onClose, tableCellNode: _tableCellNode, setIsMenuOpen, contextRef, }) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const style = ccfTableActionMenuPluginStyles(theme);
    const [editor] = useLexicalComposerContext();
    const dropDownRef = useRef(null);
    const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
    const [selectionCounts, updateSelectionCounts] = useState({
        columns: 1,
        rows: 1,
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colors = colorData.filter((color) => color.group === HIGHLIGHT_COLOR_GROUP);
    useEffect(() => {
        return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
            const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === 'updated';
            if (nodeUpdated) {
                editor.getEditorState().read(() => {
                    updateTableCellNode(tableCellNode.getLatest());
                });
            }
        });
    }, [editor, tableCellNode]);
    useEffect(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if (DEPRECATED_$isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                updateSelectionCounts({
                    columns: selectionShape.toX - selectionShape.fromX + 1,
                    rows: selectionShape.toY - selectionShape.fromY + 1,
                });
            }
        });
    }, [editor]);
    useEffect(() => {
        const menuButtonElement = contextRef.current;
        const dropDownElement = dropDownRef.current;
        if (menuButtonElement != null && dropDownElement != null) {
            const menuButtonRect = menuButtonElement.getBoundingClientRect();
            dropDownElement.style.opacity = '1';
            dropDownElement.style.left = `${menuButtonRect.left + menuButtonRect.width + window.pageXOffset + 5}px`;
            dropDownElement.style.top = `${menuButtonRect.top + window.pageYOffset}px`;
        }
    }, [contextRef, dropDownRef]);
    useEffect(() => {
        /**
         * Method to handle menu dropdown behavior when clicked outside
         * @example handleClickOutside(e);
         */
        function handleClickOutside(event) {
            if (dropDownRef.current != null &&
                contextRef.current != null &&
                !dropDownRef.current.contains(event.target) &&
                !contextRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [setIsMenuOpen, contextRef]);
    const clearTableSelection = useCallback(() => {
        editor.update(() => {
            if (tableCellNode.isAttached()) {
                const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
                const tableElement = editor.getElementByKey(tableNode.getKey());
                if (!tableElement) {
                    throw new Error('Expected to find tableElement in DOM');
                }
                const tableSelection = getTableSelectionFromTableElement(tableElement);
                if (tableSelection !== null) {
                    tableSelection.clearHighlight();
                }
                tableNode.markDirty();
                updateTableCellNode(tableCellNode.getLatest());
            }
            const rootNode = $getRoot();
            rootNode.selectStart();
        });
    }, [editor, tableCellNode]);
    const insertTableRowAtSelection = useCallback((shouldInsertAfter) => {
        editor.update(() => {
            const selection = $getSelection();
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            let tableRowIndex;
            if (DEPRECATED_$isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                tableRowIndex = shouldInsertAfter
                    ? selectionShape.toY
                    : selectionShape.fromY;
            }
            else {
                tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            }
            const grid = $getElementGridForTableNode(editor, tableNode);
            $insertTableRow(tableNode, tableRowIndex, shouldInsertAfter, selectionCounts.rows, grid);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, selectionCounts.rows, clearTableSelection, onClose]);
    const insertTableColumnAtSelection = useCallback((shouldInsertAfter) => {
        editor.update(() => {
            const selection = $getSelection();
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            let tableColumnIndex;
            if (DEPRECATED_$isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                tableColumnIndex = shouldInsertAfter
                    ? selectionShape.toX
                    : selectionShape.fromX;
            }
            else {
                tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
            }
            const grid = $getElementGridForTableNode(editor, tableNode);
            $insertTableColumn(tableNode, tableColumnIndex, shouldInsertAfter, selectionCounts.columns, grid);
            clearTableSelection();
            onClose();
        });
    }, [
        editor,
        tableCellNode,
        selectionCounts.columns,
        clearTableSelection,
        onClose
    ]);
    const deleteTableRowAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            $removeTableRowAtIndex(tableNode, tableRowIndex);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const deleteTableAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            tableNode.remove();
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const deleteTableColumnAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
            $deleteTableColumn(tableNode, tableColumnIndex);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const toggleTableRowIsHeader = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            const tableRows = tableNode.getChildren();
            if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
                throw new Error('Expected table cell to be inside of table row.');
            }
            const tableRow = tableRows[tableRowIndex];
            if (!$isTableRowNode(tableRow)) {
                throw new Error('Expected table row');
            }
            tableRow.getChildren().forEach((tableCell) => {
                if (!$isTableCellNode(tableCell)) {
                    throw new Error('Expected table cell');
                }
                tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW);
            });
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const toggleTableColumnIsHeader = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
            const tableRows = tableNode.getChildren();
            tableRows.forEach(tableRow => {
                if (!$isTableRowNode(tableRow)) {
                    throw new Error('Expected table row');
                }
                const tableCells = tableRow.getChildren();
                if (tableColumnIndex >= tableCells.length ||
                    tableColumnIndex < 0 ||
                    !$isTableCellNode(tableCells[tableColumnIndex])) {
                    throw new Error('Expected table cell to be inside of table row and be a valid table cell.');
                }
                const tableCell = tableCells[tableColumnIndex];
                tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN);
            });
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    /**
     * Method to change bg color of selected cell/s
     * @example handleCellBackgroundColor(selectedColor)
     */
    const handleCellBackgroundColor = (value) => {
        var _a;
        const colorDetails = colorData.filter(color => color.id === value);
        const selectedColor = colorDetails ? (_a = colorDetails[0]) === null || _a === void 0 ? void 0 : _a.value : '';
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                if ($isTableCellNode(tableCellNode)) {
                    tableCellNode.setBackgroundColor(selectedColor);
                }
            }
            if (DEPRECATED_$isGridSelection(selection)) {
                const nodes = selection.getNodes();
                nodes.forEach(node => {
                    if ($isTableCellNode(node)) {
                        node.setBackgroundColor(selectedColor);
                    }
                });
            }
        });
    };
    return createPortal(_jsxs(Box, Object.assign({ sx: style.dropdown, ref: dropDownRef, onClick: (e) => {
            e.stopPropagation();
        } }, { children: [!showColorPicker &&
                _jsxs(Box, Object.assign({ id: 'dropdown-contents', "data-testid": 'dropdown-contents' }, { children: [_jsx(Box, Object.assign({ "data-testid": 'bg-color', sx: style.item, onClick: () => { setShowColorPicker(true); } }, { children: _jsx(Box, Object.assign({ component: 'span', sx: style.text }, { children: translate('bgColor') })) })), _jsx("hr", {}), _jsx(Box, Object.assign({ "data-testid": 'insert-row-above', sx: style.item, onClick: () => insertTableRowAtSelection(false) }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [translate('insert'), ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', translate('above')] })) })), _jsx(Box, Object.assign({ "data-testid": 'insert-row-below', sx: style.item, onClick: () => insertTableRowAtSelection(true) }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [translate('insert'), ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', translate('below')] })) })), _jsx("hr", {}), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'insert-row-right', onClick: () => insertTableColumnAtSelection(false) }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [translate('insert'), ' ', selectionCounts.columns === 1
                                        ? 'column'
                                        : `${selectionCounts.columns} columns`, ' ', translate('left')] })) })), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'insert-row-left', onClick: () => insertTableColumnAtSelection(true) }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [translate('insert'), ' ', selectionCounts.columns === 1
                                        ? 'column'
                                        : `${selectionCounts.columns} columns`, ' ', translate('right')] })) })), _jsx("hr", {}), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'delete-column', onClick: () => deleteTableColumnAtSelection() }, { children: _jsx(Box, Object.assign({ component: 'span', sx: style.text }, { children: translate('deleteColumn') })) })), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'delete-row', onClick: () => deleteTableRowAtSelection() }, { children: _jsx(Box, Object.assign({ component: 'span', sx: style.text }, { children: translate('deleteRow') })) })), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'delete-table', onClick: () => deleteTableAtSelection() }, { children: _jsx(Box, Object.assign({ component: 'span', sx: style.text }, { children: translate('deleteTable') })) })), _jsx("hr", {}), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'row-header', onClick: () => toggleTableRowIsHeader() }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [((tableCellNode === null || tableCellNode === void 0 ? void 0 : tableCellNode.__headerState) & TableCellHeaderStates.ROW) ===
                                        TableCellHeaderStates.ROW
                                        ? translate('remove')
                                        : translate('add'), ' ', translate('rowHeader')] })) })), _jsx(Box, Object.assign({ sx: style.item, "data-testid": 'column-header', onClick: () => toggleTableColumnIsHeader() }, { children: _jsxs(Box, Object.assign({ component: 'span', sx: style.text }, { children: [((tableCellNode === null || tableCellNode === void 0 ? void 0 : tableCellNode.__headerState) & TableCellHeaderStates.COLUMN) ===
                                        TableCellHeaderStates.COLUMN
                                        ? translate('remove')
                                        : translate('add'), ' ', translate('columnHeader')] })) }))] })), showColorPicker &&
                _jsxs(Box, Object.assign({ sx: style.ColorPickerPopover }, { children: [_jsx(Button, Object.assign({ sx: style.ColorResetButton, onClick: () => handleCellBackgroundColor('') }, { children: "Reset" })), _jsx(Box, Object.assign({ sx: style.ColorButtonContainer }, { children: colors.map(({ id, value }) => (_jsx(Box, { component: 'button', title: 'label', sx: Object.assign(Object.assign({}, style.ColorButton), { backgroundColor: value }), onClick: () => handleCellBackgroundColor(id), "data-testid": id }))) }))] }))] })), document.body);
};
/**
 *
 * @example <TableCellActionMenuContainer/>
 * @returns Table cell action menues
 */
export function TableCellActionMenuContainer({ anchorElem, }) {
    const theme = useTheme();
    const style = ccfTableActionMenuPluginStyles(theme);
    const [editor] = useLexicalComposerContext();
    const menuButtonRef = useRef(null);
    const menuRootRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [tableCellNode, setTableMenuCellNode] = useState(null);
    const moveMenu = useCallback(() => {
        const menu = menuButtonRef.current;
        const selection = $getSelection();
        const nativeSelection = window.getSelection();
        const activeElement = document.activeElement;
        if (selection == null || menu == null) {
            setTableMenuCellNode(null);
            return;
        }
        const rootElement = editor.getRootElement();
        if ($isRangeSelection(selection) &&
            rootElement !== null &&
            nativeSelection !== null &&
            rootElement.contains(nativeSelection.anchorNode)) {
            const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(selection.anchor.getNode());
            if (tableCellNodeFromSelection == null) {
                setTableMenuCellNode(null);
                return;
            }
            const tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey());
            if (tableCellParentNodeDOM == null) {
                setTableMenuCellNode(null);
                return;
            }
            setTableMenuCellNode(tableCellNodeFromSelection);
        }
        else if (!activeElement) {
            setTableMenuCellNode(null);
        }
    }, [editor]);
    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.getEditorState().read(() => {
                moveMenu();
            });
        });
    });
    useEffect(() => {
        var _a, _b;
        const menuButtonDOM = menuButtonRef.current;
        if (menuButtonDOM != null && tableCellNode != null) {
            const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey());
            if (tableCellNodeDOM != null) {
                const tableCellRect = tableCellNodeDOM.getBoundingClientRect();
                const menuRect = menuButtonDOM.getBoundingClientRect();
                const anchorRect = anchorElem.getBoundingClientRect();
                menuButtonDOM.style.opacity = '1';
                //get element with scroll
                const richTextContainer = document.getElementById('richTextEditorBody');
                //get scroll position for to get the exact position off table cell 
                const scrollOffsetLeft = (_a = richTextContainer === null || richTextContainer === void 0 ? void 0 : richTextContainer.scrollLeft) !== null && _a !== void 0 ? _a : 0;
                const scrollOffsetTop = (_b = richTextContainer === null || richTextContainer === void 0 ? void 0 : richTextContainer.scrollTop) !== null && _b !== void 0 ? _b : 0;
                //adding scroll left value if there is any horizontal scroll
                menuButtonDOM.style.left = `${tableCellRect.right - menuRect.width - 10 - anchorRect.left + scrollOffsetLeft}px`;
                //adding scroll top value if there is any vertical scroll
                menuButtonDOM.style.top = `${tableCellRect.top - anchorRect.top + scrollOffsetTop + 4}px`;
            }
            else {
                menuButtonDOM.style.opacity = '0';
            }
        }
    }, [menuButtonRef, tableCellNode, editor, anchorElem]);
    const prevTableCellDOM = useRef(tableCellNode);
    useEffect(() => {
        if (prevTableCellDOM.current !== tableCellNode) {
            setIsMenuOpen(false);
        }
        prevTableCellDOM.current = tableCellNode;
    }, [prevTableCellDOM, tableCellNode]);
    return (_jsx(Box, Object.assign({ sx: style.tableCellActionButtonContainer, ref: menuButtonRef, "data-testid": "container" }, { children: tableCellNode != null && (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ sx: style.tableCellActionButton, "data-testid": 'table-cell-action-button', onClick: (e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }, ref: menuRootRef }, { children: _jsx(ExpandMore, { fontSize: "small" }) })), isMenuOpen && (_jsx(TableActionMenu, { contextRef: menuRootRef, setIsMenuOpen: setIsMenuOpen, onClose: () => setIsMenuOpen(false), tableCellNode: tableCellNode }))] })) })));
}
/**
 *
 * @example <TableActionMenuPlugin/>
 * @returns enbles cell actions on table component
 */
export default function TableActionMenuPlugin({ anchorElem = document.body, }) {
    return createPortal(_jsx(TableCellActionMenuContainer, { anchorElem: anchorElem }), anchorElem);
}
//# sourceMappingURL=ccf-table-action-menu-plugin.js.map