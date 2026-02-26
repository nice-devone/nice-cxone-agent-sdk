/**
 * Styling for skillDetailsStyles
 * @returns CcfEnhancedWorkflowExecuteEditorStyles CSS properties as a JSON object
 * @example CcfEnhancedWorkflowExecuteEditorStyles
*/
const CcfEnhancedWorkflowExecuteEditorStyles = (theme, component) => {
    const styles = {
        screen: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        application: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        },
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        ':global(.heightInherit)': {
            height: 'inherit',
        },
        body: {
            zIndex: 1,
            backgroundColor: theme.palette.background.LogoColor,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            title: {
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '27px',
                padding: '16px 16px 0px 30px',
            },
            content: {
                backgroundColor: theme.palette.background.paper,
                width: 'calc(100% - 60px)',
                margin: '16px 30px 16px 30px',
                height: 'calc(100% - 155px);',
            },
        },
        gridContainer: {
            display: 'flex',
            width: '100%',
            height: '100%',
            gridItem: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                borderRight: `0.06rem solid ${theme.palette.background.charcoleGrey}`,
            },
            gridItemWidth: {
                [theme.breakpoints.up('md')]: {
                    width: '230px',
                },
                [theme.breakpoints.between('sm', 'md')]: {
                    width: '190px',
                },
                [theme.breakpoints.down('sm')]: {
                    width: '150px',
                },
            },
            addButton: {
                padding: '8px',
                color: theme.palette.text.searchTitle,
                backgroundColor: 'white',
                margin: '8px 16px 8px 16px',
                width: 'auto',
                weight: '600',
                border: `1px solid ${theme.palette.border.contrastText}`,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: theme.palette.background.slateGrey,
                    border: `1px solid ${theme.palette.border.contrastText}`,
                    boxShadow: 'none',
                },
                '&:disabled': {
                    backgroundColor: theme.palette.background.slateGrey,
                    border: `1px solid ${theme.palette.border.contrastText}`,
                    boxShadow: 'none',
                },
            },
            leftBox: {
                overflow: 'auto',
                backgroundColor: theme.palette.background.level1,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '100%',
            },
            rightBox: {
                flexGrow: 1,
                display: 'flex',
                alignItems: component === 'homeScreen' ? 'center' : 'flex-start',
                justifyContent: 'center',
                overflow: component === 'homeScreen' ? '' : 'auto',
            },
        },
        appBar: {
            backgroundColor: theme.palette.background.level1,
            boxShadow: 'none',
        },
        typoStyle: {
            fontWeight: 600,
            lineHeight: '14px',
            color: theme.palette.text.searchTitle,
            [theme.breakpoints.down('sm')]: {
                fontSize: '11px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '13px',
            },
        },
        leftbox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        leftTextStyle: {
            color: theme.palette.text.header,
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },
        rightTextStyle: {
            color: theme.palette.text.header,
            fontSize: '16px',
        },
    };
    return styles;
};
export default CcfEnhancedWorkflowExecuteEditorStyles;
//# sourceMappingURL=ccf-enhanced-workflow-execute-editor-styles.js.map