import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccf-directory/>
 * @returns styles
 */
export declare const settingsStyles: (theme: Theme) => {
    settingsContainer: {
        display: string;
        flexDirection: string;
        overflowY: string;
        position: string;
        height: string;
        width: string;
        padding: string;
        borderRadius: string;
    };
    menuTab: {
        padding: string;
    };
    loginVoiceSettingsContainer: {
        [x: string]: string | {
            flexDirection: string;
        };
        display: string;
    };
    headsetContainer: {
        [x: string]: string | {
            paddingLeft: string;
        };
        display: string;
        flexDirection: string;
    };
    headsetHeader: {
        padding: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        fontWeight: import("csstype").Property.FontWeight | undefined;
    };
    headsetHeaderText: {
        padding: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        maxWidth: string;
    };
    noiseCancellationContainer: {
        maxWidth: string;
    };
    addDeviceSubHeader: {
        position: string;
        padding: string;
        lineHeight: string;
        color: string;
    };
    selectedDeviceSubHeader: {
        position: string;
        padding: string;
        lineHeight: string;
        maxWidth: string;
        color: string;
    };
    addDeviceText: {
        padding: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        maxWidth: string;
    };
    addDeviceButton: {
        margin: string;
        padding: string;
        fontWeight: import("csstype").Property.FontWeight | undefined;
        color: string;
        boxShadow: string;
    };
    selectedDeviceText: {
        padding: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
    selectionDropdown: {
        minWidth: string;
        '& .MuiSelect-select': {
            padding: string;
        };
        '& .MuiOutlinedInput-input': {
            lineHeight: string;
        };
    };
    menuItem: {
        border: string;
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
        };
    };
    focusedElement: {
        border: string;
        '&:focus': {
            border: string;
        };
    };
    volumeSlider: {
        '& .MuiSlider-thumb.Mui-focusVisible': {
            outline: string;
            outlineOffset: string;
        };
    };
};
export default settingsStyles;
