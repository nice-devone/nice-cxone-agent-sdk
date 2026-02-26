/**
 * Styling for skillDetailsStyles
 * @returns skillDetailsStyles CSS properties as a JSON object
 * @example skillDetailsStylestyles
*/
const skillDetailsStyles = (theme, isLessThanMd, isAppSpace) => {
    var _a, _b, _c, _d;
    const styles = {
        skillsContainer: {
            padding: '20px 0px 0px 0px',
            width: '100%',
            height: '60px',
        },
        queueCounterDetailsDiv: {
            height: 'calc( 100% - 60px )',
            display: 'flex',
            flexDirection: 'column',
        },
        tableRowContainer: {
            display: '-webkit-box',
            justifyContent: 'left',
        },
        skillHeader: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.contrastText,
            backgroundColor: theme.palette.background.LogoColor,
            width: '100%',
            padding: '0.55rem 0rem 0.55rem 1rem ',
        },
        tableHeadRow: {
            'td,th': {
                color: `${theme.palette.secondary.main} !important`,
                fontWeight: 'bold',
                textAlign: 'left',
                textTransform: 'uppercase',
                position: 'sticky',
                backgroundColor: theme.palette.background.paper,
            },
            borderBottom: '0.1875rem solid !important',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
        },
        iconHeaderClasses: {
            marginLeft: '15px',
            color: theme.palette.text.contrastText,
            fontWeight: 'normal',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        agentStatesLabel: {
            margin: '5px',
            minWidth: '25px',
            display: 'flex',
            justifyContent: 'center',
        },
        tableLabels: {
            color: theme.palette.text.contrastText,
        },
        tableStyle: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            tableLayout: 'auto',
            borderCollapse: 'collapse',
            borderBottom: '0.1875rem solid ',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
        },
        tableBodyRow: {
            'td, th': {
                textAlign: 'left',
                fontSize: theme.typography.h5,
                color: theme.palette.text.contrastText,
            },
            borderTop: '0.1875rem solid',
            borderTopColor: theme.palette.background.LogoColor,
            borderBottom: '0.1875rem solid',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
            overflowWrap: 'anywhere',
            color: 'red',
        },
        backIcon: {
            width: '15px',
            height: '15px',
            cursor: 'pointer',
        },
        skillHeading: {
            fontSize: '0.875rem',
            fontWeight: 'bold',
            width: 'fit-content',
        },
        skillsInformation: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: isLessThanMd || isAppSpace ? '10px 2px' : '20px 15px 20px',
        },
        skillInfoContainer: {
            width: isLessThanMd ? '126px' : '150px',
            padding: isLessThanMd ? '2px' : '5px',
            height: '58px',
            display: 'grid',
            alignItems: 'center',
        },
        noSkillsInformation: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: isLessThanMd || isAppSpace ? '10px 2px' : '20px 15px 20px',
        },
        skillInfoKey: {
            fontSize: theme.typography.h6,
            fontWeight: 700,
            letterSpacing: '0px',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.placeholder,
            textTransform: 'uppercase',
            textAlign: 'center',
        },
        noSkillInfoKey: {
            fontSize: theme.typography.h5,
            fontWeight: 700,
            letterSpacing: '0px',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
            textAlign: 'center',
            paddingTop: '5px',
        },
        skillInfoValue: {
            textAlign: 'center',
            fontSize: theme.typography.h5,
            fontWeight: 600,
            letterSpacing: '0px',
            color: theme.palette.text.noteLabel,
        },
        skillItems: {
            width: '100%',
            height: `calc( 100% - ${isLessThanMd || isAppSpace ? '80px' : '100px'})`,
        },
        skillNoItems: {
            width: '100%',
            height: 'auto',
        },
        customTableContainer: {
            height: '100%',
            borderCollapse: 'collapse',
            overflowX: 'auto',
            [theme.breakpoints.down('lg')]: {
                overflow: 'unset',
            },
        },
    };
    return styles;
};
export default skillDetailsStyles;
//# sourceMappingURL=ccf-skill-details.styles.js.map