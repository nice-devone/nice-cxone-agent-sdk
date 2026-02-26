/**
 * @example styles for avatar component
 */
const ccfAvatarStyle = (theme, props) => {
    var _a, _b;
    const styles = {
        root: {
            width: props.width,
            height: props.height,
            fontSize: props.fontSize,
            color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text.primary,
            backgroundcolor: (_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.paper,
            border: props.border ? `1px solid ${props.borderColor}` : '0px',
            alt: props.alt,
            variant: props.variant,
            children: props.children,
        },
    };
    return styles;
};
export default ccfAvatarStyle;
//# sourceMappingURL=ccf-avatar.styles.js.map