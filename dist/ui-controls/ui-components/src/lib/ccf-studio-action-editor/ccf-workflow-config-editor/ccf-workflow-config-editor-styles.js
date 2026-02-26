/**
 * Styling for skillDetailsStyles
 * @returns CcfWorkflowConfigEditorStyles CSS properties as a JSON object
 * @example CcfWorkflowConfigEditorStyles
*/
const CcfWorkflowConfigEditorStyles = () => {
    const styles = {
        window: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        application: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        '::global(.heightInherit)': {
            height: 'inherit',
        },
        body: {
            zIndex: 0,
            backgroundColor: '#eaf0f6',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            flex: 1,
            overflowY: 'auto',
            title: {
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '25px',
                marginBottom: '15px',
            },
            content: {
                backgroundColor: '#ffffff',
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                padding: '16px',
                overflowY: 'auto',
                workflowMappingContainer: {
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },
        footer: {
            zIndex: 1,
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            padding: '8px 16px',
            footerButton: {
                width: '8em',
            },
            buttonForCancel: {
                marginRight: '16px',
            },
            borderTop: '1px solid #eaf0f6',
        },
    };
    return styles;
};
export default CcfWorkflowConfigEditorStyles;
//# sourceMappingURL=ccf-workflow-config-editor-styles.js.map