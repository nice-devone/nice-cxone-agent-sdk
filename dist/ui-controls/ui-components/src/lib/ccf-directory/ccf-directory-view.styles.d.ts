import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccf-directory/>
 * @returns styles
 */
export declare const directoryStyles: (theme: Theme) => {
    directoryContainer: {
        [x: string]: string | {
            borderRadius: string;
        };
        display: string;
        flexDirection: string;
        overflowY: string;
        position: string;
        height: string;
    };
    directory: {
        width: string;
        padding: string;
        margin: string;
        borderRadius: string;
        height: string;
        overflowY: string;
        position: string;
    };
    noAgentFoundTypography: {
        paddingTop: string;
        marginBottom: string;
        textAlign: string;
        fontWeight: string;
    };
    includeExternalDirLayout: {
        backgroundColor: string | undefined;
        color: string;
        fontSize: number;
    };
    regularView: {
        width: string;
        cursor: string;
        height: string;
    };
    fullViewUserSectionLayout: {
        width: string;
        backgroundColor: string | undefined;
    };
    fullViewUserList: {
        width: string;
    };
    cursorPointer: {
        cursor: string;
        color: string;
    };
    backgroundWhite: {
        backgroundColor: string;
    };
    itemContainerHeight: {};
    fullHeightContainer: {
        height: string;
    };
    showLoaderContainer: {
        opacity: string;
        height: string;
        width: string;
        position: string;
        backgroundColor: string;
        pointerEvents: string;
        zIndex: string;
    };
    sectionHeader: {
        fontWeight: string;
    };
    agentListContainer: {
        display: string;
        position: string;
        height: string;
    };
    fullViewDirectory: {
        width: string;
        padding: string;
        margin: string;
        borderRadius: string;
        height: string;
        overflowY: string;
        position: string;
    };
    cursorOnly: {
        cursor: string;
    };
    height100: {
        height: string;
    };
};
export default directoryStyles;
