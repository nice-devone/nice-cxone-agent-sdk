/**
 * Styling for CcfDigitalContactActions component
 * @returns CcfDigitalContactActions CSS properties as a JSON object
 * @example ccfDigitalContactActionsStyles(theme)
*/
const ccfDigitalContactActionsStyles = (theme) => {
    var _a, _b;
    const styles = {
        digitalControlsContainer: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
            margin: '5px 0',
            borderRadius: '8px',
            border: '1px solid #dae2e8',
            boxShadow: 3,
        },
        digitalControls: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        leftPart: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        rightPart: {
            flex: 0.42,
        },
        digitalControlIcon: {
            textAlign: 'center',
            alignItems: 'center',
            padding: '4px 0',
        },
        skillOrQueueName: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textWrap: 'nowrap',
        },
    };
    return styles;
};
export default ccfDigitalContactActionsStyles;
//# sourceMappingURL=ccf-digital-contact-actions.styles.js.map