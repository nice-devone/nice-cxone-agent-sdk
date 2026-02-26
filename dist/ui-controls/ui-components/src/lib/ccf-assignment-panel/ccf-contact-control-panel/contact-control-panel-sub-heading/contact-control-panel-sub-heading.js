import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { CcfBox, CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import contactControlPanelSubHeadingStyles from './contact-control-panel-sub-heading.styles';
/**
 * Component display sub heading for contact control panel
 * @param props -ContactControlPanelSubHeadingProps
 * ```
 * @example -
 * const subHeading1 = "253-895-8956"
 * const subHeading2 = "#439-Z3FM-5S23"
 * const subHeading3 = "Cust. Service Request"
 * <ContactControlPanelSubHeading subHeading1={props.subHeading1} subHeading2={props.subHeading2} subHeading3={props.contact.queueName} />
 * ```
 */
export function ContactControlPanelSubHeading(props) {
    var _a;
    const theme = useTheme();
    const styles = contactControlPanelSubHeadingStyles(theme);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.subHeading }, { children: [_jsx(CcfTooltip, Object.assign({ title: (_a = props.subHeading2) !== null && _a !== void 0 ? _a : '', arrow: true, "aria-label": props.subHeading2 }, { children: _jsx("div", { children: _jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: styles.subHeading2 }, { children: [props === null || props === void 0 ? void 0 : props.subHeading2, " "] })) }) })), _jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: styles.subHeading3, "aria-live": 'off' }, { children: [" ", props.subHeading3] }))] })));
}
export default ContactControlPanelSubHeading;
//# sourceMappingURL=contact-control-panel-sub-heading.js.map