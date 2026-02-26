/**
 * Styling for skillDetailsStyles
 * @returns CcfWorkflowConfigEditorStyles CSS properties as a JSON object
 * @example CcfWorkflowConfigEditorStyles
*/
declare const CcfWorkflowConfigEditorStyles: () => {
    window: {
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    application: {
        position: string;
        left: number;
        right: number;
        top: number;
        bottom: number;
        overflow: string;
        display: string;
        flexDirection: string;
    };
    loader: {
        display: string;
        justifyContent: string;
        alignItems: string;
        height: string;
    };
    '::global(.heightInherit)': {
        height: string;
    };
    body: {
        zIndex: number;
        backgroundColor: string;
        display: string;
        flexDirection: string;
        padding: string;
        flex: number;
        overflowY: string;
        title: {
            fontWeight: number;
            fontSize: string;
            lineHeight: string;
            marginBottom: string;
        };
        content: {
            backgroundColor: string;
            display: string;
            flexGrow: number;
            flexDirection: string;
            padding: string;
            overflowY: string;
            workflowMappingContainer: {
                display: string;
                flexDirection: string;
            };
        };
    };
    footer: {
        zIndex: number;
        backgroundColor: string;
        display: string;
        justifyContent: string;
        flexDirection: string;
        padding: string;
        footerButton: {
            width: string;
        };
        buttonForCancel: {
            marginRight: string;
        };
        borderTop: string;
    };
};
export default CcfWorkflowConfigEditorStyles;
