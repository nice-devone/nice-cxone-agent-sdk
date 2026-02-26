import { Direction, Theme } from '@mui/material';
export declare const styleMap: {
    FontAndaleMono: {
        fontFamily: string;
    };
    FontArial: {
        fontFamily: string;
    };
    FontArialBlack: {
        fontFamily: string;
    };
    FontBookAntiqua: {
        fontFamily: string;
    };
    FontComicSansMS: {
        fontFamily: string;
    };
    FontCourierNew: {
        fontFamily: string;
    };
    FontGeorgia: {
        fontFamily: string;
    };
    FontHelvetica: {
        fontFamily: string;
    };
    FontImpact: {
        fontFamily: string;
    };
    FontMalgunGothic: {
        fontFamily: string;
    };
    FontTahoma: {
        fontFamily: string;
    };
    FontTerminal: {
        fontFamily: string;
    };
    FontTimesNewRoman: {
        fontFamily: string;
    };
    FontTrebuchetMs: {
        fontFamily: string;
    };
    FontVerdana: {
        fontFamily: string;
    };
    txtExlarge: {
        fontSize: string;
    };
    txtLarge: {
        fontSize: string;
    };
    txtRegular: {
        fontSize: string;
    };
    txtSmall: {
        fontSize: string;
    };
    txtExsmall: {
        fontSize: string;
    };
    LTR: {
        direction: Direction;
    };
    RTL: {
        direction: Direction;
    };
};
export declare const RICH_TEXT_INPUT_STYLES: {
    BOLD: string;
    ITALIC: string;
    UNDERLINE: string;
    ORDERED_LIST: string;
    UNORDERED_LIST: string;
    LEFT_ALIGN: string;
    RIGHT_ALIGN: string;
    CENTER_ALIGN: string;
    MONOSPACE: string;
    RTL: string;
    LTR: string;
};
declare const ccfEditorStyles: (theme: Theme, wysiwygEnabled: boolean) => {
    editor: {
        minHeight: string;
        maxHeight: string;
        width: string;
        background: string;
        display: string;
        opacity: string;
        borderRadius: string;
        overflowY: string;
        margin: string | false;
        padding: string;
        wordBreak: string;
        fontSize: string;
    };
    editorFocus: {
        border: string;
    };
    editorEmail: {
        maxHeight: string;
        background: string;
    };
    outboundEmailEditor: {
        minHeight: string;
        background: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        '@media only screen and (max-width: 1200px)': {
            minHeight: string;
        };
        position: string;
        zIndex: string;
    };
    toolbar: {
        display: string;
        width: string;
        borderBottom: string;
    };
    button: {
        color: string;
        minWidth: string;
        '&:hover': {
            backgroundColor: string;
        };
        padding: number;
    };
    buttonActive: {
        background: string | undefined;
        marginRight: string;
    };
    replying: {
        margin: string;
        font: string;
        letterSpacing: string;
        color: string;
        borderTop: string;
    };
    wrapper: {
        font: string;
        color: string;
        'text-align': string;
        'letter-spacing': string;
        display: string;
        padding: string;
        paddingLeft: string;
    };
    styleLabel: {
        font: string;
        color: string;
        'text-align': string;
        'align-items': string;
        letterSpacing: string;
        display: string;
    };
    headerContainer: {
        background: string;
        border: string;
        borderRadius: string;
        opacity: number;
        height: string;
    };
    btnContainer: {
        'min-width': string;
        padding: number;
    };
    toolbox: {
        display: string;
        borderBottom: string;
    };
    box: {
        borderTop: number;
        borderColor: string;
        display: string;
        justifyContent: string;
        flexWrap: string;
        backgroundColor: string;
    };
    buttonBottom: {
        bottom: string;
        width: string;
        position: string;
    };
    rightSideBox: {
        justifyContent: string;
        flexWrap: string;
        marginTop: string;
        marginBottom: string;
    };
    leftSideBox: {
        justifyContent: string;
        backgroundColor: string;
        margin: string;
    };
    toolboxContainer: {
        padding: string;
    };
    floatRight: {
        float: string;
    };
    discard: {
        opacity: string;
        borderRadius: string;
        border: string;
        boxShadow: string;
        padding: string;
        float: string;
        color: string;
        margin: string;
    };
    toContainer: {
        width: string;
        display: string;
        borderBottom: string;
        height: string;
        borderTop: string;
    };
    toLabel: {
        width: string;
    };
    bccContainer: {
        font: string;
        color: string;
        margin: string;
        'font-weight': number;
    };
    wrapperWithBorder: {
        font: string;
        color: string;
        'text-align': string;
        'letter-spacing': string;
        display: string;
        borderBottom: string;
        padding: string;
        paddingLeft: string;
    };
    ccBox: {
        padding: string;
        cursor: string;
    };
    bccBox: {
        padding: string;
        cursor: string;
    };
    linked: {
        color: string;
        textDecoration: string;
        cursor: string;
    };
    linkBox: {
        width: string;
        backgroundColor: string;
        marginTop: string;
    };
    btnCheck: {
        verticalAlign: string;
    };
    cancelButton: {
        margin: string;
        float: string;
        fontSize: string;
        lineHeight: string;
        letterSpacing: string;
    };
    editorBox: {
        width: string;
        justifyContent: string;
        display: string;
        flexDirection: string;
        alignItems: string;
    };
    toolTipWidth: {
        width: string;
    };
    customerNameDisplay: {
        display: string;
        paddingRight: string;
        width: string;
        paddingLeft: string;
    };
    dragNDrop: {
        flex: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        padding: string;
        borderWidth: string;
        borderRadius: string;
        borderColor: string;
        borderStyle: string;
        outline: string;
        transition: string;
        minHeight: string;
        maxHeight: string;
        background: string;
    };
    emailResponseWrapper: {
        display: string;
        flexDirection: string;
        overflowY: string;
    };
    publicReplyToBanner: {
        border: string;
        borderWidth: string;
        borderRadius: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        width: string;
        padding: string;
        background: string;
        marginLeft: string;
    };
    publicReplyToBannerText: {
        fontSize: string;
        color: string;
    };
    publicReplyToBannerContainer: {
        display: string;
        alignItems: string;
    };
    line: {
        margin: string;
        border: string;
    };
    responseDiv: {
        padding: string;
        border: string;
        borderRadius: string;
        borderColor: string;
        display: string;
        alignItems: string;
        width: string;
        columnGap: string;
    };
    responseText: {
        fontSize: string;
        lineHeight: string;
        color: string;
        fontWeight: string;
    };
    responseIcons: {
        display: string;
        marginLeft: string;
        columnGap: string;
    };
    icons: {
        '&:hover svg path': {
            fill: string;
        };
    };
    nbrHoverStyle: {
        backgroundColor: string;
        borderRadius: string;
        '&:hover': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&:hover p, &:hover span, &:hover div': {
            color: string;
        };
        '&:hover svg path': {
            fill: string;
        };
        '&:hover div': {
            backgroundColor: string;
        };
    };
    nullHover: {
        '&:hover': {
            background: string;
        };
    };
    nbrStyle: {
        backgroundColor: string;
    };
    sparklesIcon: {
        display: string;
        marginLeft: string;
        flexDirection: string;
    };
    timeStampTooltipArrow: {
        color: string;
    };
    timeStampTooltip: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
    };
};
export default ccfEditorStyles;
