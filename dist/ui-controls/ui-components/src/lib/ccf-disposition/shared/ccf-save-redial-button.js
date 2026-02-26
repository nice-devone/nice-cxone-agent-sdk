import { jsx as _jsx } from "react/jsx-runtime";
import { CcfButton, CcfTypography } from '@nice-devone/ui-controls';
import CcfDispositionStyles from '../ccf-disposition.styles';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { phoneOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
/**
 * Component to display save and redial button for outcomes panel and redial panel
 * @returns save and redial button
 * @example - <CcfSaveAndRedialButton />
 */
const CCFSaveRedialButton = ({ isSaveRedialDisabled, isDisplayRedialPanel, setIsDisplayRedialPanel, setupPendingRedial, onClickSaveButton, activeDisposition, }) => {
    const theme = useTheme();
    const dispositionStyles = CcfDispositionStyles(theme);
    const agentOBPhoneSkills = useSelector(phoneOBSkillsSelector);
    return (_jsx(CcfButton, Object.assign({ sx: isSaveRedialDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
            ? Object.assign(Object.assign({}, dispositionStyles.disabledButton), { mr: isDisplayRedialPanel ? '1rem' : 0 }) : Object.assign(Object.assign({}, dispositionStyles.markAsResolvedOutlinedButton), { borderColor: !isDisplayRedialPanel ? theme.palette.background.digitalTag : 'inherit', mr: isDisplayRedialPanel ? '1rem' : 0 }), variant: "outlined", size: "small", color: "inherit", onClick: () => {
            if (!isDisplayRedialPanel && (agentOBPhoneSkills === null || agentOBPhoneSkills === void 0 ? void 0 : agentOBPhoneSkills.length) > 1) {
                //if there are multiple outbound skills, show the redial panel
                setIsDisplayRedialPanel(true);
            }
            else {
                //if there is only one outbound skill save the disposition and setup redial
                if (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved) {
                    setupPendingRedial();
                }
                else {
                    onClickSaveButton(true);
                }
            }
        }, disabled: isSaveRedialDisabled, primary: isDisplayRedialPanel }, { children: _jsx(CcfTypography, { variant: "inherit", sx: isSaveRedialDisabled || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isResolved)
                ? Object.assign({}, dispositionStyles.markAsResolvedText) : Object.assign(Object.assign({}, dispositionStyles.markAsResolvedText), { color: !isDisplayRedialPanel ? theme.palette.text.clearText : 'inherit' }), translationKey: "saveAndRedial" }) })));
};
export default CCFSaveRedialButton;
//# sourceMappingURL=ccf-save-redial-button.js.map