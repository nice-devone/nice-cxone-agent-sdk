import { Theme } from '@mui/material';
/**
 * Styling for skillDetailsStyles
 * @returns CcfEnhancedWorkflowExecuteEditorStyles CSS properties as a JSON object
 * @example CcfEnhancedWorkflowExecuteEditorStyles
*/
declare const CcfEnhancedWorkflowExecuteEditorStyles: (theme: Theme, component: string) => {
    screen: {
        display: string;
        justifyContent: string;
        alignItems: string;
        height: string;
    };
    application: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        overflow: string;
        display: string;
        flexDirection: string;
        height: string;
        width: string;
    };
    loader: {
        display: string;
        justifyContent: string;
        alignItems: string;
        height: string;
    };
    ':global(.heightInherit)': {
        height: string;
    };
    body: {
        zIndex: number;
        backgroundColor: string;
        display: string;
        flexDirection: string;
        height: string;
        overflow: string;
        title: {
            fontWeight: number;
            fontSize: string;
            lineHeight: string;
            padding: string;
        };
        content: {
            backgroundColor: string;
            width: string;
            margin: string;
            height: string;
        };
    };
    gridContainer: {
        display: string;
        width: string;
        height: string;
        gridItem: {
            display: string;
            flexDirection: string;
            height: string;
            width: string;
            overflow: string;
            borderRight: string;
        };
        gridItemWidth: {
            [x: string]: {
                width: string;
            };
        };
        addButton: {
            padding: string;
            color: string;
            backgroundColor: string;
            margin: string;
            width: string;
            weight: string;
            border: string;
            textTransform: string;
            '&:hover': {
                backgroundColor: string;
                border: string;
                boxShadow: string;
            };
            '&:disabled': {
                backgroundColor: string;
                border: string;
                boxShadow: string;
            };
        };
        leftBox: {
            overflow: string;
            backgroundColor: string;
            display: string;
            justifyContent: string;
            alignItems: string;
            height: string;
        };
        rightBox: {
            flexGrow: number;
            display: string;
            alignItems: string;
            justifyContent: string;
            overflow: string;
        };
    };
    appBar: {
        backgroundColor: string;
        boxShadow: string;
    };
    typoStyle: {
        [x: string]: string | number | {
            fontSize: string;
        };
        fontWeight: number;
        lineHeight: string;
        color: string;
    };
    leftbox: {
        display: string;
        justifyContent: string;
        alignItems: string;
        height: string;
    };
    leftTextStyle: {
        color: string;
        fontSize: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        textAlign: string;
    };
    rightTextStyle: {
        color: string;
        fontSize: string;
    };
};
export default CcfEnhancedWorkflowExecuteEditorStyles;
