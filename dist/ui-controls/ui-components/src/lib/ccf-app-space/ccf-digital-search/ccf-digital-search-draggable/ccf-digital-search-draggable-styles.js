import { CSS } from '@dnd-kit/utilities';
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
export const getDraggableItemStyle = (transform, isDragging, transition, menuItemStyle = {}) => (Object.assign(Object.assign({}, menuItemStyle), { transform: CSS.Transform.toString(transform), transition: isDragging ? 'none' : transition || 'transform 0.2s ease, opacity 0.2s ease', opacity: isDragging ? 0.3 : 1, cursor: 'grab', outline: 'none' }));
/**
 * Creates reusable style functions for move-up and move-down controls.
 *
 * @param theme - The MUI theme object
 * @returns An object containing wrapper and icon style functions
 *
 * @example
 * ```
 * const { wrapper, icon } = createMoveControlStyles(theme);
 * ```
 */
const createMoveControlStyles = (theme) => ({
    wrapper: (isDisabled) => ({
        cursor: isDisabled ? 'not-allowed' : 'pointer',
    }),
    icon: (isDisabled) => {
        var _a, _b, _c, _d, _e, _f;
        return ({
            display: 'flex',
            alignContent: 'center',
            flexWrap: 'wrap',
            height: '1.25rem',
            padding: '0.063rem',
            border: `.0938rem solid ${isDisabled ? (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.grey[400] : (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.lightGrey}`,
            borderRadius: '.1875rem',
            color: isDisabled ? (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.grey[400] : 'inherit',
            outline: 'none',
            '&:focus, &:focus-visible': {
                outline: isDisabled ? 'none' : `.0938rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                outlineOffset: '.0625rem',
            },
        });
    },
});
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
const CcfDigitalSearchDraggableStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    const moveControl = createMoveControlStyles(theme);
    return {
        containerBox: {
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
        },
        droppableBox: (isOver) => {
            var _a, _b;
            return ({
                backgroundColor: isOver ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white : 'transparent',
                transition: 'background-color 0.2s ease',
                padding: '0.3rem 0',
            });
        },
        emptyDropArea: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.primary,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '.3125rem',
            fontSize: '.75rem',
        },
        divider: {
            borderWidth: '.0625rem',
            borderColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.charcoleGrey,
        },
        overlayBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.menuItemHighlight,
            boxShadow: theme === null || theme === void 0 ? void 0 : theme.shadows[2],
            outline: 'none',
            li: {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.menuItemHighlight,
            },
            '&:focus-visible': {
                outline: 'none',
            },
        },
        overlayText: {
            fontSize: '.75rem',
            marginLeft: theme === null || theme === void 0 ? void 0 : theme.spacing(0.5),
        },
        overlayIconRow: {
            display: 'flex',
            flexDirection: 'row',
            gap: theme === null || theme === void 0 ? void 0 : theme.spacing(0.5),
            opacity: 0,
        },
        draggableItem: (transform, isDragging, transition, menuItemStyle = {}) => getDraggableItemStyle(transform, isDragging, transition, menuItemStyle),
        menuItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper,
            cursor: 'grab',
            padding: '.2rem .75rem',
            transition: 'all 0.2s ease',
            '&:hover, &:focus': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.menuItemHighlight,
            },
        },
        itemLabel: {
            fontSize: '.75rem',
            marginLeft: theme === null || theme === void 0 ? void 0 : theme.spacing(0.5),
        },
        hoverActionIcons: {
            display: 'flex',
            flexDirection: 'row',
            gap: theme === null || theme === void 0 ? void 0 : theme.spacing(0.5),
            opacity: 0,
            paddingLeft: '.3125rem',
            transition: 'opacity 0.2s ease',
            '.hover-parent:hover &, .hover-parent:focus-within &': {
                opacity: 1,
            },
            // If a pinned icon exists inside → container stays visible always
            '&:has(#pinnedIcon)': {
                opacity: 1,
            },
        },
        draggableBtn: {
            cursor: 'pointer',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.black,
            padding: 0,
            backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.transparent,
            margin: 0,
            border: `0.094rem solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.transparent}`,
            boxShadow: 'none',
            minWidth: 'auto',
            '&:focus,&:focus-visible': {
                border: `0.094rem solid ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.black}`,
                boxShadow: 'none',
            },
            '&:hover': {
                border: `0.094rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.transparent}`,
                boxShadow: 'none',
            },
            '&:disabled': {
                border: 'inherit',
                boxShadow: 'none',
                color: 'inherit',
            },
            '& svg': {
                fontSize: '1.25rem',
                fontWeight: 'bolder',
                width: 'auto',
            },
        },
        iconFocus: {
            '&:focus,&:focus-visible': {
                border: `.0938rem solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.menuItemHighlight}`,
                boxShadow: 'none',
            },
        },
        pinIcon: {
            height: '1.3125rem',
            width: '1.3125rem',
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.dark,
            '& svg': {
                fontSize: '1.125rem',
            },
        },
        activePinnedItem: {
            backgroundColor: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.menuItemHighlight,
        },
        plainButton: {
            boxShadow: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            minWidth: 'auto',
            cursor: 'default',
            backgroundColor: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.background) === null || _5 === void 0 ? void 0 : _5.transparent,
            '&:hover': {
                backgroundColor: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.transparent,
            },
        },
        menuName: {
            fontSize: '0.75rem',
            marginLeft: '0.625rem',
            marginRight: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        launchIcon: {
            marginLeft: '0',
            color: theme.palette.text.primary,
            fontFamily: 'inherit',
        },
        moveUpWrapper: moveControl.wrapper,
        moveUpIcon: moveControl.icon,
        moveDownWrapper: moveControl.wrapper,
        moveDownIcon: moveControl.icon,
    };
};
export default CcfDigitalSearchDraggableStyles;
//# sourceMappingURL=ccf-digital-search-draggable-styles.js.map