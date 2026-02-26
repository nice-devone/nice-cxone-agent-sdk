import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography, useTheme, } from '@mui/material';
import CcfDispositionStyles from '../ccf-disposition.styles';
import { CcfNavigationIcon, useTranslator } from '@nice-devone/ui-controls';
import { useSelector } from 'react-redux';
import { phoneOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
/**
 * Component displays ACD save and redial panel in outcomes panel
 * @param props - React properties
 * @returns ACD save and redial panel in outcomes panel
 * @example <CCFRedialPanel />
 */
const CCFRedialPanel = ({ setIsDisplayRedialPanel, selectedOBSkill, setSelectedOBSkill }) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const agentOutboundSkills = useSelector(phoneOBSkillsSelector);
    const [filterText, setFilterText] = useState('');
    const filteredOBSkills = agentOutboundSkills.filter((skill) => skill.skillName.toLowerCase().includes(filterText.toLowerCase()));
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const dispositionStyles = CcfDispositionStyles(theme, undefined, isSearchFocused);
    return (_jsxs(Stack, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.digitalAutocompleteWrapper), { pr: '15px', marginTop: 0 }) }, { children: [_jsxs(Stack, Object.assign({ direction: 'row', alignItems: 'center', justifyContent: "flex-start", spacing: 1, width: 'fit-content', onClick: () => {
                    setIsDisplayRedialPanel(false);
                    setSelectedOBSkill(-1);
                }, sx: { '&:hover': { cursor: 'pointer' } } }, { children: [_jsx(CcfNavigationIcon, { viewBox: "0 0 18 18", sx: dispositionStyles.redialNavIcon }), _jsx(Typography, Object.assign({ sx: { fontSize: '14px' } }, { children: translate('back').charAt(0) + translate('back').toLowerCase().slice(1) }))] })), _jsx(Stack, Object.assign({ sx: Object.assign(Object.assign({}, dispositionStyles.autoCompleteLabel), { width: '100%', mt: 2 }) }, { children: translate('skillSelect').toUpperCase() })), _jsxs(Stack, Object.assign({ sx: Object.assign({}, dispositionStyles.redialSkillSelectWrapper) }, { children: [_jsx(Stack, Object.assign({ sx: dispositionStyles.redialSkillFilter }, { children: _jsx(TextField, { onChange: (e) => setFilterText(e.target.value), size: "small", variant: "standard", onFocus: () => setIsSearchFocused(true), onBlur: () => setIsSearchFocused(false), sx: { mr: 2, ml: 1, pb: 0.5 }, placeholder: translate('search'), InputProps: {
                                startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(SearchIcon, {}) }))),
                                disableUnderline: true,
                            }, inputProps: {
                                autocomplete: 'off',
                            } }) })), _jsx(Stack, Object.assign({ sx: dispositionStyles.redialRadioGroupWrapper }, { children: _jsxs(RadioGroup, Object.assign({ onChange: (e) => setSelectedOBSkill(Number(e.target.value)), value: selectedOBSkill }, { children: [filteredOBSkills.map((skill) => (_jsx(FormControlLabel, { value: skill.skillId, control: _jsx(Radio, { sx: { ml: 1 }, size: "small" }), label: skill.skillName, slotProps: { typography: { sx: { fontWeight: selectedOBSkill === skill.skillId ? 600 : 400 } } } }, skill.skillId))), filteredOBSkills.length === 0 && (_jsx(Typography, Object.assign({ sx: { textAlign: 'center', mt: 2 } }, { children: translate('noResultsFound') })))] })) }))] }))] })));
};
export default CCFRedialPanel;
//# sourceMappingURL=ccf-redial-panel.js.map