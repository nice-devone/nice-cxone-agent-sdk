/**
   * @example styles for pop over component
   */
export const ccfSortItemsStyles = (theme) => {
    return {
        inboundOutbound: {
            height: '1.5rem',
            width: '1.5rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
        },
        contentDiv: {
            display: 'flex',
            margin: '10px',
        },
        sortItemTxt: {
            width: '100%',
            height: '1.125rem',
            top: '1rem',
            fontStyle: 'normal',
            fontWeight: '700',
        },
        menuItemTxt: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: theme.typography.h5,
            color: theme.palette.text.contrastText,
        },
        confirmationBtn: {
            marginRight: '30px',
            width: '90px',
            fontSize: theme.typography.h5,
            padding: '8px',
        },
        applyBtn: {
            float: 'right',
            fontSize: theme.typography.h5,
            fontWeight: '600',
        },
        secondaryButton: {
            fontSize: theme.typography.h5,
            fontWeight: '600',
            marginRight: '8px',
        },
        boxBtn: {
            padding: '15px',
            width: '100%',
            display: 'flex',
            justifyItems: 'end',
            justifyContent: 'flex-end',
        },
        boxDropdown: {
            margin: '10px',
            fontSize: '13px',
            fontWeight: '400',
        },
        selectedTxt: {
            width: '100%',
            '.MuiInputBase-input': { fontSize: theme.typography.h5 },
        },
        popOverCollapsed: {
            '.MuiPaper-root': { left: '2px' },
        },
        popOver: {
            '.MuiPaper-root': { left: '60px' },
        },
    };
};
export default ccfSortItemsStyles;
//# sourceMappingURL=ccf-sort-items.styles.js.map