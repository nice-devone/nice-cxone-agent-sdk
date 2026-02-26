import React from 'react';
import { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { ColumnDefinitions, SEARCH_TABS_LABEL } from '../ccf-digital-search.slice';
import { ColumnGroup } from './ccf-digital-search-sortable';
import { CcfTranslationKey } from '@nice-devone/i18n';
interface ColumnState {
    selected: ColumnDefinitions[];
    nonSelected: ColumnDefinitions[];
}
/**
 * Drag context metadata for rules.
 */
interface DragRules {
    minimum: number;
    activeTab: SEARCH_TABS_LABEL;
}
/**
 * Specifies the type of user interaction when dragging an element.
 */
export declare enum DragActionType {
    /**
     * Represents a standard drag operation.
     */
    Drag = "Drag",
    /**
     * Represents a simple click action (sometimes used to initiate a drag).
     */
    Click = "Click"
}
/**
 * Provides accessibility announcements and translation utilities
 * for drag-and-drop interactions.
 *
 * This interface helps ensure that assistive technologies (like screen readers)
 * receive meaningful messages during drag events, and that messages
 * can be localized using translation keys.
 */
export interface AriaAnnouncement {
    announce: (value: string | undefined) => void;
    translate: (input: CcfTranslationKey, extraArgs?: {
        format: (string | number)[];
    }) => string;
}
/**
 * Retrieves the position of a column by its field ID from the selected or non-selected lists.
 *
 * @param id - The unique field identifier of the column.
 * @param selected - Array of selected column definitions.
 * @param nonSelected - Array of non-selected column definitions.
 *
 * @returns
 * An object describing the position if the column is found:
 * - `position`: The 1-based position of the item within its container.
 * - `total`: The total number of items in that container.
 * - `container`: Either `"selected"` or `"non-selected"`.
 * Returns `null` if the item cannot be found in either container.
 *
 * @example
 * ```
 * const positionInformation = getPosition('name', selectedCols, nonSelectedCols);
 * { position: 2, total: 5, container: 'selected' }
 * ```
 */
export declare function getPosition(id: string, selected: ColumnDefinitions[], nonSelected: ColumnDefinitions[]): {
    headerName: string;
    position: number;
    total: number;
    container: ColumnGroup.Selected | ColumnGroup.NonSelected;
} | null;
/**
 * Applies column selection rules based on drag-and-drop interactions.
 *
 * @param state - Current column state with selected and non-selected columns.
 * @param rules - Drag rules including minimum, active tab, and toggle flags.
 * @returns Updated column state after applying rules.
 * @example
 * ```ts
 * const newState = applyColumnRules(currentState, dragRules);
 * ```
 */
export declare function applyColumnRules(state: ColumnState, rules: DragRules, actionType: DragActionType.Click | DragActionType.Drag): ColumnState;
/**
 * A custom hook to manage drag-and-drop state and logic for reordering and moving columns between two lists.
 * This hook leverages the `dnd-kit` library for its drag-and-drop functionality.
 *
 * @param ColumnState -  initialState The initial state of the columns, containing `selected` and `nonSelected` arrays.
 * @param  DragRules - rules An object defining the rules and constraints for drag-and-drop, such as minimum columns and active tab context.
 * @returns
 * ```
 * {{selected: ColumnDefinitions[], nonSelected: ColumnDefinitions[], activeItem: ColumnDefinitions | null, sensors: any, handleDragStart: function, handleDragOver: function, handleDragEnd: function, setSelected: function, setNonSelected: function}}
 * ```
 * An object containing the current column state, drag-and-drop sensors, and event handlers.
 * @example
 * ```
 * const initialState = {
 * selected: [{ field: 'name', headerName: 'Name' }],
 * nonSelected: [{ field: 'age', headerName: 'Age' }]
 * };
 * const rules = {
 * minimumColumns: 1,
 * activeTab: 'SearchTab',
 * isInteractionToggled: false
 * };
 *
 * const {
 * selected,
 * nonSelected,
 * activeItem,
 * sensors,
 * handleDragStart,
 * handleDragOver,
 * handleDragEnd,
 * } = useDragAndDrop(initialState, rules);
 * ```
 */
export declare function useDragAndDrop(initialState: ColumnState, rules: DragRules, ariaAnnouncement: AriaAnnouncement): {
    selected: ColumnDefinitions[];
    nonSelected: ColumnDefinitions[];
    activeItem: ColumnDefinitions | null;
    handleDragStart: ({ active }: DragStartEvent) => void;
    handleDragOver: ({ active, over }: DragOverEvent) => void;
    handleDragEnd: ({ active, over }: DragEndEvent) => void;
    setSelected: React.Dispatch<React.SetStateAction<ColumnDefinitions[]>>;
    setNonSelected: React.Dispatch<React.SetStateAction<ColumnDefinitions[]>>;
};
/**
 * A wrapper component for handling drag-and-drop between selected and non-selected columns.
 *
 * @param props - Component props
 * @param Columns - Initial column definitions
 * @returns JSX.Element
 * @example
 * ```
 * const columns = [
 *   { field: 'name', headerName: 'Name', hide: false },
 *   { field: 'age', headerName: 'Age', hide: true },
 * ];
 * <CcfDraggableContainer Columns={columns} />
 * ```
 */
export default function CcfDigitalSearchDraggableContainer({ Columns }: {
    Columns: ColumnDefinitions[];
}): JSX.Element;
export {};
