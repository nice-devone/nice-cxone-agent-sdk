import { Theme } from '@mui/material';
/**
 * style object for ccf-disposition
 * @returns CcfDispositionStyles styles object
 * ```
 * @example
 * <CcfDispositionStyles />
 * ```
 */
declare const CcfDispositionStyles: (theme: Theme, isDispositionVisible?: boolean, isSearchFocused?: boolean) => {
    dispositionWrapper: {
        [x: string]: string | number | {
            right: number;
            width?: undefined;
            padding?: undefined;
        } | {
            width: string;
            padding: string;
            right?: undefined;
        };
        bottom: number;
        visibility: string;
        width: string;
        height: string;
        minHeight: string;
        background: string;
        boxShadow: string;
        border: string;
        borderRadius: string;
        opacity: number;
        overflow: string;
        zIndex: number;
        maxHeight: string;
        marginLeft: string;
        position: string;
        padding: string;
    };
    dispositionsDetailsHeader: {
        [x: string]: string | number | {
            width: string;
        };
        display: string;
        alignItems: string;
        justifyContent: string;
        width: string;
        padding: string;
        height: string;
        background: string;
        minHeight: string;
        borderRadius: string;
        opacity: number;
        flexGrow: number;
    };
    dispositionsDetailsWrapper: {
        overflow: string;
        overflowX: string;
    };
    headerText: {
        [x: string]: string | number | {
            width: string;
        };
        top: string;
        left: string;
        width: string;
        height: string;
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        color: string;
        opacity: number;
        display: string;
        flexWrap: string;
    };
    textOutcomesName: {
        display: string;
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        color: string;
    };
    rotatedDoubleArrowIcon: {
        transform: string;
        transition: string;
    };
    displayAccordionDetails: {
        flexGrow: number;
        overflow: string;
        overflowX: string;
        cursor: string;
        marginBottom: string;
        maxHeight: string;
    };
    dispositionCardsAccordion: {
        width: string;
        minHeight: string;
        maxHeight: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
        letterSpacing: number;
        background: string;
        opacity: number;
    };
    textRequired: {
        paddingLeft: string;
        textAlign: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        opacity: number;
    };
    textForDispositionCards: {
        [x: string]: string | {
            width: string;
            margin: string;
        };
        display: string;
        flexDirection: string;
        maxWidth: string;
        width: string;
        height: string;
    };
    dispositionHeaderCards: {
        [x: string]: string | number | {
            marginRight: string;
        };
        display: string;
        flexDirection: string;
        justfyContent: string;
        height: string;
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        opacity: number;
    };
    dispositionHeaderCloseArrow: {
        display: string;
        flexDirection: string;
        justfyContent: string;
        height: string;
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        opacity: number;
    };
    dispositionHeaderIcon: {
        padding: string;
        width: string;
    };
    dispositionHeaderIconMD: {
        padding: string;
        width: string;
    };
    captionForDropdown: {
        top: string;
        left: string;
        paddingLeft: string;
        width: string;
        height: string;
        fontWeight: string;
        fontSize: number;
        letterSpacing: number;
        color: string | undefined;
        textTransform: string;
        opacity: number;
    };
    popOverFlow: {
        top: string;
        left: string;
        width: string;
        height: string;
    };
    accordionDetails: {
        display: string;
        flexDirection: string;
        padding: string;
        maxHeight: string;
    };
    dispositionTextarea: {
        marginBottom: string;
        width: string;
        height: string;
        'min-height': string;
        'max-height': string;
        background: string;
        border: string;
        borderRadius: string;
        opacity: number;
        outline: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        resize: string;
        'overflow-y': string;
        fontFamily: import("csstype").Property.FontFamily | undefined;
        lineHeight: string;
        fontWeight: number;
        '&::placeholder': {
            color: string;
        };
    };
    dispositionTextAreaCaseSeparation: {
        marginBottom: string;
        top: string;
        left: string;
        width: string;
        height: string;
        'min-height': string;
        'max-height': string;
        background: string;
        border: string;
        borderRadius: string;
        opacity: number;
        outline: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        resize: string;
        'overflow-y': string;
        fontFamily: import("csstype").Property.FontFamily | undefined;
        lineHeight: string;
        fontWeight: number;
        '&::placeholder': {
            color: string;
        };
    };
    digitalAutocompleteWrapper: {
        minHeight: string;
        marginTop: string;
        padding: string;
        maxHeight: string;
    };
    textAreaError: {
        top: string;
        left: string;
        width: string;
        height: string;
        background: string;
        border: string;
        borderRadius: string;
        opacity: number;
        paddingLeft: string;
        marginLeft: string;
        marginTop: string;
        marginBottom: string;
        outline: string;
    };
    divider: {
        height: string;
        borderRight: string;
        opacity: string;
        marginLeft: string;
    };
    markAsResolved: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        height: string;
        background: string;
        borderRadius: string;
        position: string;
        bottom: number;
        width: string;
    };
    markAsResolvedButton: {
        [x: string]: string | {
            marginRight: string;
        };
        width: string;
        height: string;
        background: string;
        boxShadow: string;
        borderRadius: string;
        justifyContent: string;
        marginRight: string;
    };
    markAsResolvedOutlinedButton: {
        [x: string]: string | {
            marginRight: string;
        };
        width: string;
        height: string;
        boxShadow: string;
        borderRadius: string;
        justifyContent: string;
        marginRight: string;
    };
    markAsResolvedText: {
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        opacity: number;
    };
    upArrowIcon: {
        fill: string;
        paddingTop: string;
        position: string;
    };
    dispositionCompleted: {
        width: string;
        height: string;
        margin: string;
        stroke: string;
    };
    dispositionPending: {
        width: string;
        height: string;
        margin: string;
        stroke: string;
    };
    arrowIconForDropdown: {
        color: string;
        position: string;
        pointerEvents: string;
        transform: string;
    };
    placeholderText: {
        textAlign: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        opacity: number;
    };
    requiredIconColor: {
        color: string;
    };
    customDropdown: {
        left: string;
        width: string;
        background: string;
        border: string;
        borderRadius: string;
        opacity: number;
        paddingLeft: string;
        marginLeft: string;
        paddingRight: number;
        marginTop: string;
        marginBottom: string;
        boxShadow: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        '&:invalid': {
            color: string;
        };
    };
    disabledButton: {
        [x: string]: string | {
            marginRight: string;
        };
        width: string;
        height: string;
        background: string;
        boxShadow: string;
        marginRight: string;
    };
    expandLessIcon: {
        marginLeft: string;
        marginRight: string;
    };
    dropdownOption: {
        textAlign: string;
        fontSize: number;
        letterSpacing: number;
        color: string;
        opacity: number;
        '&:hover': {
            background: string;
        };
    };
    textOverflow: {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    textForDispositionDetails: {
        top: number;
        left: number;
        height: string;
        lineHeight: string;
        margin: string;
        fontWeight: number;
        fontSize: number;
        letterSpacing: number;
        color: string;
        maxWidth: number;
        fontFamily: import("csstype").Property.FontFamily | undefined;
    };
    subTextForDispositionDetails: {
        top: number;
        left: number;
        height: number;
        margin: number;
        letterSpacing: number;
        maxWidth: number;
        width: string;
        fontSize: number;
        fontweight: number;
        color: string;
        lineHeight: string;
        fontFamily: import("csstype").Property.FontFamily | undefined;
    };
    autoCompleteWidth: {
        [x: string]: string | {
            width: string;
        };
        width: string;
        marginBottom: string;
    };
    autoCompleteValidationError: {
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: string;
            borderWidth: string;
        };
    };
    menuList: {
        height: string;
        maxHeight: string;
        paddingTop: number;
    };
    autoSummary: {
        height: string;
        width: string;
        background: string;
        position: string;
        zIndex: number;
    };
    digitalDispositionDownArrowIcon: {
        [x: string]: string | {
            marginRight: string;
        };
        width: string;
        height: string;
        margin: string;
    };
    autoCompleteLabel: {
        width: string;
        height: string;
        marginTop: string;
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        color: string;
    };
    outcomePanelLabels: {
        width: string;
        height: string;
        marginTop: string;
        marginBottom: string;
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        color: string;
    };
    outcomesMenuWrapper: {
        border: string;
        borderRadius: string;
        padding: string;
        width: string;
        background: string;
    };
    redialSkillSelectWrapper: {
        py: number;
        width: string;
        height: string;
        minHeight: string;
        marginBottom: string;
    };
    redialSkillFilter: {
        borderRadius: string;
        border: string;
        pt: number;
        '&:hover': {
            borderColor: string;
            borderWidth: string;
        };
    };
    redialNavIcon: {
        width: string;
        height: string;
        transform: string;
    };
    redialRadioGroupWrapper: {
        height: string;
        overflowY: string;
        mb: number;
        border: string;
        borderTop: string;
        borderRadius: string;
    };
    retryButton: {
        margin: string;
        padding: string;
        border: string;
        fontWeight: number;
        color: string;
    };
};
export default CcfDispositionStyles;
