import { Theme } from '@mui/material';
/**
 * Styling for ccf-agent-chat
 * @returns ccf-agent-chat CSS properties as a JSON object
 * @example ccfAgentChatStyles(theme, props)
*/
declare const ccfAgentChatStyles: (theme: Theme, isConversationsStandAlone?: boolean) => {
    AgentChatMainContainer: {
        boxShadow: string;
        border: string;
        borderRadius: string;
        padding: number;
        height: string;
    };
    AgentChatContainer: {
        display: string;
        gap: string;
        height: string;
    };
    AgentChatLeftContainer: {};
    AgentChatRightContainer: {
        [x: string]: string | {
            width: string;
        };
        position: string;
        display: string;
        flexDirection: string;
        height: string;
    };
    AgentChatNoMessageWindow: {
        [x: string]: string | {
            height: string;
        };
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        textAlign: string;
    };
    headerText: {
        background: string;
        borderRadius: string;
        borderBottom: string;
    };
    headerContent: {
        display: string;
        alignItems: string;
        gap: string;
    };
    groupHeader: {
        fontFamily: string;
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
        verticalAlign: string;
        position: string;
        top: string;
        padding: string;
        backgroundColor: string;
        zIndex: number;
    };
    groupItems: {
        padding: number;
    };
    AgentChatHeader: {
        [x: string]: string | {
            padding: string;
            paddingBottom: string;
        } | {
            padding: string;
            paddingBottom?: undefined;
        };
        borderBottom: string;
    };
    AgentChatHeaderContent: {
        display: string;
        alignItems: string;
        justifyContent: string;
        width: string;
    };
    AgentChatHeaderXL: {
        [x: string]: number | {
            justifyContent: string;
        };
        flexGrow: number;
    };
    AgentChatInnerContent: {
        display: string;
        alignItems: string;
        gap: string;
        flexDirection: string;
        flexWrap: string;
        width: string;
    };
    AgentChatText: {
        color: string;
    };
    expandedIcon: {
        transform: string;
        height: string;
        width: string;
        background: string;
        color: string;
    };
    accordionHeaderExpand: {
        flexDirection: string;
        padding: string;
        minHeight: string;
        '& .MuiAccordionSummary-content': {
            margin: string;
            display: string;
            alignItems: string;
            width: string;
        };
        '& #plus': {
            height: string;
            width: string;
        };
    };
    AgentChatAccordionContainer: {
        [x: string]: string | {
            height: string;
        };
        maxHeight: string;
        paddingRight: string;
        paddingLeft: string;
        overflow: string;
    };
    accordionContainer: {
        boxShadow: string;
        display: string;
        margin: string;
        paddingBottom: string;
    };
    accordionHeader: {
        color: string;
        textTransform: string;
        margin: string;
    };
    coversationHeader: {
        color: string;
        textTransform: string;
        fontweight: number;
        fontSize: string;
        margin: string;
    };
    searchBox: {
        [x: string]: string | {
            marginLeft: string | false;
            marginRight: string | false;
            padding?: undefined;
            height?: undefined;
            width?: undefined;
        } | {
            padding: string;
            marginLeft?: undefined;
            marginRight?: undefined;
            height?: undefined;
            width?: undefined;
        } | {
            height: string;
            width: string;
            marginLeft?: undefined;
            marginRight?: undefined;
            padding?: undefined;
        };
        minWidth: string;
        marginLeft: string;
        '& .MuiOutlinedInput-root': {
            padding: string;
        };
        '& svg': {
            height: string;
            width: string;
        };
    };
    AgentChatStatus: {
        '& .MuiSvgIcon-root': {
            height: string;
            width: string;
        };
    };
    RightBorder: {
        [x: string]: string | {
            width: string;
        };
        borderRight: string;
        height: string;
    };
    BorderBottom: {
        borderBottom: string;
    };
    AgentChatNormalText: {
        fontSize: string;
        fontWeight: number;
        color: string;
        flexShrink: number;
    };
    AgentChatStrongText: {
        fontSize: string;
        fontWeight: number;
        color: string;
        whiteSpace: string;
        textOverflow: string;
        maxWidth: string;
    };
    AgentChatExtraStrongText: {
        fontSize: string;
        fontWeight: number;
        color: string;
    };
    AgentChatAddmemberText: {
        display: string;
        gap: string;
        padding: string;
        cursor: string;
    };
    AgentMessageContent: {
        borderBottom: string;
    };
    AgentNames: {
        cursor: string;
        borderRadius: string;
        color: string;
    };
    AgentNameIcon: {
        alignItems: string;
        padding: string;
        justifyContent: string;
        display: string;
        gap: string;
    };
    AgentNameIconHeader: {
        display: string;
        Width: string;
        gap: string;
        padding: string;
        '& #left_arrow': {
            height: string;
            width: string;
        };
    };
    MessagesContent: {
        paddingBottom: string;
    };
    AgentNewChatSearchIcon: {
        margin: string;
    };
    AgentNewChat: {
        display: string;
        justifyContent: string;
        alignItems: string;
        padding: string;
    };
    AgentNewChatForIsSmView: {
        justifyContent: string;
    };
    AgentNewChatIcon: {
        cursor: string;
        height: string;
        width: string;
    };
    AgentNewGroupIcon: {
        display: string;
        cursor: string;
        marginLeft: string;
        top: string;
        position: string;
        right: string;
        fontSize: string;
        '& svg': {
            width: string;
            height: string;
        };
    };
    AccordionContent: {
        padding: string;
        '& .MuiBox-root': {
            padding: string;
        };
    };
    UnReadText: {
        fontSize: string;
        fontWeight: number;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        color: string;
        textAlign: string;
        marginLeft: string;
        position: string;
        right: string;
    };
    AgentMessageRight: {
        display: string;
        flexDirection: string;
        alignItems: string;
        padding: string;
        flex: number;
    };
    AgentChatCurrentUser: {
        width: string;
        height: string;
        borderTopLeftRadius: string;
        borderBottomLeftRadius: string;
        backgroundColor: string;
        position: string;
        left: string;
        top: string;
        transform: string;
    };
    AgentMessage: {
        padding: string;
        flex: number;
    };
    AgentChatMessageBox: {
        display: string;
        alignItems: string;
        flexDirection: string;
        justifyContent: string;
        width: string;
    };
    AgentChatMessageRight: {
        display: string;
        justifyContent: string;
        paddingLeft: string;
        paddingRight: string;
    };
    AgentChatMessageLeft: {
        display: string;
        justifyContent: string;
        paddingLeft: string;
    };
    AgentNameAvatar: {
        fontWeight: number;
        fontSize: string;
        height: string;
        width: string;
        marginTop: string;
    };
    AgentMessageTime: {
        paddingLeft: string;
        fontSize: string;
    };
    AgentMessageDate: {
        display: string;
        alignItems: string;
        justifyContent: string;
    };
    AgentMessageDateHRline: {
        flex: number;
        borderBottom: string;
    };
    AgentNoMessage: {
        fontWeight: number;
        fontSize: string;
        color: string;
    };
    noMessageContent: {
        [x: string]: {
            display: string;
            alignItems: string;
        } | {
            [x: string]: {
                display: string;
                verticalAlign: string;
            };
            display?: undefined;
            alignItems?: undefined;
        };
        '& p.MuiTypography-root': {
            [x: string]: {
                display: string;
                verticalAlign: string;
            };
        };
    };
    AgentNewMessage: {
        fontWeight: number;
        fontSize: string;
        color: string;
        border: string;
        borderRadius: string;
        padding: string;
        cursor: string;
        display: string;
        alignItems: string;
        width: string;
        marginTop: string;
    };
    AgentNoMessageIcon: {
        '& #no_message': {
            height: string;
            width: string;
        };
    };
    AgentGroupInputs: {
        paddingBottom: string;
    };
    AddMemberIcon: {
        '& .MuiSvgIcon-fontSizeMedium': {
            height: string;
            width: string;
            marginTop: string;
        };
    };
    MembersDownArrow: {
        display: string;
        flexShrink: number;
        marginLeft: string;
        cursor: string;
        transform: string;
        '& .MuiSvgIcon-fontSizeMedium': {
            height: string;
            width: string;
            paddingTop: string;
        };
        '& .MuiSvgIcon-root#left_arrow': {
            height: string;
            width: string;
        };
    };
    AgentNamesAccordion: {
        cursor: string;
        display: string;
        alignItems: string;
        padding: string;
        borderRadius: string;
        backgroundColor: string;
        transition: string;
        '&:hover': {
            backgroundColor: string;
        };
        '& .MuiTypography-root': {
            color: string;
        };
        maxWidth: string;
    };
    SelectedAgentNamesAccordian: {
        backgroundColor: string;
        '&:hover': {
            backgroundColor: string;
        };
        '& .MuiTypography-root': {
            color: string;
        };
    };
    AgentGroupTitle: {
        fontSize: string;
        padding: string;
        textTransform: string;
        fontWeight: number;
    };
    AgentChatEditor: {
        padding: string;
        position: string;
        '& #dropzone .MuiButtonBase-root.MuiButton-root': {
            boxShadow: string;
            border: string;
        };
        '& #dropzone p.MuiTypography-root': {
            maxWidth: string;
            overflowWrap: string;
            textOverflow: string;
            display: string;
            '-webkit-line-clamp': string;
            '-webkit-box-orient': string;
            overflow: string;
        };
    };
    EditorPlaceholder: {
        color: string;
        overflow: string;
        position: string;
        top: string;
        left: string;
        userSelect: string;
        pointerEvents: string;
    };
    SendBtn: {
        marginTop: string;
        display: string;
        justifyContent: string;
        gap: string;
        '& p.MuiTypography-root': {
            display: string;
            alignItems: string;
        };
        '& svg.MuiSvgIcon-root': {
            height: string;
            width: string;
        };
    };
    MenuItemContent: {
        '& .MuiSvgIcon-root': {
            height: string;
            width: string;
        };
    };
    AgentChatKebab: {
        '& li.MuiMenuItem-root': {
            color: string;
        };
    };
    MenuItemNameBold: {
        fontWeight: number;
        fontSize: string;
    };
    searchItemElement: {
        flexDirection: string;
        justifyContent: string;
        display: string;
        width: string;
        transition: string;
        overflow: string;
        position: string;
        zIndex: string;
    };
    searchUser: {
        display: string;
        alignItems: string;
        flexDirection: string;
        paddingTop: string;
        '> svg': {
            width: string;
            height: string;
        };
    };
    searchUserNameLabel: {
        marginLeft: string;
        fontWeight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    ellipsisWithTooltip: {
        textOverflow: string;
        overflow: string;
        display: string;
        whiteSpace: string;
        width: string;
    };
    searchItemUserStatus: {
        display: string;
        alignItems: string;
        flexDirection: string;
        paddingBottom: string;
        paddingTop: string;
        minHeight: string;
        width: string;
        height: number;
    };
    icon: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        marginLeft: string;
    };
    statusText: {
        marginLeft: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
        lineSpacing: number;
    };
    CrossIcon: {
        display: string;
        alignItems: string;
        justifyContent: string;
        cursor: string;
        padding: string;
        '& .MuiSvgIcon-root': {
            width: string;
            height: string;
        };
    };
    searchMembers: {
        padding: string;
        '> div': {
            paddingBottom: string;
            paddingTop: string;
            paddingLeft: string;
        };
        '.MuiInputBase-root': {
            padding: string;
        };
    };
    searchIcon: {
        paddingRight: number;
        marginRight: number;
        cursor: string;
    };
    addFavoriteIcon: {
        display: string;
        cursor: string;
        marginRight: string;
    };
    searchBoxforGroup: {
        marginLeft: string;
        '> .MuiAutocomplete-root': {
            paddingLeft: string;
            '> div': {
                paddingLeft: string;
                '> .MuiInputBase-root': {
                    padding: string;
                };
            };
        };
    };
    createGroupText: {
        padding: string;
    };
    AgentChatSelectedContact: {
        minHeight: string;
        maxHeight: string;
        overflowY: string;
    };
    AgentChatStatusIcon: {
        position: string;
        bottom: string;
        right: number;
        width: string;
        height: string;
        borderRadius: string;
    };
    AgentDisplayName: {
        width: string;
    };
    GroupSearchInput: {
        '&.MuiOutlinedInput-root': {
            paddingLeft: string;
        };
        '#search-input-for-group': {
            padding: string;
        };
    };
    GroupActivityText: {
        fontSize: string;
        fontWeight: number;
        color: string;
    };
    GroupActionContainer: {
        display: string;
        flexDirection: string;
        marginBottom: string;
    };
    GroupActionSummary: {
        display: string;
        alignItems: string;
        paddingLeft: string;
        paddingRight: string;
        width: string;
        gap: string;
        '& svg': {
            fontSize: string;
            color: string;
        };
        '& svg:first-of-type': {
            marginRight: string;
        };
    };
    GroupActionMembersList: {
        marginTop: string;
        marginLeft: string;
        maxWidth: string;
        display: string;
        gridTemplateColumns: string;
        rowGap: string;
        columnGap: string;
        color: string;
        fontSize: string;
    };
    ChatMessageContainer: {
        display: string;
        flexDirection: string;
        borderRadius: string;
        border: string;
        padding: string;
        marginBottom: string;
        boxSizing: string;
        cursor: string;
    };
};
export default ccfAgentChatStyles;
