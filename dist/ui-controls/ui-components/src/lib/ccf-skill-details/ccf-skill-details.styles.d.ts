import { Theme } from '@mui/material';
/**
 * Styling for skillDetailsStyles
 * @returns skillDetailsStyles CSS properties as a JSON object
 * @example skillDetailsStylestyles
*/
declare const skillDetailsStyles: (theme: Theme, isLessThanMd: boolean, isAppSpace?: boolean) => {
    skillsContainer: {
        padding: string;
        width: string;
        height: string;
    };
    queueCounterDetailsDiv: {
        height: string;
        display: string;
        flexDirection: string;
    };
    tableRowContainer: {
        display: string;
        justifyContent: string;
    };
    skillHeader: {
        display: string;
        alignItems: string;
        color: string;
        backgroundColor: string;
        width: string;
        padding: string;
    };
    tableHeadRow: {
        'td,th': {
            color: string;
            fontWeight: string;
            textAlign: string;
            textTransform: string;
            position: string;
            backgroundColor: string;
        };
        borderBottom: string;
        borderBottomColor: string;
    };
    iconHeaderClasses: {
        marginLeft: string;
        color: string;
        fontWeight: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    agentStatesLabel: {
        margin: string;
        minWidth: string;
        display: string;
        justifyContent: string;
    };
    tableLabels: {
        color: string;
    };
    tableStyle: {
        width: string;
        backgroundColor: string;
        tableLayout: string;
        borderCollapse: string;
        borderBottom: string;
        borderBottomColor: string;
    };
    tableBodyRow: {
        'td, th': {
            textAlign: string;
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            color: string;
        };
        borderTop: string;
        borderTopColor: string;
        borderBottom: string;
        borderBottomColor: string;
        overflowWrap: string;
        color: string;
    };
    backIcon: {
        width: string;
        height: string;
        cursor: string;
    };
    skillHeading: {
        fontSize: string;
        fontWeight: string;
        width: string;
    };
    skillsInformation: {
        display: string;
        justifyContent: string;
        alignItems: string;
        padding: string;
    };
    skillInfoContainer: {
        width: string;
        padding: string;
        height: string;
        display: string;
        alignItems: string;
    };
    noSkillsInformation: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        padding: string;
    };
    skillInfoKey: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: number;
        letterSpacing: string;
        color: string;
        textTransform: string;
        textAlign: string;
    };
    noSkillInfoKey: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: number;
        letterSpacing: string;
        color: string;
        textAlign: string;
        paddingTop: string;
    };
    skillInfoValue: {
        textAlign: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: number;
        letterSpacing: string;
        color: string;
    };
    skillItems: {
        width: string;
        height: string;
    };
    skillNoItems: {
        width: string;
        height: string;
    };
    customTableContainer: {
        [x: string]: string | {
            overflow: string;
        };
        height: string;
        borderCollapse: string;
        overflowX: string;
    };
};
export default skillDetailsStyles;
