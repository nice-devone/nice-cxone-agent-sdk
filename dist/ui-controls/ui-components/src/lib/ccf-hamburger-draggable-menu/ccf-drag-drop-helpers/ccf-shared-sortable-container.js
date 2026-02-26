import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Box } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useTheme } from '@mui/material/styles';
import { useTranslator } from '@nice-devone/ui-controls';
import CcfDigitalSearchDraggableStyles from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-draggable/ccf-digital-search-draggable-styles';
/**
 * Reusable, extensible wrapper component for building droppable + sortable containers
 *
 * - Droppable area setup
 * - SortableContext registration
 * - Rendering flow
 * - Theming and layout
 *
 * @param props - Component props.
 * @param id - Unique droppable container ID.
 * @param items - List of items rendered inside the container.
 * @param label - Label used for DOM identification.
 * @param getItemKey - Function to extract a unique key for each item.
 * @param renderItem - Function that renders each sortable item.
 * @param emptyText - Text shown when container has no items.
 * @param hideIfEmpty - When true, hides the entire container if empty.
 * @param crossContainerItemLimit -  Other container  length for cross container move.
 *
 * @example
 * ```
 * <SharedSortableContainer
 *   id="droppable-1"
 *   label="Navigation"
 *   items={navigationItems}
 *   hideIfEmpty={true}
 *   getItemKey={(item) => item.menuName}
 *   renderItem={(item, index, containerId) => (
 *     <SortableItem
 *       key={item.menuName}
 *       item={item}
 *       idx={index}
 *       containerId={containerId}
 *     />
 *   )}
 * />
 * ```
 */
export function SharedSortableContainer({ id, items, label, getItemKey, renderItem, emptyText, computedLastIndex, hideIfEmpty = false, crossContainerItemLimit, }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfDigitalSearchDraggableStyles(theme);
    if (hideIfEmpty && items.length === 0)
        return null;
    return (_jsx(SortableContext, Object.assign({ id: id, items: items.map((item, index) => getItemKey(item, index)), strategy: verticalListSortingStrategy }, { children: _jsx(Box, Object.assign({ sx: styles.containerBox, id: label }, { children: _jsx(Box, Object.assign({ ref: setNodeRef, sx: styles.droppableBox(isOver) }, { children: items.length === 0 ? (_jsx(Box, Object.assign({ sx: styles.emptyDropArea }, { children: emptyText !== null && emptyText !== void 0 ? emptyText : translate('dndEmptyDrop') }))) : (items.map((item, index) => renderItem(item, index, id, items, crossContainerItemLimit, computedLastIndex))) })) })) })));
}
const CcfSharedSortableContainer = memo(SharedSortableContainer);
export default CcfSharedSortableContainer;
//# sourceMappingURL=ccf-shared-sortable-container.js.map