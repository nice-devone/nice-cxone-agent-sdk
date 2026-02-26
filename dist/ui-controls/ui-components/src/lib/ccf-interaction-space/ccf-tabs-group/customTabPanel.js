import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { CcfBox } from '@nice-devone/ui-controls';
/**
 * @param props - any
 * @returns
 * @example -
 */
export const CustomTabPanel = (props) => {
    const { children, value, index } = props, other = __rest(props, ["children", "value", "index"]);
    return (_jsx(CcfBox, Object.assign({ role: "tabpanel", hidden: value !== index, id: `elevated-tab-panel-${index}`, "aria-labelledby": `elevated-tab-${index}`, className: "tabPanel", sx: { height: '100%' } }, other, { children: value === index && (_jsx(CcfBox, Object.assign({ sx: { height: '100%' } }, { children: _jsx(CcfBox, Object.assign({ sx: { height: '100%' } }, { children: children })) }))) })));
};
export default CustomTabPanel;
//# sourceMappingURL=customTabPanel.js.map