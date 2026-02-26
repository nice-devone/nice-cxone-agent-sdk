/**
 * style object for ccf-digital-outbound-contact
 * @returns CcfDigitalOutboundContactStyles styles object
 * ```
 * @example
 * <CcfDigitalOutboundContactStyles/>
 * ```
 */
const CcfDigitalOutboundContactStyles = (theme, isAdjustHeightForVoiceContact) => {
    const styles = {
        smsObPanel: {
            '>div:last-child>div': {
                height: '170px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                [theme.breakpoints.down('xl')]: {
                    height: '130px',
                },
                [theme.breakpoints.down('md')]: {
                    height: '170px',
                },
            },
        },
        gridItemHeight: {
            minHeight: 'calc(100vh - 362px)',
            [theme.breakpoints.only('md')]: {
                minHeight: isAdjustHeightForVoiceContact ? 'calc(100vh - 480px)' : 'calc(100vh - 362px)',
            },
            [theme.breakpoints.only('sm')]: {
                minHeight: isAdjustHeightForVoiceContact ? 'calc(100vh - 510px)' : 'calc(100vh - 362px)',
            },
        },
        toolbarContainer: {
            display: 'inline-block',
            justifyContent: 'space-between',
            width: '100%',
        },
    };
    return styles;
};
export default CcfDigitalOutboundContactStyles;
//# sourceMappingURL=ccf-digital-outbound-contact.style.js.map