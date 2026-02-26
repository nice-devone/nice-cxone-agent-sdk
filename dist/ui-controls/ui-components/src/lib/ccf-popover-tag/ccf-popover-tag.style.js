/**
 * Styling for scheduler
 * @returns Scheduler CSS properties as a JSON object
 * @example popOverTagStyles
 */
const popOverTagStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        disablePopover: {
            pointerEvents: 'none',
            '.MuiPaper-root': {
                width: '229px !important',
                padding: '0px 14px 25px 9px',
            },
        },
        headerTag: {
            fontWeight: 'bold',
        },
        disableTagOperations: {
            pointerEvents: 'none',
        },
        addTagText: {
            margin: '5px',
        },
        digitalIcon: {
            marginTop: '5px',
        },
        tagNameFont: {
            fontSize: '12px',
        },
        chip: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.32)',
            borderRadius: '4px',
            marginTop: '15px',
            fontWeight: '600',
            paddingLeft: '6px',
        },
        addNewBtn: {
            boxShadow: `0 0.063rem 0.125rem ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black}`,
            borderRadius: '0.25rem',
            marginTop: '0.938rem',
            fontWeight: '600',
            paddingLeft: '0.375rem',
            '&:focus': {
                outline: `0.063rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                outlineOffset: '0',
                boxShadow: 'none',
            },
        },
        addNewBtnText: {
            fontSize: '12px',
            fontWeight: '600',
        },
        tagStack: {
            display: 'inherit',
        },
        popover: {
            '.MuiPaper-root': {
                width: '229px !important',
                padding: '0px 14px 25px 9px',
            },
        },
        chipStyle: {
            color: theme.palette.text.contrastText,
            width: 'fit-content',
            fontSize: '12px',
            border: '1px solid' + theme.palette.text.header,
            '&.MuiButtonBase-root': {
                marginRight: '5px',
                marginBottom: '5px',
            },
            '&.Mui-focusVisible': {
                border: '2px solid' + theme.palette.text.header,
            },
            '& .MuiChip-deleteIcon': {
                color: (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.header,
            },
        },
        autocomplete: {
            width: '191px',
            margin: '15px 0 0 0',
            '& label.MuiFormLabel-root': {
                fontSize: '13px',
                top: '-5px',
            },
            '& div.MuiInputBase-root': {
                paddingTop: '0px !important',
                paddingBottom: '0px !important',
            },
        },
        plusIcon: {
            height: '20px',
            width: '20px',
            paddingRight: '5px',
        },
        viewLess: {
            marginLeft: '5px',
        },
    };
    return styles;
};
export default popOverTagStyles;
//# sourceMappingURL=ccf-popover-tag.style.js.map