/**
 * style object for ccf-voicemail-contact-panel
 * @returns CcfVoicemailContactPanelStyles styles object
 * @example <CcfVoicemailContactPanelStyles />
 */
export const ccfVoicemailContactPanelStyles = (theme) => {
    const styles = {
        revampedVoicemailIcons: {
            height: { xs: 38, xl: 56 },
            width: { xs: 38, xl: 56 },
            '&:hover': { backgroundColor: theme.palette.text.clearText },
        },
        paperContainer: {
            borderRadius: '7px',
            margin: '0 8px px',
            paddingTop: '16px',
            [theme.breakpoints.down('xl')]: {
                paddingTop: 0,
                marginTop: '2px',
            },
        },
        paperContainerDisabled: {
            backgroundColor: theme.palette.background.scrollThumb,
            borderRadius: '7px',
            margin: '0 8px px',
            opacity: '.5',
            paddingTop: '16px',
            [theme.breakpoints.down('xl')]: {
                paddingTop: 0,
                marginTop: '2px',
            },
        },
        voicemailHeaderGrid: {
            display: 'flex',
            alignItems: 'center',
            top: 0,
            marginLeft: 0,
            [theme.breakpoints.down('xl')]: {
                position: 'relative',
            },
        },
        voicemailIconHeaderTitleGrid: {
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
        },
        voicemailIcon: {
            color: theme.palette.background.dark,
            [theme.breakpoints.down('xl')]: {
                marginLeft: 1,
            },
        },
        headerTitle: {
            fontSize: theme.typography.h5,
            fontWeight: 'bold',
            paddingLeft: 1,
        },
        overflowIconGrid: {
            display: 'flex',
            justifyContent: 'end',
        },
        voicemailControlsContainer: {
            display: 'flex',
            padding: '5px 5px 5px 5px',
            flexDirection: 'column',
        },
        callbackTransferRow: {
            display: 'flex',
            flexFlow: 'row wrap',
            height: 'auto',
            justifyContent: 'center',
            flexDirection: 'column',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'start',
                flexFlow: 'row nowrap',
            },
        },
        callbackTransferGrid: {
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'start',
            },
        },
        trashBinResolveRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'end',
            },
        },
        voicemailControlsGrid: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'center',
            },
        },
        replayIconFileDurationGrid: {
            color: theme.palette.secondary.main,
            padding: '0.5em 0',
            justifyContent: 'center',
            flexFlow: 'row nowrap',
            [theme.breakpoints.down('xl')]: {
                padding: 0,
                justifyContent: 'space-evenly',
            },
        },
        timeStampGridWrapper: {
            display: 'flex',
            alignItems: 'center',
            order: { xs: 1, xl: 2 },
            [theme.breakpoints.down('md')]: {
                marginRight: '1rem',
            },
        },
        timestampIA: {
            color: theme.palette.secondary.main,
            fontSize: theme.typography.h6,
        },
        holdTimer: {
            textAlign: 'center',
            color: theme.palette.text.black,
            fontSize: theme.typography.h6,
            fontWeight: 'bold',
            paddingBottom: '5px',
        },
        verticalDivider: {
            [theme.breakpoints.down('xl')]: {
                height: '30px',
                borderColor: theme.palette.secondary.main,
                opacity: 0.3,
                padding: '0 .3rem',
            },
        },
        circularProgress: {
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
            height: '68px',
            width: '68px',
            [theme.breakpoints.down('xl')]: {
                top: 0,
                left: 0,
                height: 38,
                width: 38,
            },
        },
        replayIcon: {
            height: '20px',
            fontSize: '8px',
            [theme.breakpoints.down('xl')]: {
                fontSize: '16px',
                margin: '0 0 1px',
            },
            width: '20px',
        },
        resumeIcon: {
            fontSize: theme.typography.h2,
            [theme.breakpoints.down('xl')]: {
                fontSize: theme.typography.h5,
            },
        },
        voicemailControlsInnerContainer: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexFlow: 'column wrap',
            [theme.breakpoints.down('xl')]: {
                flexFlow: 'row nowrap',
                backgroundColor: theme.palette.background.scrollThumb,
            },
        },
    };
    return styles;
};
export default ccfVoicemailContactPanelStyles;
//# sourceMappingURL=ccf-voicemail-contact-panel.style.js.map