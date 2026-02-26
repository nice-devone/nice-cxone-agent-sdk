/**
 * Styling for metricStyles
 * @returns metricStyles CSS properties as a JSON object
 * @example metricStyles()
 */
declare const metricStyles: () => {
    mainFlexContainer: {
        flex: number;
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
        gap: string;
    };
    scoreMeterContainer: {
        height: string;
        position: string;
    };
    RTIGTitleContainer: {
        textAlign: string;
        lineHeight: string;
        marginTop: string;
        width: string;
    };
};
export default metricStyles;
