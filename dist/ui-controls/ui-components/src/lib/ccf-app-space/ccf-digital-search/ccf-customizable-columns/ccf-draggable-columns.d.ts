import { SEARCH_TABS_LABEL } from '../ccf-digital-search.slice';
/**
 * Interface for defining props of CcfCustomizableColumns component
 */
export interface CcfDraggableColumnsProps {
    /**
     * @remarks - droppable id from each droppable section
     */
    droppableId: string;
    activeTab?: SEARCH_TABS_LABEL;
}
/**
 * CcfCustomizableColumns - to display list of interaction search columns
 * @example - `<CcfCustomizableColumns />`
 */
export declare const CcfDraggableColumns: (props: CcfDraggableColumnsProps) => JSX.Element;
