/**
 * used to over-ride the styles on drag and drop event
 * @param style - applied drag and drop styles
 * @param snapshot - snapshot of current drag status
 * @example - getStyle
 */
export const getStyle = (snapshot, style, theme) => {
    var _a, _b;
    if (!snapshot.isDropAnimating) {
        return Object.assign(Object.assign({}, style), { backgroundColor: snapshot.isDragging ? `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.main}` : 'inherit', cursor: 'pointer' });
    }
    return Object.assign(Object.assign({}, style), { transitionDuration: '0.01s' });
};
//# sourceMappingURL=ccf-draggable-columns-styles.js.map