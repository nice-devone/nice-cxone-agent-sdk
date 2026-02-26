/**
 * return styles used for the component
 * @example ccfAddChannelSearchStyles(theme)
 * @returns styles
 */
const ccfAddChannelSearchStyles = () => {
    return {
        searchInput: {
            marginBottom: '0.75rem',
            '& .MuiInputBase-root': {
                paddingRight: 0,
            },
            '& .MuiSvgIcon-root': {
                fontSize: '0.9rem',
            },
            '& .MuiSelect-iconOutlined': {
                fontSize: '1.5rem',
            },
        },
        channelMenuItem: {
            padding: '0.5rem',
        },
        channelMenuItemBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        channelMenuItemText: {
            fontSize: '0.75rem',
            paddingLeft: '0.75rem',
        },
        collapse: {
            width: '100%',
            padding: '0.313rem 0',
        },
        numberInputChannels: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    };
};
export default ccfAddChannelSearchStyles;
//# sourceMappingURL=ccf-add-channel-search.styles.js.map