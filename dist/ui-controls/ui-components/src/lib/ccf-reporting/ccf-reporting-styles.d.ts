import { Theme } from '@mui/material';
/**
 * style object for ccf-reporting
 * @returns CcfReportingStyles styles object
 * ```
 * @example
 * <CcfReportingStyles />
 * ```
 */
declare const CcfReportingStyles: (theme: Theme) => {
    reportingBox: {
        height: string;
        width: string;
    };
    headerStyle: {
        display: string;
        flexDirection: string;
        background: string;
        boxShadow: string;
        borderRadius: string;
        height: string;
        label: {
            color: string;
            marginLeft: string;
        };
    };
    tabContainerStyle: {
        '& .MuiTab-root': {
            fontWeight: string;
        };
    };
    tabContentSection: {
        display: string;
        flexDirection: string;
        height: string;
        minHeight: string;
        paddingTop: string;
        '.Mui-selected': {
            color: (theme: Theme) => string;
        };
        'MuiTabs-indicator': {
            backgroundColor: (theme: Theme) => string;
        };
    };
    productivityWrapper: {
        justifyContent: string;
        flexWrap: string;
        display: string;
        paddingBottom: string;
        margin: string;
        'button.MuiToggleButton-root': {
            [x: string]: string | {
                padding: string;
                backgroundColor?: undefined;
            } | {
                backgroundColor: string | undefined;
                padding?: undefined;
            };
            borderRadius: string;
            padding: string;
            width: string;
            ':hover': {
                backgroundColor: string | undefined;
            };
        };
        'button.MuiToggleButton-root.Mui-selected': {
            color: string;
            backgroundColor: string | undefined;
        };
        '.MuiToggleButtonGroup-root': {
            [x: string]: string | {
                width: string;
            };
            height: string;
        };
    };
    productivityheader: {
        display: string;
        alignItems: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        height: string;
    };
    btn: {
        background: string;
        borderRight: string;
        boxShadow: string;
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        '&.MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
            color: string;
            borderRight: string;
            boxShadow: string;
            borderBottom: string;
            backgroundColor: string;
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
            fontWeight: import("csstype").Property.FontWeight | undefined;
        };
        '&.MuiButtonBase-root.MuiToggleButton-root:focus-visible, &.MuiButtonBase-root.MuiToggleButton-root:focus': {
            border: string;
            borderRadius: string;
        };
    };
    calenderBlock: {
        paddingBottom: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        margin: string;
    };
    dateLabel: {
        marginRight: string;
    };
};
export default CcfReportingStyles;
