import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * Component displays left arrow icon
 * @param props -SvgIconProps
 * @returns svg of left arrow icon
 * @example <CcfLeftArrowIcon/>
 */
export function CcfLeftArrowIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("svg", Object.assign({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsx("path", { d: "M6.22642 9.00497L12.6415 2.23881C12.9434 1.9204 13.4717 1.9204 13.7736 2.23881C14.0755 2.55721 14.0755 3.11443 13.7736 3.43284L7.73585 9.80099L13.7736 16.5672C14.0755 16.8856 14.0755 17.4428 13.7736 17.7612C13.4717 18.0796 12.9434 18.0796 12.6415 17.7612L6.22642 10.597C6 10.3582 6 10.1194 6 9.8806C6 9.48259 6.07547 9.16418 6.22642 9.00497Z", fill: props.fill }) })) })));
}
export default CcfLeftArrowIcon;
//# sourceMappingURL=ccf-left-arrow-icon.js.map