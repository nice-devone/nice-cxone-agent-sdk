/**
 * Styling for external app iframes
 * @returns external app CSS properties as a JSON object
 * @example externalAppStyles
 */
const externalAppStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        iframeContainer: {
            height: '100%',
            width: '100%',
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '6px',
            '.wem-iframe': {
                border: `1px solid ${theme.palette.border.main}`,
                boxShadow: `0px 1px 3px ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.boxshadow) === null || _b === void 0 ? void 0 : _b.main}`,
            },
            '.messageText': {
                fontSize: '1rem',
                fontWeight: '600',
                color: theme.palette.text.secondary,
                lineHeight: '1.5',
                padding: '10px',
                textAlign: 'justify',
            },
            '.link_text': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '.link': {
                marginRight: '4px',
                cursor: 'pointer',
                borderBottom: `1px solid ${theme.palette.text.secondary}`,
            },
            '& label': {
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
        },
        openinnewtabIcon: {
            marginRight: 2.5,
            marginTop: 0.7,
        },
        openinnewTabButton: {
            width: 5,
            border: '0.0625rem solid transparent',
            '&:focus': {
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
            },
        },
        openInNewWindowContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '120px 10px',
            padding: '10px',
            textAlign: 'center',
        },
        openInNewWindowIcon: {
            padding: '5px',
        },
        openInNewWindowContent: {
            padding: '5px',
        },
    };
    return styles;
};
export default externalAppStyles;
//# sourceMappingURL=ccf-external-app.styles.js.map