/**
 * styles for ContactControlPanelHeading
 * @returns contactControlPanelHeadingStyles styles object
 * @example <contactControlPanelHeadingStyles />
 */
export const contactControlPanelHeadingStyles = (theme) => {
    var _a, _b, _c, _d, _e;
    const styles = {
        controlHeader: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        controlButtonHeaderText: {
            font: `normal normal bold 13px/18px ${(_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily}`,
            letterSpacing: '0px',
            color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.primary,
            opacity: '0.9',
            margin: '9px 10px 9px 10px',
            wordBreak: 'break-all',
        },
        controlPanelHeaderLeftIcon: {
            margin: '9px 0px',
        },
        phonefillColor: {
            fill: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.light,
        },
    };
    return styles;
};
export default contactControlPanelHeadingStyles;
//# sourceMappingURL=contact-control-panel-heading.style.js.map