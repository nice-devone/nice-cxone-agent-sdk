import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <directoryStyles />
 * @returns styles
 */
declare const ccfCommitmentStyles: (theme: Theme) => {
    formWrapper: {
        width: string;
        height: string;
        '>button, >button:hover': {
            border: string;
            background: string;
            color: string | undefined;
            boxShadow: string;
            padding: string;
            justifyContent: string;
        };
    };
    formWrapperLargeView: {
        height: string;
        flexWrap: string;
    };
    titleContainer: {
        width: string;
    };
    formContainer: {
        width: string;
        padding: string;
        height: string;
        overflowY: string;
    };
    iconContainer: {
        display: string;
        alignItems: string;
        padding: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        button: {
            padding: string;
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            svg: {
                fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            };
        };
        '>h5': {
            padding: string;
        };
    };
    dividerStyles: {
        margin: string;
        width: string;
    };
    textFieldWrapper: {
        display: string;
        flexDirection: string;
        width: string;
    };
    formLabelBold: {
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        paddingBottom: string;
    };
    formLabel: {
        padding: string;
        span: {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            padding: string;
            input: {
                padding: string;
            };
        };
        label: {
            margin: string;
            '.MuiFormControlLabel-label': {
                padding: string;
            };
        };
    };
    formLabelBoldRequired: {
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        paddingBottom: string;
        '&::after': {
            content: string;
            color: string;
        };
    };
    labelFont: {
        paddingTop: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        color: string;
        '&::after': {
            content: string;
            color: string;
        };
    };
    datePicker: {
        '>div': {
            paddingRight: string;
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
        button: {
            paddingRight: string;
            marginLeft: string;
            '&:hover': {
                backgroundColor: string;
            };
        };
    };
    wrappperContainer: {
        padding: string;
    };
    contactStyles: {
        border: string;
        borderRadius: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        padding: string;
        textAlign: string;
        width: string;
        backgroundColor: string;
        height: string;
    };
    buttonWrapper: {
        padding: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        width: string;
        gap: string;
    };
    timeZoneStyles: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    selectOption: {
        maxWidth: string;
    };
    textStyles: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    textFieldStyles: {
        input: {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
    };
    textAreaStyles: {
        textarea: {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
    };
    contactTextFieldStyles: {
        width: string;
        input: {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
    };
    helperTextStyles: {
        margin: number;
    };
    menuItemStyle: {
        textOverflow: string;
        whiteSpace: string;
        overflow: string;
        display: string;
    };
    container: {
        display: string;
        gap: string;
    };
    commitmentDetailsWrapper: {
        background: string;
        height: string;
        width: string;
        display: string;
        flexDirection: string;
        gap: string;
        '& p': {
            margin: string;
            fontSize: string;
        };
        '& + Mui-Tooltip-arrow': {
            color: string;
            background: string;
        };
    };
    headingWrapper: {
        display: string;
        justifyContent: string;
    };
    tooltipArrow: {
        '& span.MuiTooltip-arrow': {
            color: string;
            '&::before': {
                border: string;
            };
        };
    };
    heading: {
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
    };
    commitmentTitle: {
        textDecoration: string;
        fontWeight: string;
        fontSize: string;
    };
    detail: {
        display: string;
        alignItems: string;
        gap: string;
    };
    icon: {
        color: string;
        height: string;
        width: string;
    };
    buttonWrapperTooltip: {
        display: string;
        justifyContent: string;
        marginRight: string;
        gap: string;
    };
    btn: {
        padding: string;
        '& p': {
            fontWeight: string;
            fontSize: string;
        };
    };
    textArea: {
        '& div.MuiInputBase-root': {
            padding: string;
            marginBottom: string;
            fontSize: string;
        };
    };
    circle: {
        height: string;
        width: string;
        background: string;
        borderRadius: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginTop: string;
        '&::before': {
            content: string;
            background: string;
            height: string;
            width: string;
            borderRadius: string;
        };
    };
    circleIEX: {
        height: string;
        width: string;
        background: string;
        borderRadius: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginTop: string;
        '&::before': {
            content: string;
            background: string;
            height: string;
            width: string;
            borderRadius: string;
        };
    };
    notesHelperTextStyles: {
        margin: string;
        marginBottom: string;
    };
    fcEventTitleContainer: {
        flexGrow: number;
        paddingRight: string;
        width: string;
        marginLeft: string;
    };
    fcEventTitle: {
        textTransform: string;
        textAlign: string;
        fontWeight: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        fontSize: string;
        paddingLeft: string;
        paddingRight: string;
    };
    fcSticky: {
        position: string;
    };
    fcEventMainFrame: {
        display: string;
        justifyContent: string;
        alignItems: string;
        height: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    fcEventMainFrameBorder: {
        height: string;
        position: string;
        margin: string;
        left: string;
        top: string;
    };
    commitmentNotes: {
        font: string;
        color: string;
        padding: string;
        paddingLeft: string;
        letterSpacing: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    commitmentControls: {
        display: string;
        gap: string;
        padding: string;
    };
    commitmentControlButton: {
        '>p': {
            fontSize: string;
        };
    };
    commitmentControlsSmallView: {
        gap: string;
        padding: string;
        marginLeft: string;
    };
    commitmentControlButtonSmallView: {
        [x: string]: string | {
            width: string;
        };
        width: string;
        height: string;
        margin: string;
    };
    deleteIconButton: {
        padding: string;
    };
    disabled: {
        backgroundColor: string;
    };
    tooltip: {
        '&.MuiTooltip-tooltip': {
            backgroundColor: string;
            color: string;
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            border: string;
        };
    };
    customerName: {
        font: string;
        display: string;
        padding: string;
        letterSpacing: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    cardHeader: {
        display: string;
        flexDirection: string;
    };
    channelDetail2: {
        display: string;
        flexDirection: string;
        font: string;
        color: string;
        padding: string;
        letterSpacing: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    skillOrQueueToolTip: {
        textOverflow: string;
        overflow: string;
        marginTop: string;
    };
    mediaIcon: {
        fill: string;
        width: string;
        height: string;
        verticalAlign: string;
        marginLeft: string;
        marginRight: string;
    };
    directionIcon: {
        marginLeft: string;
        marginRight: string;
    };
};
export default ccfCommitmentStyles;
