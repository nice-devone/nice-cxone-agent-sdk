import { Theme } from '@mui/material';
/**
 * style object for ccf-interaction-search-assignment
 * @returns CcfDigitalSearchToggleButtonsStyle style object
 * @example CcfDigitalSearchToggleButtonsStyle(theme)
 */
declare const CcfDigitalSearchToggleButtonsStyle: (theme: Theme) => {
    headerContainer: {
        [x: string]: string | {
            flexDirection: string;
        };
        display: string;
        width: string;
        gap: string;
        flexDirection: string;
    };
    parentTabBox: {
        margin: string;
    };
    bulkModificationButtons: {
        width: string;
        'button.MuiToggleButton-root': {
            border: string;
            color: string;
            height: string;
            padding: string;
            margin: string;
            marginRight: string;
        };
        '.MuiToggleButton-root.Mui-selected': {
            color: string;
            backgroundColor: string | undefined;
            padding: string;
        };
    };
    tabHeading: {
        fontWeight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    agentListSelect: {
        width: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        overflow: string;
        height: string;
        lineHeight: string;
        color: string;
        background: string;
    };
    menuItemStyle: {
        textOverflow: string;
        whiteSpace: string;
        overflow: string;
        display: string;
    };
    listItemStyle: {
        '.MuiListItemText-primary': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            color: string;
        };
    };
    subHeaderStyle: {
        alignSelf: string;
        fontWeight: string;
        color: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        marginBottom: string;
    };
    actionButton: {
        padding: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        width: string;
        height: string;
    };
    tabContainer: {
        display: string;
        flexDirection: string;
        margin: string;
    };
    icon: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        marginLeft: string;
    };
    assignDropdown: {
        width: string;
        background: string;
    };
    statusMenuItem: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
    };
    statusMessage: {
        display: string;
        marginTop: string;
        alignSelf: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        width: string;
    };
    statusInput: {
        background: string;
        maxWidth: string;
        width: string;
        height: string;
        '.MuiSelect-select': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            color: string;
            minHeight: string;
        };
        '.MuiInputBase-root': {
            height: string;
        };
    };
    interactionReplyBox: {
        [x: string]: string | {
            width: string;
        };
        margin: string;
    };
    bulkReplyInput: {
        '#Bulk-text-input': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            color: import("@mui/material").TypeText;
            height: string;
            background: string;
        };
    };
    bulkReplyHeader: {
        display: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
            muiName: string;
        };
        width: string;
        gap: string;
    };
    interactionbuttonContainer: {
        display: string;
        justifyContent: string;
        flexWrap: string;
        backgroundColor: string;
        '#interactionReplySendButton': {
            width: string;
            height: string;
        };
        '#interaction-text-caption': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        };
    };
    alignButton: {
        color: string;
        minWidth: string;
        marginRight: string;
        '&:hover': {
            backgroundColor: string;
        };
        padding: number;
    };
    alignButtonActive: {
        background: string | undefined;
    };
    interactionleftSideBox: {
        justifyContent: string;
        height: string;
    };
    assignToMenuItem: {
        maxWidth: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        maxHeight: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    assignToListItem: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
    };
    assignToSomeoneHeader: {
        fontWeight: number;
        color: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        marginLeft: string;
    };
    backIcon: {
        color: string;
        width: string;
        transform: string;
        margin: string;
    };
    downIcon: {
        color: string;
        width: string;
        transform: string;
        margin: string;
    };
    nonClosedCaseText: {
        fontWeight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    closedCaseText: {
        fontWeight: string;
        paddingRight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    messageWrapper: {
        display: string;
        alignItems: string;
        marginTop: string;
        marginLeft: string;
    };
};
export default CcfDigitalSearchToggleButtonsStyle;
