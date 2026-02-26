import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
   * CcfFilterIcon used to display check icon on filters button when filter is applied
   * @param props - CcfCheckIconProps
   * @example -- <CcfCheckIcon />
   */
export function CcfCheckIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props.svgIconProps, { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, { children: props.isFilterSelected &&
            _jsx("path", { d: "M14.9457 3.45258C14.6069 3.11574 14.0986 3.11574 13.7598 3.45258L6.30569 10.8631L2.2398 6.98942C1.90098 6.65258 1.39275 6.65258 1.05392 6.98942C0.715099 7.32627 0.715099 7.83153 1.05392 8.16837L5.79745 12.5473C5.96686 12.7157 6.13628 12.8 6.39039 12.8C6.64451 12.8 6.81392 12.7157 6.98333 12.5473L14.9457 4.63153C15.2845 4.29469 15.2845 3.78942 14.9457 3.45258Z", fill: "#003D7A" }) })));
}
export default CcfCheckIcon;
//# sourceMappingURL=ccf-check-icon.js.map