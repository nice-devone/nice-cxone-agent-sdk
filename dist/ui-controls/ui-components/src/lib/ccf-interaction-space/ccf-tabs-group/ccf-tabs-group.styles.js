/**
 * @returns -
 * @example -
 */
export const tabGroupStyles = (theme, wrapperWidth, tabsLength) => {
    const styles = {
        tabGroup: {
            width: '100%',
            height: '100%',
            boxShadow: `${theme.palette.boxshadow.main} 0px 1px 3px`,
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '6px',
        },
        tabPanel: {
            height: 'calc(100% - 37px)',
        },
        tabWrapper: {
            '& .MuiTabs-fixed': {
                '.MuiTabs-flexContainer': {
                    maxWidth: wrapperWidth - 22,
                    overflow: 'auto',
                },
                'button': {
                    position: 'relative',
                    minWidth: '48px',
                    [theme.breakpoints.down('xl')]: {
                        minWidth: '38px',
                    },
                },
                'button:not(.Mui-selected):after': {
                    position: 'absolute',
                    content: '""',
                    backgroundColor: theme.palette.border.main,
                    width: '2px',
                    height: '20px',
                    top: '7px',
                    right: 0,
                },
                'button:has(+ button.Mui-selected):after': {
                    content: 'none',
                },
            },
            display: 'flex',
            background: theme.palette.background.callControlHeader,
            paddingTop: '5px',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            '& button': {
                textTransform: 'none',
                minHeight: '32px',
                padding: '7px 15px 4px 15px',
            },
            '& button.MuiTab-root': {
                width: tabsLength * 130 >= Math.floor(wrapperWidth) ? `${Math.floor((wrapperWidth - 24) / tabsLength)}px` : '130px',
                padding: '0',
            },
            '& button.Mui-selected': {
                color: theme.palette.text.contrastText,
                position: 'relative',
            },
            '& .MuiTabs-root': {
                minHeight: '12px',
            },
        },
        addButton: {
            background: 'none',
            padding: '0 !important',
            minWidth: 'auto',
            color: 'black',
            maxHeight: '32px',
            fontSize: '18px',
            boxShadow: 'none',
            border: 'none',
            '&:hover': {
                background: 'transparent',
            },
            '&:disabled': {
                boxShadow: 'none',
            },
        },
    };
    return styles;
};
//# sourceMappingURL=ccf-tabs-group.styles.js.map