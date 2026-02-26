import { jsx as _jsx } from "react/jsx-runtime";
import Slider from '@mui/material/Slider';
import { Box, useTheme } from '@mui/material';
import ccfSliderStyles from './ccf-slider.styles';
/**
 * linear gradient slider from react material slider
 * @example - <CcfSlider />
 */
export function CcfSlider() {
    const theme = useTheme();
    const sliderStyles = ccfSliderStyles(theme);
    return (_jsx(Box, Object.assign({ sx: sliderStyles.root }, { children: _jsx(Slider, { "aria-label": "ios slider", min: 0, max: 4, defaultValue: 0.35, valueLabelDisplay: "on", sx: sliderStyles.slider }) })));
}
export default CcfSlider;
//# sourceMappingURL=ccf-slider.js.map