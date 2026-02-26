export declare const MAX_ROW_SELECTION_ALLOWED = 5;
export declare enum CcfInteractionSearchMenuAction {
    viewDetails = 0,
    contactInfo = 1,
    assigntoMe = 2
}
/**
 * Props for the CcfDigitalSearchGrid component.
 */
interface CcfDigitalSearchGridProps {
    /**
     * Specifies whether checkboxes for row selection are selectable.
     */
    isCheckboxSelectable?: boolean;
    /**
   * Specifies whether the cursor should be enabled for entire row.
   */
    enableRowCursor?: boolean;
    /**
     *  Stores whether app open in appSpace or in fullView
     */
    isAppSpace?: boolean;
}
/**
 * Component to show the Data Grid for the interaction search data
 * @example
 * ```
 * <CcfInteractionSearchGrid />
 * ```
 */
export declare const CcfDigitalSearchGrid: ({ isCheckboxSelectable, enableRowCursor, isAppSpace }: CcfDigitalSearchGridProps) => JSX.Element;
export {};
