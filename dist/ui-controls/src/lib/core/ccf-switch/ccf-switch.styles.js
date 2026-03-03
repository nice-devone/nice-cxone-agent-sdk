/**
 * @example styles for switch component
 */
const CcfSwitchButtonStyle = (theme, onLabel, offLabel) => {
    const styles = {
        root: {
            padding: 1,
            '& .MuiSwitch-track': {
                borderRadius: 22 / 2,
                width: '50px',
                height: '20px',
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: theme.spacing(2),
                    height: theme.spacing(2),
                },
                '&::before': Object.assign({ color: theme.palette.background.paper, opacity: 1, content: `"${onLabel}"`, left: 12, top: '50%' }, theme.typography.h6),
                '&::after': Object.assign({ color: theme.palette.background.paper, content: `"${offLabel}"`, right: 12, top: '50%' }, theme.typography.h6),
            },
            '& .MuiSwitch-thumb': {
                boxShadow: 'none',
                color: theme.palette.background.paper,
                width: 17,
                height: 16,
                margin: '1px',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                opacity: 1,
            },
        },
    };
    return styles;
};
export default CcfSwitchButtonStyle;
//# sourceMappingURL=ccf-switch.styles.js.map