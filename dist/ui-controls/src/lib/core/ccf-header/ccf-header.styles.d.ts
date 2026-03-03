import { Theme } from '@mui/material';
/**
 * @example styles for CcfHeader component
 */
declare const ccfHeaderStyle: (theme: Theme, direction?: string, LeftIcon?: React.ReactElement) => {
    popOver: {
        marginRight: string;
    };
    container: {
        display: string;
        width: string;
        justifyContent: string;
        alignItems: string;
        marginBottom: string;
        '& > div': {
            display: string;
            alignItems: string;
            width: string;
            marginLeft: string;
            marginTop: string;
        };
    };
    headerTabBackground: {
        background: string;
        borderBottom: string;
        borderRadius: string;
        paddingLeft: string;
    };
    dragIndicator: {
        color: string;
    };
    popOverOverflow: {
        padding: string;
        height: string;
        width: string;
        fill: string;
        cursor: string;
    };
    minimizePanelLabel: {
        font: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        marginTop: string;
        textAlign: string;
    };
    browserLabel: {
        font: string;
        letterSpacing: string;
        color: string;
        opacity: string;
        marginTop: string;
        textAlign: string;
    };
    browserWindowIcon: {
        width: string;
        height: string;
        color: string;
        opacity: string;
    };
    minimizePanelIcon: {
        width: string;
        height: string;
        color: string;
        opacity: string;
    };
    menu: {
        '& .MuiMenu-paper': {
            width: string;
            height: string;
            background: string;
            boxShadow: string;
            borderRadius: string;
            opacity: string;
            overflowY: string;
            marginLeft: string | false;
            marginTop: string;
        };
    };
    menuItem: {
        padding: string;
        '&:first': {
            marginTop: string;
        };
    };
    popOverDismissButton: {
        '& .MuiIconButton-sizeSmall': {
            position: string;
            top: string;
            right: string;
        };
    };
    popOverDismissButtonIcon: {
        fontSize: string;
    };
    headerTitle: {
        fontStyle: string;
        fontVariant: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
        color: string;
        marginLeft: string;
        letterSpacing: string;
    };
    contentWrap: {
        wordBreak: string;
        overflow: string;
        textOverflow: string;
        display: string;
        '-webkit-line-clamp': number;
        '-webkit-box-orient': string;
        whiteSpace: string;
    };
};
export default ccfHeaderStyle;
