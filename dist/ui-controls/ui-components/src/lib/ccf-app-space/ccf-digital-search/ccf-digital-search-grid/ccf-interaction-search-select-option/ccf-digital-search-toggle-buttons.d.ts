/**
 * Interface for Digital Search Toggle Buttons
 */
interface CcfDigitalSearchToggleButtonsProps {
    /**
     * Stores whether app open in appSpace or in fullView
     */
    isAppSpace?: boolean;
}
export declare enum BULK_MODIFICATION_TABS {
    ASSIGN_TO_ME = "assignToMe",
    ASSIGN_TO_OTHERS = "assignToOthers",
    EDIT_STATUS = "changeStatus",
    REPLY = "reply"
}
/**
 * Component to show the Select Options assignment menu for the interaction search on row selection
 * @example
 * ```
 * <CcfDigitalSearchToggleButtons />
 * ```
 */
export declare const CcfDigitalSearchToggleButtons: (props: CcfDigitalSearchToggleButtonsProps) => JSX.Element;
export {};
