import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import customerCardActivityTitleStyles from './ccf-customer-card-activity-title.style';
import { useTheme } from '@mui/material';
import { CcfBox } from '@nice-devone/ui-controls';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardActivityTitle(props) {
    const { display, label, phone, baseUrl, path } = props;
    const theme = useTheme();
    const styles = customerCardActivityTitleStyles(theme);
    /**
     * Used to update the app space tab label and tab index
     * @param newTabIndex - number
     * @example - handleChange(0)
     */
    const handleClick = () => {
        window.open((baseUrl + path), '_blank');
    };
    return (_jsxs(_Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: styles.title }, { children: display })), _jsx(CcfBox, Object.assign({ sx: styles.smallFont }, { children: phone })), _jsx(CcfBox, Object.assign({ sx: [styles.smallFont, styles.iconCRMType], onClick: () => handleClick() }, { children: label }))] }));
}
export default CcfCustomerCardActivityTitle;
//# sourceMappingURL=ccf-customer-card-activity-title.js.map