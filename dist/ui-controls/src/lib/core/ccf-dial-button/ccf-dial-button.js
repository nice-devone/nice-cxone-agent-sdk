import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import ccfDialButtonStyles from './ccf-dial-button.styles';
/**
 * Component used to display keypad buttons
 * @param props - CcfDialButtonProps
 * @example <CcfDialButton />
 * @returns keypad with inputfield button
 */
const CcfDialButton = (props) => {
    const theme = useTheme();
    const styles = ccfDialButtonStyles(theme);
    const { keyDial, letters, onButtonClick, keyIndex } = props;
    return (_jsxs(Box, Object.assign({ component: 'button', sx: styles.dialButtonContainer, onClick: onButtonClick, "data-testid": `dial-button-${keyIndex}` }, { children: [keyDial && _jsx(Box, Object.assign({ component: "span", className: 'dialKeyNumber', sx: styles.dialKeyNumber }, { children: keyDial })), letters && _jsx(Box, Object.assign({ component: "span", className: 'dialKeyText', sx: styles.dialKeyText }, { children: letters }))] })));
};
export default CcfDialButton;
//# sourceMappingURL=ccf-dial-button.js.map