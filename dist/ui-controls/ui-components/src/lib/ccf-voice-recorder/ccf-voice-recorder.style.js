/**
 * Styling for CcfVoiceRecorder
 * @param theme - MUI theme object
 * @returns CcfVoiceRecorder CSS properties as a JSON object
 * @example CcfVoiceRecorderStyles(theme)
*/
const VoiceRecorderStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const styles = {
        button: {
            color: `${(_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.grey[800]}`,
            minWidth: '2.125rem',
            border: '0.063rem solid transparent',
            '&:hover': {
                backgroundColor: `${(_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.action) === null || _c === void 0 ? void 0 : _c.hover}`,
            },
            '&:focus': {
                borderColor: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.border) === null || _e === void 0 ? void 0 : _e.menuItemHighlight,
            },
            padding: '0',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
    };
    return styles;
};
export default VoiceRecorderStyles;
//# sourceMappingURL=ccf-voice-recorder.style.js.map