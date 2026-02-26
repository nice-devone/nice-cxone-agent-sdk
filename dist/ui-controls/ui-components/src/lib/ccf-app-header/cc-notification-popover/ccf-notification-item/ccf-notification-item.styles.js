/**
 * Styling for NotificationItems
 * @returns NotificationItems CSS properties as a JSON object
 * @example NotificationItemStyles
*/
const notificationItemStyles = (theme) => {
    var _a, _b, _c, _d, _e;
    const styles = {
        itemContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        itemTitleBar: {
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
        },
        itemSubject: {
            textTransform: 'capitalize',
            fontSize: '0.81rem',
            fontWeight: 'bold',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
            width: '97%',
        },
        itemMessage: {
            fontSize: '0.81rem',
            width: 'inherit',
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
        },
        itemReceivedTimeBar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        itemReceivedTime: {
            textTransform: 'capitalize',
            fontSize: '0.75rem',
            color: (_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.placeholder) !== null && _c !== void 0 ? _c : (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.white,
        },
    };
    return styles;
};
export default notificationItemStyles;
//# sourceMappingURL=ccf-notification-item.styles.js.map