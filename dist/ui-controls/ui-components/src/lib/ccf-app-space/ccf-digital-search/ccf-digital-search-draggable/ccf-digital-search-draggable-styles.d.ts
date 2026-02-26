import { Theme } from '@mui/material';
import { Transform } from '@dnd-kit/utilities';
/**
 * Generates the inline styles for a draggable item based on its drag state.
 *
 * @param transform - The current transform object from dnd-kit
 * @param isDragging - Whether the item is currently being dragged
 * @param transition - The CSS transition string passed from dnd-kit
 * @param menuItemStyle - Additional custom style overrides for the menu item
 * @returns A merged style object containing default draggable styles and custom overrides
 *
 * @example
 * ```
 * const style = getDraggableItemStyle(transform, true, 'transform 200ms ease', { backgroundColor: 'red' });
 * ```
 */
export declare const getDraggableItemStyle: (transform: Transform | null, isDragging: boolean, transition?: string, menuItemStyle?: Record<string, unknown>) => Record<string, unknown>;
/**
 * Generates styles for the CcfDigitalSearchDraggable component.
 *
 * @param theme - The MUI theme object
 * @returns An object containing all styles for the draggable search component
 *
 * @example
 * ```
 * const styles = CcfDigitalSearchDraggableStyles(theme);
 * <Box sx={styles.containerBox}>...</Box>
 * ```
 */
declare const CcfDigitalSearchDraggableStyles: (theme: Theme) => {
    containerBox: {
        display: string;
        flexDirection: string;
        transition: string;
    };
    droppableBox: (isOver: boolean) => {
        backgroundColor: string;
        transition: string;
        padding: string;
    };
    emptyDropArea: {
        color: string;
        display: string;
        flexDirection: string;
        alignContent: string;
        alignItems: string;
        justifyContent: string;
        flexWrap: string;
        padding: string;
        fontSize: string;
    };
    divider: {
        borderWidth: string;
        borderColor: string;
    };
    overlayBox: {
        display: string;
        justifyContent: string;
        alignItems: string;
        backgroundColor: string;
        boxShadow: string;
        outline: string;
        li: {
            backgroundColor: string;
        };
        '&:focus-visible': {
            outline: string;
        };
    };
    overlayText: {
        fontSize: string;
        marginLeft: string;
    };
    overlayIconRow: {
        display: string;
        flexDirection: string;
        gap: string;
        opacity: number;
    };
    draggableItem: (transform: Transform | null, isDragging: boolean, transition?: string, menuItemStyle?: Record<string, unknown>) => Record<string, unknown>;
    menuItem: {
        display: string;
        justifyContent: string;
        alignItems: string;
        backgroundColor: string;
        cursor: string;
        padding: string;
        transition: string;
        '&:hover, &:focus': {
            backgroundColor: string;
        };
    };
    itemLabel: {
        fontSize: string;
        marginLeft: string;
    };
    hoverActionIcons: {
        display: string;
        flexDirection: string;
        gap: string;
        opacity: number;
        paddingLeft: string;
        transition: string;
        '.hover-parent:hover &, .hover-parent:focus-within &': {
            opacity: number;
        };
        '&:has(#pinnedIcon)': {
            opacity: number;
        };
    };
    draggableBtn: {
        cursor: string;
        color: string;
        padding: number;
        backgroundColor: string;
        margin: number;
        border: string;
        boxShadow: string;
        minWidth: string;
        '&:focus,&:focus-visible': {
            border: string;
            boxShadow: string;
        };
        '&:hover': {
            border: string;
            boxShadow: string;
        };
        '&:disabled': {
            border: string;
            boxShadow: string;
            color: string;
        };
        '& svg': {
            fontSize: string;
            fontWeight: string;
            width: string;
        };
    };
    iconFocus: {
        '&:focus,&:focus-visible': {
            border: string;
            boxShadow: string;
        };
    };
    pinIcon: {
        height: string;
        width: string;
        color: string | undefined;
        '& svg': {
            fontSize: string;
        };
    };
    activePinnedItem: {
        backgroundColor: string;
    };
    plainButton: {
        boxShadow: string;
        border: string;
        padding: number;
        margin: number;
        minWidth: string;
        cursor: string;
        backgroundColor: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    menuName: {
        fontSize: string;
        marginLeft: string;
        marginRight: string;
        overflow: string;
        textOverflow: string;
    };
    launchIcon: {
        marginLeft: string;
        color: string;
        fontFamily: string;
    };
    moveUpWrapper: (isDisabled: boolean) => {
        cursor: string;
    };
    moveUpIcon: (isDisabled: boolean) => {
        display: string;
        alignContent: string;
        flexWrap: string;
        height: string;
        padding: string;
        border: string;
        borderRadius: string;
        color: string;
        outline: string;
        '&:focus, &:focus-visible': {
            outline: string;
            outlineOffset: string;
        };
    };
    moveDownWrapper: (isDisabled: boolean) => {
        cursor: string;
    };
    moveDownIcon: (isDisabled: boolean) => {
        display: string;
        alignContent: string;
        flexWrap: string;
        height: string;
        padding: string;
        border: string;
        borderRadius: string;
        color: string;
        outline: string;
        '&:focus, &:focus-visible': {
            outline: string;
            outlineOffset: string;
        };
    };
};
export default CcfDigitalSearchDraggableStyles;
