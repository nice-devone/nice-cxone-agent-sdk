/**
 * styles for ContactControlPanelSubHeading
 * @returns contactControlStyles styles object
 * @example <contactControlStyles />
 */
export const contactControlPanelSubHeadingStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        subHeading: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 0px',
        },
        subHeading1: {
            font: `normal normal 600 13px/18px ${(_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily}`,
            letterSpacing: '0px',
            color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.primary,
            opacity: '0.9',
        },
        subHeading2: {
            letterSpacing: '0px',
            maxWidth: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: '10px',
            whiteSpace: 'pre',
        },
        subHeading3: {
            font: `normal normal 600 10px/14px ${(_d = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _d === void 0 ? void 0 : _d.fontFamily}`,
            letterSpacing: '0px',
            color: '#E4263C',
            opacity: '1',
            textAlign: 'center',
        },
    };
    return styles;
};
export default contactControlPanelSubHeadingStyles;
//# sourceMappingURL=contact-control-panel-sub-heading.styles.js.map