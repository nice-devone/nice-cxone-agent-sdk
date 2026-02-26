/**
 * Styling for Enhanced workflow execute editor Home Screen Component
 * @returns CcfEnhancedWEStepperContainerStyles CSS properties as a JSON object
 * @example CcfEnhancedWEStepperContainerStyles
 */
const CcfEnhancedWEStepperContainerStyles = (theme) => {
    const styles = {
        headerContainer: {
            width: '100%',
            padding: '0.8rem 0 1.8rem 0',
        },
        mainHeading: {
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '0.64rem',
            headingTypography: {
                fontSize: '0.81rem',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '1.37rem',
            },
        },
        stepperContainer: {
            width: '21.56rem',
        },
        connectorStyles: {
            '&.MuiStepConnector-root': {
                top: '27%',
                transform: 'translateY(-50%)',
                left: 'calc(-50% + 1.6rem)',
                right: 'calc(50% + 1.6rem)',
            },
            '& .MuiStepConnector-line': {
                borderTopWidth: 2,
                borderColor: theme.palette.border.input,
            },
        },
        iconStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            color: 'white',
            fontSize: '1rem',
        },
        stepperWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '0 0 1rem 0',
            flexDirection: 'column',
            borderBottom: `0.06rem solid ${theme.palette.background.charcoleGrey}`,
        },
        headerLabelSelected: {
            fontSize: '14px',
            fontWeight: '800',
            lineHeight: '14px',
            color: theme.palette.text.contrastText,
        },
        headerLabel: {
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '15px',
            color: theme.palette.text.contrastText,
        },
    };
    return styles;
};
export default CcfEnhancedWEStepperContainerStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-stepper-container.styles.js.map