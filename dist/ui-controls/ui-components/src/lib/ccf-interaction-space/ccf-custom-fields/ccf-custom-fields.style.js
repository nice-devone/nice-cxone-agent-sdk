/**
 * CcfCaseCustomField - used to display quick replies component
 * @param props -?-CaseCustomFields
 * @example <CaseCustomFields />
 */
const CaseCustomFields = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        root: {
            '& .MuiTextField-root': {
                width: '-webkit-fill-available',
            },
        },
        modifyCustomFieldIcons: {
            height: '18px',
            width: '18px',
            color: theme.palette.text.secondary,
        },
        iconPadding: {
            padding: 0,
            marginLeft: '3px',
            marginBottom: '4px',
            float: 'right',
        },
        inputLabel: {
            color: theme.palette.text.black,
            fontSize: '0.75rem',
            fontWeight: '400',
        },
        inputFields: {
            height: '22px',
            fontSize: '12px',
            color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.header,
        },
        dropdownFields: {
            height: '22px',
            fontSize: '0.75rem',
            color: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.header,
        },
        paddingAll: {
            padding: '4px 8px',
        },
        toastColor: {
            backgroundColor: theme.palette.success.main,
        },
        errorMessage: {
            textAlign: 'center',
            color: 'red',
            padding: '1px 0px 1px 1px',
            fontWeight: '700',
        },
        dropdownItems: {
            fontSize: '12px',
            paddingTop: '2px',
            paddingBottom: '2px',
        },
        savedInputFields: {
            '& .MuiOutlinedInput-root': {
                padding: 0,
                border: `1px solid ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.customField}`,
            },
            '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
                color: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.contrastText,
            },
        },
        readOnlyTextField: {
            display: 'block',
            padding: '2px 14px',
            border: '1px solid rgba(0, 0, 0, 0.26)',
            borderRadius: '4px',
            width: '100%',
            textDecoration: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            a: {
                textDecoration: 'none',
                color: (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            },
        },
        urlFieldTooltip: {
            maxWidth: '200px',
            fontSize: '0.6875rem',
            lineHeight: '1.2',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        gridLabelItem: {
            display: 'inline-flex',
        },
    };
    return styles;
};
export default CaseCustomFields;
//# sourceMappingURL=ccf-custom-fields.style.js.map