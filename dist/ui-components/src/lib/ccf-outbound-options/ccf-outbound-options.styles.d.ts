import { Theme } from '@mui/material';
/**
 * @example styles for CcfOutboundOptions component
 */
declare const CcfOutboundOptionsStyle: (theme: Theme, IBcall: boolean, elevationPopover?: boolean) => {
    hoverPopUpCallBtnMargin: {
        marginLeft: string;
    };
    skillSelect: {
        height: string;
        borderRadius: string;
        marginRight: number;
        flex: number;
        background: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        overflow: string;
    };
    text: {
        display: string;
        width: string;
        height: string;
        margin: string;
        color: string;
    };
    liner: {
        border: string;
        display: string;
        width: string;
        margin: string;
    };
    outboundOption: {
        display: string;
        flexDirection: string;
        padding: string;
        alignItems: string;
        justifyContent: string;
        '&:hover': {
            backgroundColor: string;
            cursor: string;
        };
    };
    noTriggerButton: {
        '&:hover': {
            cursor: string;
        };
    };
    disabledButton: {
        opacity: number;
        pointerEvents: string;
    };
    textContainer: {
        display: string;
        width: string;
    };
    outboundOptionIcon: {
        padding: string;
    };
    outboundOptionText: {
        padding: string;
    };
    customOutboundOptionText: {
        padding: string;
        paddingLeft: string;
    };
    flexDisplay: {
        display: string;
        alignItems: string;
        justifyContent: string;
        alignSelf: string;
        width: string;
    };
    menuItemTooltip: {
        overflow: string;
        textOverflow: string;
        textWrap: string;
    };
};
export default CcfOutboundOptionsStyle;
