/**
 * Styling for CcfMessagesTag
 * @returns Scheduler CSS properties as a JSON object
 * @example CcfMessagesTagStyles
 */
const CcfMessagesTagStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        tagWrapper: {
            display: 'inline-flex',
            flexWrap: 'wrap',
        },
        popover: {
            '.MuiPaper-root': {
                width: '13.75rem',
                maxHeight: '18.75rem',
                padding: '0.313rem 0.625rem',
                position: 'relative',
                overflowY: 'scroll',
            },
        },
        chipStyle: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText,
            width: 'auto',
            maxWidth: '9.375rem',
            margin: '.125rem',
            fontSize: '.75rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '.625rem',
            },
            border: '.0625rem solid' + ((_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.header),
            '&.MuiButtonBase-root': {
                marginRight: '.3125rem',
                marginBottom: '.3125rem',
            },
            '&.Mui-focusVisible': {
                border: '.125rem solid' + ((_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.header),
            },
        },
        viewLess: {
            marginLeft: '.3125rem',
        },
        flexVerticalCenter: {
            display: 'flex',
            alignItems: 'center',
        },
    };
    return styles;
};
export default CcfMessagesTagStyles;
//# sourceMappingURL=ccf-messages-tags-style.js.map