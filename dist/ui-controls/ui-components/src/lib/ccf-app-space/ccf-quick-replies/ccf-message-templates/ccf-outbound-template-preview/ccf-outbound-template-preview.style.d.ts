import { Theme } from '@mui/material';
/**
 * CcfOutboundTemplatePreviewStyle - used to display outbound template preview styles
 * @param props -?-CcfOutboundTemplatePreviewStyle
 * @example <CcfOutboundTemplatePreviewStyle />
 */
declare const CcfOutboundTemplatePreviewStyle: (theme: Theme) => {
    templateWrapper: {
        flexDirection: string;
        height: string;
        display: string;
        paddingTop: string;
    };
    bodySection: {
        padding: string;
        flexGrow: number;
        /**
          * Card container height is adjusted by minus size of template preview section which is total of 120 pixels
         */
        maxHeight: string;
        overflowY: string;
    };
    messageTemplate: {
        display: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
        textTransform: string;
        color: string;
        letterSpacing: number;
    };
    templateHeading: {
        fontWeight: number;
        background: string;
        minHeight: string;
        lineHeight: string;
        padding: string;
        fontSize: string;
    };
    payloadStyle: {
        fontSize: string;
        lineHeight: string;
    };
    templateVariable: {
        color: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
        textTransform: string;
    };
    navigateBackButton: {
        minWidth: string;
        color: string;
        padding: string;
    };
    backSection: {
        display: string;
        padding: string;
        width: string;
        cursor: string;
    };
    breadcrumbLabel: {
        letterSpacing: number;
        color: string | undefined;
        fontSize: string;
        fontWeight: string;
    };
    backIcon: {
        fontSize: string;
    };
    templateBox: {
        marginTop: string;
    };
    variableEditor: {
        marginTop: string;
    };
    sendButton: {
        width: string;
        justifyContent: string;
        button: {
            margin: string;
            boxShadow: string;
            cursor: string;
            ':hover': {
                boxShadow: string;
            };
        };
    };
    editableVarFieldContainer: {
        display: string;
        flexDirection: string;
        width: string;
        margin: string;
        maxWidth: string;
        input: {
            [x: string]: string | {
                fontsize: string;
            };
            padding: string;
            width: string;
            fontSize: string;
            textOverflow: string;
        };
        '.MuiOutlinedInput-notchedOutline': {
            borderTop: number;
            borderLeft: number;
            borderRight: number;
            borderRadius: number;
            borderColor: string;
        };
    };
    replyContentBody: {
        [x: string]: string | number | {
            display: string;
            margin: string;
            position: string;
            bottom: string;
            fontSize?: undefined;
        } | {
            fontSize: string;
            display?: undefined;
            margin?: undefined;
            position?: undefined;
            bottom?: undefined;
        };
        letterSpacing: number;
        color: string;
        fontSize: string;
        display: string;
        borderBottom: string;
        paddingBottom: string;
        '.placeholder': {
            display: string;
            margin: string;
            position: string;
            bottom: string;
        };
    };
    multimediaControls: {
        width: string;
        maxHeight: string;
        objectFit: string;
        display: string;
        borderRadius: string;
    };
    mediaContainer: {
        marginBottom: string;
    };
};
export default CcfOutboundTemplatePreviewStyle;
