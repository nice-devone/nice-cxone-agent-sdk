import { Theme } from '@mui/material';
import { SLAIndicatorType } from '@nice-devone/common-sdk';
/**
 * style object for ccf-interaction component
 * @example - styles = new ccfInteractionStyle(theme)
 */
declare const ccfInteractionStyle: (theme: Theme, isSelectedInteraction?: boolean, slaWarning?: SLAIndicatorType, viewOnlyCase?: boolean) => {
    inactiveCardCollapsed: {
        width: string;
        height: string;
        marginBottom: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
        border: string;
        backgroundColor: string;
        '[dir=\'rtl\'] &': {
            marginLeft: string;
            borderRight: string;
        };
        '[dir=\'ltr\'] &': {
            borderLeft: string;
        };
    };
    activeCardCollapsed: {
        width: string;
        height: string;
        marginBottom: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
        backgroundColor: string;
        borderTop: string;
        borderBottom: string;
        background: string;
        boxShadow: string;
        border: string;
        borderRadius: string;
        opacity: string;
        '[dir=\'rtl\'] &': {
            marginRight: string;
            borderRight: string;
        };
        '[dir=\'ltr\'] &': {
            borderLeft: string;
        };
        callStatusWrapper: {
            paddingTop: string;
        };
    };
    active: {
        backgroundColor: string;
        borderTop: string;
        borderBottom: string;
        marginBottom: string;
        boxShadow: string;
        color: string;
        '[dir=\'ltr\'] &': {
            borderLeft: string;
            borderTopRightRadius: string;
            borderBottomRightRadius: string;
            marginLeft: string;
        };
        '[dir=\'rtl\'] &': {
            borderRight: string;
            borderTopLeftRadius: string;
            borderBottomLeftRadius: string;
            marginRight: string;
        };
    };
    inactive: {
        boxShadow: string;
        borderRadius: string;
        marginBottom: string;
        '[dir=\'rtl\'] &': {
            marginLeft: string;
            marginRight: string;
            borderRight: string;
        };
        '[dir=\'ltr\'] &': {
            marginLeft: string;
            marginRight: string;
            borderLeft: string;
        };
    };
    smallViewInactive: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        borderRadius: string;
        marginBottom: string;
        '[dir=\'rtl\'] &': {
            marginLeft: string;
            marginRight: string;
        };
        '[dir=\'ltr\'] &': {
            marginLeft: string;
            marginRight: string;
        };
    };
    smallViewPcInactive: {
        display: string;
        flexDirection: string;
        flexWrap: string;
        justifyContent: string;
        backgroundColor: string;
        alignItems: string;
        boxShadow: string;
        borderRadius: string;
        marginBottom: string;
        '[dir=\'rtl\'] &': {
            marginLeft: string;
            marginRight: string;
        };
        '[dir=\'ltr\'] &': {
            marginLeft: string;
            marginRight: string;
        };
    };
    collapsedIcon: {
        marginLeft: string;
    };
    expandedIcon: {
        marginLeft: string;
    };
    mediaIcon: {
        fill: string;
        width: string;
        height: string;
        verticalAlign: string;
    };
    rightImage: {
        fontSize: string;
        display: string;
        marginLeft: string;
        color: string;
    };
    digitalRightImage: {
        fontSize: string;
        display: string;
    };
    requiredDisposition: {
        stroke: string;
    };
    optionalDisposition: {
        stroke: string;
    };
    cardHeader: {
        display: string;
        flexDirection: string;
    };
    cardHeaderVoiceMail: {
        display: string;
        flexDirection: string;
    };
    skillOrQueueToolTip: {
        textOverflow: string;
        overflow: string;
        marginTop: string;
    };
    directionIcon: {
        marginLeft: string;
        marginRight: string;
    };
    textReject: {
        textAlign: string;
        font: string;
        letterSpacing: string;
        color: string;
        verticalAlign: string;
        paddingLeft: string;
        paddingTop: string;
        animation: string;
    };
    cardDivider: {
        backgroundColor: string;
        height: string;
        marginTop: string;
    };
    customerName: {
        font: string;
        display: string;
        padding: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    timer: {
        font: string;
        padding: string;
    };
    activeTimer: {
        font: string;
        padding: string;
    };
    channelDetail2: {
        font: string;
        color: string;
        padding: string;
        letterSpacing: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    notificationBadge: {
        '& .MuiBadge-badge': {
            backgroundColor: string;
            height: string;
            minWidth: string;
            borderRadius: string;
            border: string;
            top: string;
            right: string;
        };
    };
    smallViewChannelDetail2: {
        font: string;
        color: string;
        padding: string;
        letterSpacing: string;
    };
    phoneNumber: {
        font: string;
        margin: string;
        padding: string;
        letterSpacing: string;
    };
    hungUpText: {
        textAlign: string;
        font: string;
        letterSpacing: string;
        color: string;
        verticalAlign: string;
        paddingRight: string;
        paddingBottom: string;
    };
    hungUpIcon: {
        fontSize: string;
        fill: string;
        paddingTop: string;
        paddingLeft: string;
        textAlign: string;
    };
    rejectIcon: {
        fontSize: string;
        fill: string;
        paddingLeft: string;
        paddingBottom: string;
        animation: string;
    };
    hungUpBorder: {
        height: string;
        '[dir=\'rtl\'] &': {
            borderRight: string;
            borderRadius: string;
        };
        '[dir=\'ltr\'] &': {
            borderLeft: string;
            borderRadius: string;
        };
    };
    sectionTop: {
        display: string;
        justifyContent: string;
    };
    cardLeft: {
        width: string;
        padding: string;
        display: string;
        flexDirection: string;
        minWidth: string;
    };
    cardLeftActive: {
        width: string;
    };
    cardRight: {
        display: string;
        flexDirection: string;
        alignItems: string;
        width: string;
        padding: string;
        justifyContent: string;
    };
    digitalCollapsedTimer: {
        paddingTop: string;
    };
    '.MuiButtonBase-root.MuiButton-root.MuiButton-contained': {
        borderRadius: string;
        textTransform: string;
        fontSize: string;
    };
    carControlPanelContainer: {
        margin: string;
    };
    buttonControls: {
        margin: string;
        padding: string;
    };
    skillQueueNameContainer: {
        font: string;
        color: string;
        padding: string;
        letterSpacing: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    newBox: {
        display: string;
        justifyContent: string;
    };
    boxReject: {
        height: string;
        width: string;
        borderLeft: string;
        borderRadius: string;
        padding: string;
        textAlign: string;
        fontWeight: string;
        backgroundColor: string;
        position: string;
        animation: string;
    };
    hungUpContainer: {
        width: string;
        height: string;
        justifyContent: string;
        alignItems: string;
        boxShadow: string;
        backgroundColor: string;
        position: string;
        animation: string;
        padding: string;
        borderRadius: string;
        marginBottom: string;
    };
    hungUpClass: {
        height: string;
        transition: string;
    };
    hungUpAnimation: {
        marginRight: string;
        marginLeft: string;
        backgroundColor: string;
    };
    animate: {
        animation: string;
    };
    globeIconWrapper: {
        width: string;
        height: string;
        position: string;
        borderTopLeftRadius: string;
        zIndex: string;
    };
    expandedGlobeIconWrapper: {
        borderTop: string;
        borderRight: string;
        marginLeft: string;
    };
    collapsedGlobeIconWrapper: {
        borderTop: string;
        borderRight: string;
        marginLeft: string;
    };
    globeIconCollapsed: {
        transform: string;
        position: string;
    };
    globeIconExpanded: {
        transform: string;
        position: string;
    };
    collapsedViewImage: {
        verticalAlign: string;
        fontSize: string;
        marginLeft: string;
    };
    collapsedViewImage_RingingIcon: {
        color: string;
        verticalAlign: string;
        fontSize: string;
    };
};
export default ccfInteractionStyle;
