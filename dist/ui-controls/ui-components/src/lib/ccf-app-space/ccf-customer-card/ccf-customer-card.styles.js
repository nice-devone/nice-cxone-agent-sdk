/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const customerCardStyles = (theme) => {
    const styles = {
        customerCardContainer: {
            width: '100%',
            [theme.breakpoints.down('xl')]: {
                marginLeft: '0px',
                overflow: 'auto',
            },
            [theme.breakpoints.up('xl')]: {
                marginLeft: '0px',
                height: '100%',
                overflow: 'auto',
            },
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
        },
        accordionContainer: {
            boxShadow: 'none',
            display: 'block',
        },
        ccfAppSpaceAccordionHeader: {
            flexDirection: 'row-reverse',
            paddingLeft: '10px',
        },
        accordionHeaderExpand: {
            flexDirection: 'row-reverse',
            paddingLeft: '10px',
            borderTop: `solid ${theme.palette.background.default} 1px`,
            boxShadow: '0px -1px 1px #e7eaec',
        },
        accordionHeaderActivityExpand: {
            flexDirection: 'row-reverse',
            paddingLeft: '10px',
            borderTop: `solid ${theme.palette.background.default} 1px`,
            boxShadow: `-1px 1px 1px ${theme.palette.background.toastBackground}`,
        },
        contactCardDetailsContainer: {
            maxHeight: '200px',
            overflowY: 'auto',
            paddingLeft: '20px',
        },
        expandedIcon: {
            transform: 'rotate(180deg)',
            height: '18px',
            width: '20px',
            background: `${theme.palette.text.content} 0% 0% no-repeat padding-box`,
            color: theme.palette.text.disabled,
        },
        contactCardTitle: {
            font: `normal normal 600 14px/${theme.typography.h5.fontSize} ${theme.typography.fontFamily}`,
            letterSpacing: '0px',
            color: theme.palette.text.primary,
            opacity: 1,
        },
        customerNoteParent: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        hideAccordion: {
            display: 'none',
        },
        mergeIcon: {
            position: 'absolute',
            right: theme.spacing(1),
        },
        ccAlert: {
            position: 'sticky',
            bottom: 0,
            width: '100%',
        },
        notesAccordionTitle: {
            fontWeight: '600',
        },
        alignCenter: {
            textAlign: 'center',
        },
        customerCardParentContainer: {
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        },
        ccAlertContainer: {
            position: 'sticky',
            bottom: '0',
            width: '100%',
            zIndex: '999',
        },
    };
    return styles;
};
export default customerCardStyles;
//# sourceMappingURL=ccf-customer-card.styles.js.map