import { DropResult } from 'react-beautiful-dnd';
import { ColumnDefinitions } from '../ccf-digital-search.slice';
/**
 * Moves the search option to the last visible element in the column list.
 *
 * @param columnList - The list of column definitions.
 * @returns The reordered list of column definitions.
 * @example moveSearchOptionToLastElement(columns)
 */
export declare const moveSearchOptionToLastElement: (columnList: ColumnDefinitions[]) => ColumnDefinitions[];
/**
  * Method to process the drag and drop in the list
  * @param result - DropResult interface
  * @param defaultColumns - column list
  * @example processDragEnd(result,defaultColumns)
  */
export declare const processDragEnd: (result: DropResult, defaultColumns: ColumnDefinitions[], minimumColumns: number) => ColumnDefinitions[];
/**
 * CcfInteractionsColumnsPopover - to display list of interaction search columns
 * @example - `<CcfInteractionsColumnsPopover />`
 */
export declare const CcfInteractionsColumnsPopover: () => JSX.Element;
