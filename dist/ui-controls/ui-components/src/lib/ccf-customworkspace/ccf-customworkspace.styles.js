import { Navigation } from '../../enums/navigation-menus';
/**
 * Styling for custom workspace iframe component
 * @returns custom workspace component CSS properties as a JSON object
 * @example customworkspaceStyles
*/
const customworkspaceStyles = (theme, selectedMenuAppSpace, selectedMenu) => {
    var _a, _b, _c, _d;
    const styles = {
        iframeContainer: {
            height: (selectedMenuAppSpace === Navigation.CUSTOMWORKSPACE && selectedMenu === Navigation.INTERACTION) ? 'calc(100% - 75px)' : '100%',
            width: '100%',
            border: `1px solid ${theme.palette.border.main}`,
            boxShadow: `0px 1px 3px ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.boxshadow) === null || _b === void 0 ? void 0 : _b.main}`,
            borderRadius: '6px',
            '.customworkspace-iframe': {
                border: `1px ${theme.palette.border.main}`,
                height: 'calc(100% - 54px)',
            },
            '.messageText': {
                fontSize: '1rem',
                fontWeight: '600',
                color: theme.palette.text.secondary,
                lineHeight: '1.5',
                padding: '10px',
            },
            '.link_text': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '.link': {
                marginRight: '4px',
                cursor: 'pointer',
                borderBottom: '1px solid gray',
            },
        },
        customWorkspaceHeader: {
            borderBottom: `1px solid ${theme.palette.border.main}`,
        },
        customDropdown: {
            m: 1,
            minWidth: 120,
            minHeight: 30,
            marginTop: 1,
            '.MuiSelect-select:focus': {
                backgroundColor: 'transparent',
            },
        },
        openinnewtabIcon: {
            marginRight: 2.5,
            marginTop: 0.7,
        },
        openinnewTabButton: {
            width: 5,
            border: '0.0625rem solid transparent',
            '&:focus': {
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
            },
        },
        openInNewWindowContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '120px 10px',
            padding: '10px',
            textAlign: 'center',
        },
        openInNewWindowIcon: {
            padding: '5px',
        },
        openInNewWindowContent: {
            padding: '5px',
        },
    };
    return styles;
};
export default customworkspaceStyles;
//# sourceMappingURL=ccf-customworkspace.styles.js.map