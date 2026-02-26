/**
 * return styles used for the component
 * @example ccfAddChannelSearchStyles(theme)
 * @returns styles
 */
declare const ccfAddChannelSearchStyles: () => {
    searchInput: {
        marginBottom: string;
        '& .MuiInputBase-root': {
            paddingRight: number;
        };
        '& .MuiSvgIcon-root': {
            fontSize: string;
        };
        '& .MuiSelect-iconOutlined': {
            fontSize: string;
        };
    };
    channelMenuItem: {
        padding: string;
    };
    channelMenuItemBox: {
        display: string;
        flexDirection: string;
        alignItems: string;
    };
    channelMenuItemText: {
        fontSize: string;
        paddingLeft: string;
    };
    collapse: {
        width: string;
        padding: string;
    };
    numberInputChannels: {
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
};
export default ccfAddChannelSearchStyles;
