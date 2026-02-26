import { Theme } from '@mui/material';
/**
 * Styling for CcfAgentCopilotDecisionTree
 * @param theme - MUI theme object
 * @returns CcfAgentCopilotDecisionTree CSS properties as a JSON object
 * @example CcfAgentCopilotDecisionTreeStyles(theme)
 */
declare const CcfAgentCopilotDecisionTreeStyles: (theme: Theme, isCompact: boolean) => {
    container: {
        display: string;
        top: string;
        flexDirection: string;
        paddingBottom: string;
        paddingRight: string;
        paddingLeft: string;
        overflow: string;
        height: string;
        position: string;
        width: string;
        boxSizing: string;
    };
    header: {
        justifyContent: string;
        flexShrink: number;
        minHeight: string;
        position: string;
        top: number;
        backgroundColor: string;
        zIndex: number;
        paddingTop: string;
        paddingBottom: string;
        display: string;
        alignItems: string;
    };
    headerContent: {
        display: string;
        alignItems: string;
    };
    title: {
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
    };
    headerAction: {
        gap: number;
        color: string;
        display: string;
        alignItems: string;
    };
    contentWrapper: {
        display: string;
        gap: string;
        marginTop: string;
        alignItems: string;
        flexDirection: string;
    };
    divider: {
        width: string;
        height: string;
        backgroundColor: string;
        mx: string | number;
        my: string | number;
        alignSelf: string;
    };
    sections: {
        flex: number;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        overflow: string;
        minHeight: number;
    };
    dropdownContainer: {
        maxHeight: string;
        minHeight: string;
        width: string;
    };
    sqSection: {
        maxHeight: string;
        flex: string;
        overflowY: string;
    } | {
        maxHeight?: undefined;
        flex?: undefined;
        overflowY?: undefined;
    };
    cdSection: {
        flex: string;
        overflowY: string;
    } | {
        flex?: undefined;
        overflowY?: undefined;
    };
};
export default CcfAgentCopilotDecisionTreeStyles;
