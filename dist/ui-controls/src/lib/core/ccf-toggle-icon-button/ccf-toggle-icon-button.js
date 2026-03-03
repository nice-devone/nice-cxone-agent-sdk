import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@mui/material';
/**
 * Display toggle icon buttons
 * @param props - CCfToggleIconButtonProps
 * @example <CCfToggleIconButton />
 * @returns
 */
export function CCfToggleIconButton(props) {
    const { icon, toggleIcon, isToggled, onClick } = props, rest = __rest(props, ["icon", "toggleIcon", "isToggled", "onClick"]);
    /*
      NOTE: No need to maintain a new state within child component,
      child will render based on the props received.
      Whenever parent re-renders, child will re-render with a new
      set of props, hence with an updated state.
    */
    // const [toggle, updateToggle] = React.useState(isToggled);
    /**
     * Function to handle when toggle icon button click
     * @param e - React.MouseEvent,
     * @example onToggleIconButtonClick(e)
     */
    function onToggleIconButtonClick(e) {
        e.stopPropagation();
        onClick && onClick();
        // Please refer the NOTE at the top
        // updateToggle(!toggle);
        // if(onClick) onClick();
    }
    return (_jsx(IconButton, Object.assign({ onClick: e => onToggleIconButtonClick(e), size: "large", "data-testid": 'toggle-icon-buttons' }, rest, { children: isToggled ? icon : toggleIcon })));
}
export default CCfToggleIconButton;
//# sourceMappingURL=ccf-toggle-icon-button.js.map