/**
 * Styling for ccf-network-speed-indicator
 * @returns ccf-network-speed-indicator CSS properties as a JSON object
 * @example ccfNetworkSpeedIndicatorStyles(theme)
 */
export const ccfNetworkSpeedIndicatorStyles = (theme) => {
    const styles = {
        networkSpeed: {
            outline: 0,
            border: 0,
            borderRadius: '500px',
            width: '98px',
            transition: 'box-shadow 0.2s ease-in-out',
            overflow: 'hidden',
            height: '9.64px',
            marginTop: '10.68px',
            '-webkit-appearance': 'none',
            backgroundImage: `linear-gradient(to right, ${theme.palette.agentState.available}, ${theme.palette.agentState.working}, ${theme.palette.agentState.unavailable})`,
            '&::-webkit-slider-runnable-track': {
                height: '12px',
                '-webkit-appearance': 'none',
                color: `${theme.palette.background.default}`,
                transition: 'box-shadow 0.2s ease-in-out',
            },
            '&::-webkit-slider-thumb': {
                width: '12px',
                '-webkit-appearance': 'none',
                height: '12px',
                cursor: 'ew-resize',
                background: 'inherit',
                boxShadow: '-340px 0 0 320px transparent, inset 0 0 0 40px transparent',
                border: `2px solid ${theme.palette.background.paper}`,
                borderRadius: '50%',
                transition: 'box-shadow 0.2s ease-in-out',
                position: 'relative',
            },
            '&:active::-webkit-slider-thumb': {
                background: 'inherit',
            },
        },
        networkStatusLabel: {
            fontSize: '12px',
            lineHeight: '125%',
            color: `${theme.palette.text.main}`,
        },
    };
    return styles;
};
export default ccfNetworkSpeedIndicatorStyles;
//# sourceMappingURL=ccf-network-speed-indicator.styles.js.map