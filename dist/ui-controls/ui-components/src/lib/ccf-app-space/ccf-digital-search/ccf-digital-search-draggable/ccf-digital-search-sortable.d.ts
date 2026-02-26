import React from 'react';
import { EventKeys } from '@nice-devone/common-sdk';
import { ColumnDefinitions, SEARCH_TABS_LABEL } from '../ccf-digital-search.slice';
import { AriaAnnouncement } from './ccf-digital-search-draggable-container';
/**
 * Enum for differentiating column groups used in the DnD containers.
 */
export declare enum ColumnGroup {
    /**
     * Represents the group of selected columns.
     */
    Selected = "selected",
    /**
     * Represents the group of non-selected columns.
     */
    NonSelected = "nonSelected"
}
/**
 * Shared state object for columns and constraints.
 */
interface ColumnState {
    /**
     * Array of selected column definitions.
     */
    selected: ColumnDefinitions[];
    /**
     * Array of non-selected column definitions.
     */
    nonSelected: ColumnDefinitions[];
}
/**
 * Drag context metadata for rules.
 */
interface DragRules {
    /**
     * The minimum number of items allowed in the drag operation.
     */
    minimum: number;
    /**
     * The currently active tab label from the search tabs.
     */
    activeTab: SEARCH_TABS_LABEL;
}
/**
 * Custom hook for handling item movement within and between column containers.
 *
 * @param setSelected - Setter for selected columns state.
 * @param setNonSelected - Setter for non-selected columns state.
 * @param selected - Current selected columns.
 * @param nonSelected - Current non-selected columns.
 * @param rules - Drag rules for column updates.
 * @returns Object with functions to move items within or between containers.
 *
 * @example
 * ```
 * const { moveItem, moveItemToOtherContainer } = useItemMovement(
 *   setSelected,
 *   setNonSelected,
 *   currentColumnState,
 *   rules,
 *   announce
 * );
 *
 * // Move item up in selected container
 * moveItem('itemId', EventKeys.ARROW_UP, ColumnGroup.Selected);
 *
 * // Move item to non-selected container
 * moveItemToOtherContainer('itemId', ColumnGroup.Selected);
 * ```
 */
export declare function useItemMovement(setSelected: React.Dispatch<React.SetStateAction<ColumnDefinitions[]>>, setNonSelected: React.Dispatch<React.SetStateAction<ColumnDefinitions[]>>, currentColumnState: ColumnState, rules: DragRules, ariaAnnouncement: AriaAnnouncement): {
    moveItem: (id: string, direction: EventKeys.ARROW_UP | EventKeys.ARROW_DOWN, container: ColumnGroup) => void;
    moveItemToOtherContainer: (id: string, from: ColumnGroup) => void;
};
/**
 * A sortable container for drag-and-drop column items.
 *
 * @param id - The container's column group ID.
 * @param items - Array of column definitions.
 * @param label - Container label.
 * @param moveItem - Function to move an item within the container.
 * @param moveItemToOtherContainer - Function to move an item to another container.
 * @returns A sortable container with droppable and sortable functionality.
 *
 * @example
 * ```
 * <SortableContainer
 *   id={ColumnGroup.Selected}
 *   items={selectedColumns}
 *   label="Selected Columns"
 *   moveItem={moveItem}
 *   moveItemToOtherContainer={moveItemToOtherContainer}
 * />
 * ```
 */
export declare function SortableContainer({ id, items: columns, label, moveItem, moveItemToOtherContainer, }: {
    id: ColumnGroup;
    items: ColumnDefinitions[];
    label: string;
    moveItem: (id: string, dir: EventKeys.ARROW_UP | EventKeys.ARROW_DOWN, container: ColumnGroup) => void;
    moveItemToOtherContainer: (id: string, from: ColumnGroup) => void;
}): JSX.Element;
/**
 * A memoized sortable item for drag-and-drop functionality within a column container.
 *
 * @param item - The column definition for the item.
 * @param containerId - The ID of the container (selected or non-selected).
 * @param moveItem - Function to move the item within the container.
 * @param moveItemToOtherContainer - Function to move the item to another container.
 * @param isFirst - Whether the item is the first in its container.
 * @param isLast - Whether the item is the last in its container.
 * @returns A draggable item with reorder controls.
 *
 * @example
 * ```
 * <SortableItem
 *   item={column}
 *   containerId={ColumnGroup.Selected}
 *   moveItem={moveItem}
 *   moveItemToOtherContainer={moveItemToOtherContainer}
 *   isFirst={index === 0}
 *   isLast={index === items.length - 1}
 * />
 * ```
 */
export declare const SortableItem: React.NamedExoticComponent<{
    item: ColumnDefinitions;
    containerId: ColumnGroup;
    moveItem: (id: string, dir: EventKeys.ARROW_UP | EventKeys.ARROW_DOWN, container: ColumnGroup) => void;
    moveItemToOtherContainer: (id: string, from: ColumnGroup) => void;
    isFirst: boolean;
    isLast: boolean;
}>;
export {};
