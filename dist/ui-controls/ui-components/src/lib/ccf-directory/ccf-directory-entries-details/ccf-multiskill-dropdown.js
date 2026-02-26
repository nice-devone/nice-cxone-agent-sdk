import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, MenuItem, Select, useTheme } from '@mui/material';
import { CcfButton, useTranslator, } from '@nice-devone/ui-controls';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentDirectoryActions, getSkillIdSelectedForInteraction } from '../+state/ccf-directory.slice';
import directoryEntryDetailsStyles from './ccf-directory-entries-details.styles';
/**
 * renders the select skills dropdown
 * @param props - AgentMultiSkillHoverDropDownViewProps
 * @example agentMultiSkillHoverDropDownView
 * @returns
 */
export const AgentMultiSkillHoverDropDownView = (props) => {
    const { data, handleTrigger } = props;
    const theme = useTheme();
    const classes = directoryEntryDetailsStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const skillIdSelectedForInteraction = useSelector(getSkillIdSelectedForInteraction);
    useEffect(() => {
        var _a;
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction((_a = data[0]) === null || _a === void 0 ? void 0 : _a.skillId));
        return () => {
            var _a;
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: false,
                triggerType: 'voice',
            }));
            dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction((_a = data[0]) === null || _a === void 0 ? void 0 : _a.skillId));
        };
    }, []);
    /**
     * Function to set outbound skill Id selected for interaction initiaction
     * @param event - event
     * @example setOBSkillIdForInteraction(event)
     */
    const setOBSkillIdForInteraction = (event) => {
        event.stopPropagation();
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(event.target.value));
    };
    /**
     * Function to cancel the selection of dropdown
     * @param event - event
     * @example cancelEvent(event)
     */
    const cancelEvent = (event) => {
        handleTrigger(event);
    };
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250,
            },
        },
    };
    return (_jsxs(Box, Object.assign({ width: '100%' }, { children: [_jsx(Select, Object.assign({ id: 'selectBox', sx: classes.skillSelect, MenuProps: MenuProps, size: "small", fullWidth: true, value: skillIdSelectedForInteraction, onChange: setOBSkillIdForInteraction }, { children: data && data.map(item => (_jsx(MenuItem, Object.assign({ dense: true, value: item.skillId }, { children: item.skillName }), item.skillId))) })), _jsxs(Box, Object.assign({ display: 'flex', padding: '5px', justifyContent: 'flex-end' }, { children: [_jsx(CcfButton, Object.assign({ style: { padding: '2px' }, onClick: cancelEvent, "data-testid": 'cancelBtn' }, { children: translate('cancel') })), _jsx(CcfButton, Object.assign({ primary: true, sx: classes.hoverPopUpCallBtnMargin, onClick: handleTrigger }, { children: translate('call') }))] }))] })));
};
export default AgentMultiSkillHoverDropDownView;
//# sourceMappingURL=ccf-multiskill-dropdown.js.map