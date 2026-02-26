import { Theme } from '@mui/material';
/**
 * style object for ccf-agent-skills
 * @returns CcfAgentSkillsStyle object
 * @example CcfAgentSkillsStyle()
 */
declare const CcfAgentSkillsStyle: (theme: Theme) => {
    filterIcon: {
        width: string;
        color: string;
        cursor: string;
        paddingTop: string;
    };
    focusedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    filtersText: {
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: number;
    };
    selectedTxt: {
        width: string;
        '.MuiInputBase-input': {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
    };
    applyBtn: {
        boxShadow: string;
        height: string;
    };
    secondaryButton: {
        marginRight: string;
        boxShadow: string;
        color: string;
        height: string;
    };
    boxBtn: {
        padding: string;
        width: string;
        display: string;
        justifyItems: string;
        justifyContent: string;
    };
    boxDropdown: {
        margin: string;
        fontSize: string;
        fontWeight: string;
        marginLeft: string;
        marginTop: string;
    };
    selectedMenuItem: {
        '&:hover': {
            backgroundColor: string;
        };
        '&.Mui-selected': {
            backgroundColor: string;
            '&:hover': {
                backgroundColor: string | undefined;
            };
        };
        '&.Mui-focusVisible, &:focus': {
            outline: string;
            border: string;
            borderRadius: string;
        };
    };
    contentDiv: {
        display: string;
        justifyContent: string;
        margin: string;
        marginLeft: string;
        marginTop: string;
    };
    tableStyle: {
        width: string;
        tableLayout: string;
    };
    tableHeadRow: {
        'td,th': {
            color: string;
            fontWeight: number;
            textAlign: string;
            padding: string;
            fontSize: string;
            background: string;
        };
        borderBottom: string;
        borderBottomColor: string;
    };
    tableBodyRow: {
        'td, th': {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            fontWeight: string;
            textAlign: string;
        };
    };
    iconHeaderClasses: {
        marginLeft: string;
        color: string;
        fontWeight: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    helperText: {
        textTransform: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: string;
        marginBottom: string;
    };
    closeIcon: {
        cursor: string;
        color: string;
    };
    closebutton: {
        boxShadow: string;
    };
    infoIcon: {
        padding: string;
    };
    tooltip: {
        backgroundColor: string;
        color: string | undefined;
        boxShadow: string;
    };
    skillsTooltipArrow: {
        color: string;
    };
    chipStyle: {
        width: string;
        fontSize: string;
        border: string;
        '&.MuiButtonBase-root': {
            marginLeft: string;
            marginBottom: string;
        };
        '&.Mui-focusVisible': {
            border: string;
        };
    };
    noSkillsFound: {
        marginTop: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        color: string;
        fontWeight: string;
    };
    btnText: {
        fontSize: string;
        fontWeight: string;
    };
};
export default CcfAgentSkillsStyle;
