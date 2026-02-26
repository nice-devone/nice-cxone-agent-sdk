import { Theme } from '@mui/material';
/**
 * Styling for Enhanced workflow execute editor Home Screen Component
 * @returns CcfEnhancedWEStepperContainerStyles CSS properties as a JSON object
 * @example CcfEnhancedWEStepperContainerStyles
 */
declare const CcfEnhancedWEStepperContainerStyles: (theme: Theme) => {
    headerContainer: {
        width: string;
        padding: string;
    };
    mainHeading: {
        display: string;
        justifyContent: string;
        marginLeft: string;
        headingTypography: {
            fontSize: string;
            fontStyle: string;
            fontWeight: number;
            lineHeight: string;
        };
    };
    stepperContainer: {
        width: string;
    };
    connectorStyles: {
        '&.MuiStepConnector-root': {
            top: string;
            transform: string;
            left: string;
            right: string;
        };
        '& .MuiStepConnector-line': {
            borderTopWidth: number;
            borderColor: string | undefined;
        };
    };
    iconStyles: {
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
        height: string;
        borderRadius: string;
        color: string;
        fontSize: string;
    };
    stepperWrapper: {
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
        height: string;
        padding: string;
        flexDirection: string;
        borderBottom: string;
    };
    headerLabelSelected: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        color: string;
    };
    headerLabel: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        color: string;
    };
};
export default CcfEnhancedWEStepperContainerStyles;
