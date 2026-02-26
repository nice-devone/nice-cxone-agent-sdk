/**
 * A React component that provides a customizable, draggable column management interface.
 *
 * This component uses `dnd-kit` for drag-and-drop functionality, allowing users
 * to reorder columns or move them between "selected" and "not selected" lists.
 * It integrates with Redux to manage the column state and uses `@mui/material` for the UI.
 *
 * @remarks
 * The core functionality relies on two event handlers: `handleDragStart` and
 * `handleDragEnd`. These functions manage the dragged item and update the
 * Redux store to reflect changes in column order or visibility.
 * @example
 * <CcfDigitalSearchDraggable />
 */
export declare const CcfDigitalSearchDraggable: () => JSX.Element;
