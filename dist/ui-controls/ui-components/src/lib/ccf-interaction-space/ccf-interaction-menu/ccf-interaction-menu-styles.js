/* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
const CcfInteractionMenuStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        moreItemsBtn: {
            '&:focus': {
                border: `1px solid ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        menuItemContent: {
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
                color: '#4a4a4a',
                width: 'auto',
                overflow: 'hidden',
                fontSize: '.75rem',
                boxSizing: 'border-box',
                minHeight: '20px',
                fontWeight: 'normal',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
            },
            [theme.breakpoints.up('xl')]: {
                color: '#4a4a4a',
                width: 'auto',
                overflow: 'hidden',
                fontSize: '.9rem',
                boxSizing: 'border-box',
                minHeight: '30px',
                fontWeight: 'normal',
                lineHeight: '1.5',
                whiteSpace: 'nowrap',
            },
        },
        menuItemIcon: {
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
                marginRight: '10px',
            },
            [theme.breakpoints.up('xl')]: {
                marginRight: '10px',
            },
        },
        menuItemMinHeight: {
            [theme.breakpoints.down('xl')]: {
                minHeight: '32px',
            },
            [theme.breakpoints.up('xl')]: {
                minHeight: '48px',
            },
            '&:focus': {
                backgroundColor: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.menuItemHighlight,
                border: `1px solid ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        menuItemNameBold: {
            [theme.breakpoints.down('xl')]: {
                fontSize: '.75rem',
                fontWeight: '600',
                paddingLeft: '1px',
                marginTop: '0px',
                display: 'inline',
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: '.8rem',
                fontWeight: '600',
                paddingLeft: '0px',
                marginTop: '0px',
                display: 'inline',
            },
        },
        menuItemTextNormal: {
            display: 'inline',
        },
        menuItemMinTransfer: {
            paddingLeft: '0',
            [theme.breakpoints.down('xl')]: {
                minHeight: '32px',
            },
            [theme.breakpoints.up('xl')]: {
                minHeight: '48px',
            },
        },
        menuItemIconTransfer: {
            [theme.breakpoints.down('xl')]: {
                paddingLeft: '6px',
            },
            [theme.breakpoints.up('xl')]: {
                paddingLeft: '6px',
            },
        },
        dividerMenuOption: {
            margin: '0',
            borderBottomWidth: '2px',
            width: '100%',
        },
        deleteMenuOptions: {
            marginTop: '0.4rem',
        },
        replyIcon: {
            position: 'relative',
            top: '0.4rem',
            left: '0.3rem',
        },
        likeOption: {
            marginTop: '0.031rem',
            paddingLeft: '0.125rem',
        },
    };
    return styles;
};
export default CcfInteractionMenuStyles;
//# sourceMappingURL=ccf-interaction-menu-styles.js.map