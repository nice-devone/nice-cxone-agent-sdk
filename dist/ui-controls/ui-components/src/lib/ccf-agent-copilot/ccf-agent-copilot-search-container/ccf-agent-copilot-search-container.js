import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import ccfCopilotCardStyles from '../ccf-agent-copilot-container.styles';
import { useTheme, TextField, InputAdornment, useMediaQuery } from '@mui/material';
import { useTranslator, CcfSearchIcon, CcfTooltip } from '@nice-devone/ui-controls';
import { useState } from 'react';
import { copilotSearch } from '../ccf-agent-copilot-middleware';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getDispositionData } from '../../ccf-disposition/ccf-disposition-slice';
import { DigitalChannelStatus, MediaType } from '@nice-devone/common-sdk';
import { CcfAgentCopilotFilterContainer } from '../ccf-agent-copilot-filters/ccf-agent-copilot-filter-container/ccf-agent-copilot-filter-container';
import { getFilterStatusForCase, getScriptParamsForContact } from '../ccf-agent-copilot-container.slice';
/**
 * Component displays copilot search container
 * @example
 * ```
 * <CcfAgentCopilotSearchContainer/>
 * ```
 */
export function CcfAgentCopilotSearchContainer() {
    var _a, _b, _c, _d;
    const dispatch = useDispatch();
    const theme = useTheme();
    const cardStyles = ccfCopilotCardStyles(theme);
    const [searchText, setSearchText] = useState('');
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || `${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`;
    const isChannelVoice = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.VOICE;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const dispositionData = useSelector(getDispositionData);
    const contactId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId);
    let isOutcomePanelVisible = false;
    if (activeContact && contactId) {
        const activeDisposition = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactId]) === null || _a === void 0 ? void 0 : _a.dispositionList;
        isOutcomePanelVisible = activeDisposition && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.length) > 0;
    }
    const isFilterApplied = useSelector(getFilterStatusForCase(activeCaseId || ''));
    const scriptParams = useSelector(getScriptParamsForContact);
    const scriptParamsData = JSON.parse(scriptParams);
    const copilotFilterTags = (_b = scriptParamsData === null || scriptParamsData === void 0 ? void 0 : scriptParamsData.expertTags) !== null && _b !== void 0 ? _b : [];
    /**
     * Function to submit search text
     * @example
     * ```
     * onSubmit()
     * ```
     */
    const onSubmit = () => {
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus) !== DigitalChannelStatus.CLOSED) {
            searchText && dispatch(copilotSearch({ searchText, activeCaseId }));
            setSearchText('');
        }
    };
    const [translate] = useTranslator();
    const agentSearchPlaceHolderText = translate('howCanIHelp');
    const paddingForTextField = (isOutcomePanelVisible && isChannelVoice && !isSmView) ? '2.188rem' : '0.625rem';
    return (_jsx(TextField, { sx: [cardStyles.textField], placeholder: agentSearchPlaceHolderText, value: searchText, id: "searchInput", "data-testid": "acp-search-container", InputProps: {
            endAdornment: (_jsxs(_Fragment, { children: [(((_c = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.custom) === null || _c === void 0 ? void 0 : _c.length) > 0 || ((_d = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.standard) === null || _d === void 0 ? void 0 : _d.length) > 0) && (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsx(CcfAgentCopilotFilterContainer, {}) }))), _jsx(CcfTooltip, Object.assign({ title: translate('search'), arrow: true }, { children: _jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsx(CcfSearchIcon, { fontSize: "small", onClick: () => {
                                    if (isFilterApplied) {
                                        onSubmit();
                                    }
                                }, viewBox: "0 -5 32 32", "data-testid": "inputSearchIcon", sx: Object.assign(Object.assign({}, cardStyles.searchIcon), { cursor: isFilterApplied ? 'pointer' : 'not-allowed', opacity: isFilterApplied ? 1 : 0.5 }) }) })) }))] })),
        }, onChange: (event) => setSearchText(event.target.value), onKeyDown: (event) => {
            event.key === 'Enter' && onSubmit();
        }, variant: "outlined", role: "search" }));
}
export default CcfAgentCopilotSearchContainer;
//# sourceMappingURL=ccf-agent-copilot-search-container.js.map