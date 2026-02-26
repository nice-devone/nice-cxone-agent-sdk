import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight, KeyboardArrowDown, KeyboardArrowUp, KeyboardBackspace } from '@mui/icons-material';
import treeElementStyles from './ccf-tree-element.styles';
import { Box, IconButton, InputAdornment, Popover, TextField, Typography, useTheme } from '@mui/material';
/**
 * Component to display dropdown in a heirarchical tree form
 * @returns tree element
 * @example
 * ```
 * <CcfTreeElement treeElement={props.treeElement}
 * ```
 */
export function CcfTreeElement({ customFields, enableInput, onTreeItemSelection, inputProps, }) {
    var _a;
    const theme = useTheme();
    const styles = treeElementStyles(theme);
    const [treeData, setTreeData] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [expandedItems, setExpandedItems] = useState([]);
    const [currentSelection, setCurrentSelection] = useState();
    const [lastExpandedItem, setLastExpansion] = useState('');
    const [parentExpansionMap, setParentExpandedItem] = useState({});
    useEffect(() => {
        const { childNodes, parentExpansion } = generateNodes(customFields.values, undefined, customFields.value);
        setTreeData(childNodes);
        setParentExpandedItem(parentExpansion);
    }, [customFields]);
    /**
     * Function to open pop over menu
     * @param event - any
     * @example openPopOverMenu(event)
     */
    const openPopOverMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     * Function to close popover
     * @example onClose()
     */
    const onClose = () => {
        setAnchorEl(null);
    };
    /**
     *Method to clear current Selection
     * @example clearSelection()
     */
    const clearSelection = () => {
        setExpandedItems([]);
        setParentExpandedItem(null);
    };
    /**
     * Component to handle toggle
     * @example
     * ```
     * generateNodes(customFieldData, 'parentid', 'selectedvalue')
     * ```
     */
    const generateNodes = (customFieldData, parentId, selectedValue) => {
        let nodes = [];
        let isLeafExpanded = false;
        let updatedParentExpansion = {};
        if (!parentId) {
            nodes = customFieldData.filter((ele) => !ele['parentId']);
        }
        else {
            nodes = customFieldData.filter((ele) => ele['parentId'] === parentId);
        }
        nodes = nodes.map((ele) => {
            var _a, _b;
            const { childNodes, isExpanded, parentExpansion } = generateNodes(customFieldData, ele['name'], selectedValue);
            const currentNode = {
                id: ele['name'],
                value: ele['value'],
                children: childNodes,
                isLeaf: !childNodes.length,
                parentId: (_a = ele['parentId']) !== null && _a !== void 0 ? _a : '',
            };
            if (selectedValue && selectedValue === ele['name']) {
                setCurrentSelection(currentNode);
                setLastExpansion((_b = currentNode === null || currentNode === void 0 ? void 0 : currentNode.parentId) !== null && _b !== void 0 ? _b : '');
                setExpandedItems((prevExpanded) => [...prevExpanded, currentNode.id]);
                isLeafExpanded = true;
            }
            if (isExpanded) {
                setExpandedItems((prevExpanded) => [...prevExpanded, currentNode.id]);
                updatedParentExpansion = Object.assign(Object.assign({}, parentExpansion), { [currentNode.parentId || 'root']: currentNode.id });
                isLeafExpanded = true;
            }
            return currentNode;
        });
        return { childNodes: nodes, isExpanded: isLeafExpanded, parentExpansion: updatedParentExpansion };
    };
    /**Method to collapse all children
     * @param node - current node
     * @example
     * ```
     * collapseChildren(node)
     * ```
     */
    const collapseChildren = (node, expandedItems, parentExpansionMap) => {
        var _a;
        let updatedExpandedItems = expandedItems, updatedParentExpansionMap = parentExpansionMap;
        (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
            if (!child.isLeaf) {
                updatedExpandedItems = updatedExpandedItems.filter((id) => (id !== child.id));
                updatedParentExpansionMap[child.parentId || 'root'] = '';
                ({ updatedExpandedItems, updatedParentExpansionMap } = collapseChildren(child, updatedExpandedItems, updatedParentExpansionMap));
            }
        });
        return { updatedExpandedItems, updatedParentExpansionMap };
    };
    /**
   * Component to handle toggle
   * @example
   * ```
   * handleToggle(node)
   * ```
   */
    const handleToggle = (node) => {
        if (node.isLeaf) {
            onInputSelection(node);
            onClose();
        }
        else {
            if (expandedItems.includes(node.id)) {
                if (lastExpandedItem === node.id) {
                    setExpandedItems(expandedItems.filter((id) => (id !== node.id)));
                    setParentExpandedItem(Object.assign(Object.assign({}, parentExpansionMap), { [node.parentId || 'root']: '' }));
                }
                else {
                    setLastExpansion(node.id);
                    const { updatedExpandedItems, updatedParentExpansionMap } = collapseChildren(node, expandedItems, parentExpansionMap);
                    setExpandedItems(updatedExpandedItems);
                    setParentExpandedItem(updatedParentExpansionMap);
                }
            }
            else {
                setLastExpansion(node.id);
                setExpandedItems([...expandedItems, node.id]);
                setParentExpandedItem(Object.assign(Object.assign({}, parentExpansionMap), { [node.parentId || 'root']: node.id }));
            }
        }
    };
    /**
     * Method to handle input selection
     * @param currentNode - Selected Node
     * @example
     * ```
     * onInputSelection(currentNode)
     * ```
     */
    const onInputSelection = (currentNode) => {
        setCurrentSelection(currentNode);
        onTreeItemSelection(customFields.ident, currentNode.id);
    };
    /**
   * Component to render the tree
   * @returns tree element
   * @example
   * ```
   * renderTree(nodes)
   * ```
   */
    const renderTree = (nodes, parent) => {
        return ((!parentExpansionMap || !parentExpansionMap[parent] || parentExpansionMap[parent] === nodes.id) &&
            _jsx(TreeItem, Object.assign({ className: `${nodes.isLeaf ? 'leafNode' : 'parentNode'} ${nodes.id === lastExpandedItem ? 'lastExpanded' : ''}`, itemId: nodes.id, label: nodes.value, onClick: () => handleToggle(nodes), onKeyDown: (e) => { if (e.key === 'Enter')
                    handleToggle(nodes); }, "data-testid": `tree-item-${nodes.id}`, tabIndex: 0 }, { children: Array.isArray(nodes.children) && nodes.children.length > 0
                    && nodes.children.map((node) => renderTree(node, nodes.id)) })));
    };
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { name: customFields.ident, variant: "outlined", size: "small", value: (_a = currentSelection === null || currentSelection === void 0 ? void 0 : currentSelection.value) !== null && _a !== void 0 ? _a : '', id: customFields.ident, "data-testid": customFields.ident, placeholder: 'Select', InputProps: {
                    readOnly: true,
                    style: styles.inputFields,
                    endAdornment: _jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsx(IconButton, Object.assign({ disabled: !customFields.isEditable || !enableInput, onClick: openPopOverMenu, "aria-label": "toggle popovermenu", size: 'small', sx: styles.dropdownIcon, "data-testid": "dropdown-icon" }, { children: !open ? _jsx(KeyboardArrowDown, {}) : _jsx(KeyboardArrowUp, {}) })) })),
                }, disabled: !customFields.isEditable || !enableInput, sx: styles.savedInputFields, inputProps: inputProps }), _jsx(Popover, Object.assign({ id: id, open: open, anchorEl: anchorEl, onClose: onClose, "data-testid": "simple-popover", sx: styles.ccfPopOver, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                } }, { children: _jsxs(Box, Object.assign({ id: "popOver" }, { children: [expandedItems.length > 0 &&
                            _jsxs(Box, Object.assign({ className: 'flexDisplay startoverButton', onClick: clearSelection }, { children: [_jsx(IconButton, Object.assign({ "aria-label": "Start over", size: 'small', sx: styles.backIcon }, { children: _jsx(KeyboardBackspace, {}) })), _jsx(Typography, Object.assign({ variant: 'h5' }, { children: "Start Over" }))] })), _jsx(SimpleTreeView, Object.assign({ sx: styles.treeContainer, expandedItems: expandedItems, selectedItems: currentSelection === null || currentSelection === void 0 ? void 0 : currentSelection.id, slots: {
                                collapseIcon: ExpandMore,
                                expandIcon: ChevronRight,
                            } }, { children: treeData && treeData.map((node) => renderTree(node, 'root')) }))] })) }))] }));
}
;
export default CcfTreeElement;
//# sourceMappingURL=ccf-tree-element.js.map