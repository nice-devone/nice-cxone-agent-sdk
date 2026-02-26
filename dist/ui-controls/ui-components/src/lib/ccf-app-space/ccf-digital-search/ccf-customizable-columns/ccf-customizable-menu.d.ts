import { ColumnDefinitions } from '../ccf-digital-search.slice';
export declare enum ColumnType {
    SELECTED_COLUMNS = "selected-columns",
    NOT_SELECTED_COLUMNS = "not-selected-columns"
}
/**
  * function to reorder the columns list
  * @param list - array of columns
  * @param startIndex - index of column dragged
  * @param endIndex - index of column where dragged column is dropped
  * @example reorderColumns([],0,5)
  */
export declare const reorderColumns: (list: ColumnDefinitions[], startIndex: number, endIndex: number) => ColumnDefinitions[];
/**
 * CcfCustomizableMenu - to display list of interaction search columns
 * @example - `<CcfCustomizableMenu />`
 */
export declare const CcfCustomizableMenu: () => JSX.Element;
