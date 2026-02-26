/**
 * Styling for metricStyles
 * @returns metricStyles CSS properties as a JSON object
 * @example metricStyles()
 */
const metricStyles = () => {
    const styles = {
        mainFlexContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1%',
        },
        scoreMeterContainer: {
            height: 'auto',
            position: 'relative',
        },
        RTIGTitleContainer: {
            textAlign: 'center',
            lineHeight: '1',
            marginTop: '5px',
            width: '80px',
        },
    };
    return styles;
};
export default metricStyles;
//# sourceMappingURL=metric.styles.js.map