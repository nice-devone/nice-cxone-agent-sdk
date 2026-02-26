import { Theme } from '@mui/material';
/**
 * style object for ccf-app-space
 * @returns CcfAppSpaceStyles styles object
 * ```
 * @example
 * <CcfAppSpaceStyles />
 * ```
 */
declare const CcfAppSpaceStyles: (theme: Theme) => {
    appSpaceHeader: {
        background: string;
        boxShadow: string;
        borderRadius: string;
        height: string;
        '& label': {
            color: string;
            paddingLeft: string;
        };
    };
    divider: {
        marginTop: string;
        marginBottom: string;
        borderRightWidth: number;
        borderColor: string;
    };
    tabsContainer: {
        height: string;
        minHeight: string;
        background: string;
        boxShadow: string;
        ':focus, :focus-visible': {
            border: string;
        };
        '.Mui-selected': {
            color: string;
            '.conversationIcon': {
                stroke: string;
            };
        };
        '.MuiTabs-indicator': {
            display: string;
        };
    };
    activeTabIndicator: {
        backgroundColor: string;
    };
    appSpaceCard: {
        width: string;
        margin: string;
        background: string;
        boxShadow: string;
        border: string;
        borderRadius: string;
        opacity: string;
        transition: string;
    };
    tab: {
        height: string;
        minWidth: string;
        color: string;
        minHeight: string;
        padding: string;
    };
    hamburger: {
        '& .MuiDrawer-paper': {
            width: string;
            backgroundColor: string;
        };
    };
    hamburgerContainer: {
        '&::-webkit-scrollbar': {
            width: string;
        };
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: string;
            borderRadius: string;
        };
        '&::-webkit-scrollbar-track': {
            backgroundColor: string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: string;
        };
        width: string;
    };
    contactDetails: {
        overflowY: string;
        maxHeight: string;
        margin: string;
        '&::-webkit-scrollbar': {
            display: string;
            height: string;
        };
        '@media only screen and (min-height: 650px) and (max-height: 667px)': {
            maxHeight: string;
        };
        '@media only screen and (min-height: 668px) and (max-height: 768px)': {
            maxHeight: string;
        };
        '@media only screen and (min-height: 769px) and (max-height: 860px)': {
            maxHeight: string;
        };
        '@media only screen and (min-height: 861px) and (max-height:959px)': {
            maxHeight: string;
        };
        '@media only screen and (min-height: 960px)': {
            maxHeight: string;
        };
    };
    tabContentSection: {
        height: string;
    };
    tabicon: {
        marginTop: string;
    };
    customerCardIcon: {
        width: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    selectedTab: {
        borderBottom: string;
    };
    conversationsStyle: {
        position: string;
        top: number;
        right: number;
        width: string;
        height: string;
        backgroundColor: string;
        borderRadius: string;
    };
};
export default CcfAppSpaceStyles;
