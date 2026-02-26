import { Theme } from '@mui/material';
/**
 * CcfCaseCustomField - used to display quick replies component
 * @param props -?-CaseCustomFields
 * @example <CaseCustomFields />
 */
declare const CaseCustomFields: (theme: Theme) => {
    root: {
        '& .MuiTextField-root': {
            width: string;
        };
    };
    modifyCustomFieldIcons: {
        height: string;
        width: string;
        color: string;
    };
    iconPadding: {
        padding: number;
        marginLeft: string;
        marginBottom: string;
        float: string;
    };
    inputLabel: {
        color: string;
        fontSize: string;
        fontWeight: string;
    };
    inputFields: {
        height: string;
        fontSize: string;
        color: string;
    };
    dropdownFields: {
        height: string;
        fontSize: string;
        color: string;
    };
    paddingAll: {
        padding: string;
    };
    toastColor: {
        backgroundColor: string;
    };
    errorMessage: {
        textAlign: string;
        color: string;
        padding: string;
        fontWeight: string;
    };
    dropdownItems: {
        fontSize: string;
        paddingTop: string;
        paddingBottom: string;
    };
    savedInputFields: {
        '& .MuiOutlinedInput-root': {
            padding: number;
            border: string;
        };
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: string;
            color: string;
        };
    };
    readOnlyTextField: {
        display: string;
        padding: string;
        border: string;
        borderRadius: string;
        width: string;
        textDecoration: string;
        overflow: string;
        textOverflow: string;
        a: {
            textDecoration: string;
            color: string;
        };
    };
    urlFieldTooltip: {
        maxWidth: string;
        fontSize: string;
        lineHeight: string;
        whiteSpace: string;
        overflow: string;
        textOverflow: string;
    };
    gridLabelItem: {
        display: string;
    };
};
export default CaseCustomFields;
