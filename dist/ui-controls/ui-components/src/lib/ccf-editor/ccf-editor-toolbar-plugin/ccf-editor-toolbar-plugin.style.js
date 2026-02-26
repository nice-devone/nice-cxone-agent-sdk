/**
 * enum for rich text buttons
*/
export var RICH_TOOLBAR_BUTTONS;
(function (RICH_TOOLBAR_BUTTONS) {
    RICH_TOOLBAR_BUTTONS["BOLD"] = "bold";
    RICH_TOOLBAR_BUTTONS["ITALIC"] = "italic";
    RICH_TOOLBAR_BUTTONS["UNDERLINE"] = "underline";
    RICH_TOOLBAR_BUTTONS["NUMBER_LIST"] = "number";
    RICH_TOOLBAR_BUTTONS["BULLET_LIST"] = "bullet";
    RICH_TOOLBAR_BUTTONS["LEFT_ALIGN"] = "left";
    RICH_TOOLBAR_BUTTONS["RIGHT_ALIGN"] = "right";
    RICH_TOOLBAR_BUTTONS["CENTER_ALIGN"] = "center";
    RICH_TOOLBAR_BUTTONS["RTL"] = "rtl";
    RICH_TOOLBAR_BUTTONS["LTR"] = "ltr";
})(RICH_TOOLBAR_BUTTONS || (RICH_TOOLBAR_BUTTONS = {}));
;
/**
 * Styling for ccf-editor-toolbar-plugin
 * @returns ccf-editor-toolbar-plugin CSS properties as a JSON object
 * @example CcfEditorToolbarPluginStyles(theme)
*/
const CcfEditorToolbarPluginStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const styles = {
        button: {
            color: `${theme.palette.grey[800]}`,
            minWidth: '2.125rem',
            border: '0.063rem solid transparent',
            '&:hover': {
                backgroundColor: `${theme.palette.action.hover}`,
            },
            '&:focus': {
                borderColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight,
            },
            marginTop: '0.313rem',
        },
        revampedButton: {
            color: `${(_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.grey[800]}`,
            minWidth: '0.781rem',
            height: '1.5rem',
            border: '0.063rem solid transparent',
            '&:hover': {
                backgroundColor: `${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.action) === null || _e === void 0 ? void 0 : _e.hover}`,
            },
            '&:focus': {
                borderColor: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.menuItemHighlight,
            },
            padding: '0',
        },
        toolbar: {
            display: 'block',
            width: '100%',
            borderBottom: 'none',
        },
        buttonActive: {
            background: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.main,
            marginRight: '0.2rem',
        },
        linkBox: {
            width: '20vw',
            backgroundColor: '#f4f4f4',
            marginTop: '2px',
        },
        btnCheck: {
            verticalAlign: 'middle',
        },
        btnContainer: {
            'min-width': '2.188rem',
            padding: 0,
        },
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.paper',
            border: `0.063rem solid ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.border) === null || _l === void 0 ? void 0 : _l.dark}`,
            borderRadius: '0.313rem',
            boxShadow: '24',
            padding: '1.5rem',
            fontSize: '0.813rem',
            [theme.breakpoints.down(500)]: {
                width: '21.25rem',
                fontSize: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _m === void 0 ? void 0 : _m.h6) === null || _o === void 0 ? void 0 : _o.fontSize,
            },
        },
        modalContentContainer: {
            display: 'flex',
            width: '100%',
        },
        modalContent: {
            '> :not(:first-of-type)': {
                marginTop: '0.7rem',
            },
            width: '100%',
            overflow: 'auto',
            wordBreak: 'break-word',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.border) === null || _q === void 0 ? void 0 : _q.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: 600,
            [theme.breakpoints.down(500)]: {
                fontSize: '1rem',
            },
            marginBottom: '1rem',
        },
        inputdiv: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        closeButtonColumn: {
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'baseline',
            '> button': {
                padding: 0,
            },
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1.5rem',
            '> :not(:first-of-type)': {
                marginLeft: '0.5rem',
            },
            button: {
                width: '4.375rem',
                height: '1.875rem',
                fontSize: 'inherit',
            },
        },
        inputBtn: {
            '& input[type=number]': {
                '-moz-appearance': 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
        },
        toolbarBtn: {
            height: '1.375rem',
            width: '1.188rem',
            paddingBottom: '0.1875rem',
        },
        richTextToolbarPopover: {
            display: 'flex',
            flexDirection: 'row',
            verticalAlign: 'middle',
            gap: '0.375rem',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        revampButtonContainer: {
            color: `${(_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.grey[800]}`,
            width: '2.125rem',
            height: '2.125rem',
            minWidth: '2.125rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0.125rem solid transparent',
            '&:focus': {
                borderColor: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.menuItemHighlight,
                borderRadius: '0.25rem',
            },
        },
        toolbarPopper: {
            minwidth: '16.5rem',
            maxWidth: '36rem',
        },
    };
    return styles;
};
export default CcfEditorToolbarPluginStyles;
//# sourceMappingURL=ccf-editor-toolbar-plugin.style.js.map