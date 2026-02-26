/**
 * Styling for ccf-app-navigation
 * @returns ccf-network-speed-notification-styles CSS properties as a JSON object
 * @example ccfNetworkSpeedNotificationStyles(theme)
 */
export const ccfNetworkSpeedNotificationStyles = (theme) => {
    var _a, _b;
    const styles = {
        sidebarItemNetworkInformation: {
            top: '4px',
            right: '4px',
            height: '15.2px',
            position: 'absolute',
            fontSize: '0.5em',
            width: '16px',
        },
        sidebarItemNetworkInformationWarning: {
            color: (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.agentState.working,
        },
        sidebarItemNetworkInformationDanger: {
            color: (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.agentState.unavailable,
        },
    };
    return styles;
};
export default ccfNetworkSpeedNotificationStyles;
//# sourceMappingURL=ccf-network-speed-notification.styles.js.map