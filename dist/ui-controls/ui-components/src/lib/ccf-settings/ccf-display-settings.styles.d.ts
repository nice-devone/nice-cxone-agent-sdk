import { Theme } from '@mui/material';
/**
 * Styling for skillDetailsStyles
 * @returns skillDetailsStyles CSS properties as a JSON object
 * @example skillDetailsStylestyles
*/
declare const displaySettingStyles: (theme: Theme, isRevampEmailToggleEnabled: boolean) => {
    customTableContainer: {
        [x: string]: string | {
            maxWidth: string;
        };
        height: string;
        minHeight: string;
        borderCollapse: string;
        marginLeft: string;
        border: string;
        borderColor: string;
        marginTop: string;
    };
    KeyboardBox: {
        paddingLeft: string;
        paddingBottom: string;
        marginBottom: string;
    };
    keyShortcutHeading: {
        fontWeight: string;
    };
    mainContainer: {
        display: string;
        flexDirection: string;
        height: string;
    };
    listHeader: {
        width: string;
        backgroundColor: string;
        marginBottom: string;
        paddingBottom: string;
    };
    displayHeader: {
        position: string;
        fontWeight: string;
        color: string;
        fontSize: import("csstype").Property.FontSize<string | number>;
    };
    tableHeadRow: {
        'td,th': {
            fontWeight: string;
            textAlign: string;
            textTransform: string;
            position: string;
            backgroundColor: string;
        };
        borderBottom: string;
        borderBottomColor: string;
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
    sendwithEnterBox: {
        display: string;
        alignItems: string;
        marginBottom: string;
        flexWrap: string;
    };
    sendandshortcutsBox: {
        paddingLeft: string;
        paddingBottom: string;
        alignItems: string;
    };
    shortcutsBox: {
        display: string;
        alignItems: string;
    };
    emailSortOrderContainer: {
        paddingLeft: string;
        paddingBottom: string;
        alignItems: string;
    };
    emailSortOrderBox: {
        display: string;
        alignItems: string;
        marginBottom: string;
        flexWrap: string;
    };
    messageSortIcon: {
        width: string;
        height: string;
        paddingTop: string;
        marginBottom: string;
    };
    menuItem: {
        border: string;
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
        };
    };
    focusedElement: {
        '&:focus': {
            border: string;
            outlineOffset: string;
        };
    };
};
export default displaySettingStyles;
