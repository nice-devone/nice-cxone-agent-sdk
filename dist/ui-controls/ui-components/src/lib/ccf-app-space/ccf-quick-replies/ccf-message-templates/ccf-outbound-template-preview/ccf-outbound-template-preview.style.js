/**
 * CcfOutboundTemplatePreviewStyle - used to display outbound template preview styles
 * @param props -?-CcfOutboundTemplatePreviewStyle
 * @example <CcfOutboundTemplatePreviewStyle />
 */
const CcfOutboundTemplatePreviewStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        templateWrapper: {
            flexDirection: 'column',
            height: '100%',
            display: 'flex',
            paddingTop: '20px',
        },
        bodySection: {
            padding: '1rem',
            flexGrow: 1,
            /**
              * Card container height is adjusted by minus size of template preview section which is total of 120 pixels
             */
            maxHeight: 'calc(100% - 120px)',
            overflowY: 'auto',
        },
        messageTemplate: {
            display: 'inline-block',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
            textTransform: 'uppercase',
            color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.main,
            letterSpacing: 0,
        },
        templateHeading: {
            fontWeight: 800,
            background: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.default,
            minHeight: '2.5rem',
            lineHeight: '120%',
            padding: '1rem',
            fontSize: '14px',
        },
        payloadStyle: {
            fontSize: '12px',
            lineHeight: '15px',
        },
        templateVariable: {
            color: (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.primary,
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px',
            textTransform: 'uppercase',
        },
        navigateBackButton: {
            minWidth: '0px',
            color: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.main,
            padding: '0',
        },
        backSection: {
            display: 'flex',
            padding: '0px 15px 10px',
            width: '100%',
            cursor: 'pointer',
        },
        breadcrumbLabel: {
            letterSpacing: 0,
            color: theme.palette.text.dark,
            fontSize: '11px',
            fontWeight: '600',
        },
        backIcon: {
            fontSize: '14px',
        },
        templateBox: {
            marginTop: '1rem',
        },
        variableEditor: {
            marginTop: '0',
        },
        sendButton: {
            width: '100%',
            justifyContent: 'flex-end',
            'button': {
                margin: '10px',
                boxShadow: 'none',
                cursor: 'pointer',
                ':hover': {
                    boxShadow: 'none',
                },
            },
        },
        editableVarFieldContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            margin: '5px 0',
            maxWidth: '120px',
            'input': {
                padding: '2px',
                width: '100%',
                fontSize: '14px',
                textOverflow: 'ellipsis',
                [theme.breakpoints.down('xl')]: {
                    fontsize: '12px',
                },
            },
            '.MuiOutlinedInput-notchedOutline': {
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                borderColor: `${theme.palette.border.main}`,
            },
        },
        replyContentBody: {
            letterSpacing: 0,
            color: theme.palette.text.contrastText,
            fontSize: '14px',
            display: 'block',
            borderBottom: `1px solid ${theme.palette.border.main}`,
            paddingBottom: '20px',
            '.placeholder': {
                display: 'inline-block',
                margin: '0 5px',
                position: 'relative',
                bottom: '2px',
            },
            [theme.breakpoints.down('xl')]: {
                fontSize: '12px',
            },
        },
        multimediaControls: {
            width: '100%',
            maxHeight: '15rem',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '0.3rem',
        },
        mediaContainer: {
            marginBottom: '0.5rem',
        },
    };
    return styles;
};
export default CcfOutboundTemplatePreviewStyle;
//# sourceMappingURL=ccf-outbound-template-preview.style.js.map