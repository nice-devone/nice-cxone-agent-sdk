import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { useTranslator, CcfDropdownOptions, CcfAppToastMessage, SelectAllField } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import CcfAgentCopilotFilterStyles from './ccf-agent-copilot-filter.styles';
import { CcfCopilotActions, getFilterStatusForCase, getAllCopilotFilterValueSets, CopilotFilterValueType, } from '../ccf-agent-copilot-container.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { MediaType } from '@nice-devone/common-sdk';
import { CopilotService } from '@nice-devone/agent-sdk';
import { toast } from 'react-toastify';
/** Component to render Agent Copilot Filters
 * @example CcfAgentCopilotFilter()
 */
export const CcfAgentCopilotFilter = (props) => {
    const { filterOptions, setFilterTargetValue } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = CcfAgentCopilotFilterStyles(theme);
    const [translate] = useTranslator();
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isVoiceContact = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.VOICE ? true : false;
    const activeCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || `${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`;
    const isFilterApplied = useSelector(getFilterStatusForCase(activeCaseId || ''));
    const allCopilotFilterValueSets = useSelector(getAllCopilotFilterValueSets(activeCaseId));
    const activeCopilotFilters = (allCopilotFilterValueSets === null || allCopilotFilterValueSets === void 0 ? void 0 : allCopilotFilterValueSets.active) || {};
    const defaultFilterValues = (allCopilotFilterValueSets === null || allCopilotFilterValueSets === void 0 ? void 0 : allCopilotFilterValueSets.default) || {};
    const copilotService = new CopilotService();
    /**
     * Used to show error toast on failure of applying filters
     *
     * @example - showErrorToast()
     */
    const showErrorToast = () => {
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "failedToApplyFilters", descriptionKey: "failedToApplyFiltersDescription" }), {
            autoClose: 3000,
            containerId: 'CopilotToastContainer',
            hideProgressBar: true,
            style: {
                width: isVoiceContact ? '50%' : '100%',
            },
        });
    };
    /**
     * Used to show success toast when filters are applied
     *
     * @example - showCoPilotFilterSuccessToast()
     */
    const showCoPilotFilterSuccessToast = () => {
        toast.success(_jsx(CcfAppToastMessage, { type: "success", messageKey: "filtersApplied" }), {
            autoClose: 3000,
            containerId: 'CopilotToastContainer',
            hideProgressBar: true,
            className: 'copilotFiltersAppliedToast copilotFeedbackToast',
            style: {
                width: isVoiceContact ? '50%' : '100%',
            },
        });
    };
    /**
     * Used to apply all selected filters on click of apply button
     *
     * @example - applyClickHandler()
     */
    const applyClickHandler = () => __awaiter(void 0, void 0, void 0, function* () {
        setFilterTargetValue(null);
        dispatch(CcfCopilotActions.setFilterStatusForCase({ caseId: activeCaseId, isFilterApplied: false }));
        const filters = getFilterValues(activeCopilotFilters, defaultFilterValues);
        try {
            const response = yield copilotService.updateCopilotFilters(filters, activeCaseId);
            if (response) {
                yield copilotService.retriveAgentAssistConfig(activeCaseId);
                dispatch(CcfCopilotActions.updateFilterValues({ caseId: activeCaseId, filterType: CopilotFilterValueType.ACTIVE, filterValues: activeCopilotFilters }));
                dispatch(CcfCopilotActions.updateFilterValues({ caseId: activeCaseId, filterType: CopilotFilterValueType.PREVIOUS, filterValues: activeCopilotFilters }));
                dispatch(CcfCopilotActions.updateAndHideFilterCard({ caseId: activeCaseId, isFilterCardShown: true }));
                showCoPilotFilterSuccessToast();
            }
            else {
                showErrorToast();
            }
        }
        catch (_error) {
            showErrorToast();
        }
        finally {
            dispatch(CcfCopilotActions.setFilterStatusForCase({ caseId: activeCaseId, isFilterApplied: true }));
        }
    });
    /**
     * Used to format the values in the way the backend expects
     *
     * @example - getFilterValues()
     */
    const getFilterValues = (activeFilters, defaultFilters) => {
        return Object.keys(activeFilters).map(key => {
            var _a;
            const activeFilterWithoutSelectAll = activeFilters[key].items.filter(item => item.id !== SelectAllField.ID);
            const activeIds = activeFilterWithoutSelectAll.map(item => item.id);
            const defaultIds = (((_a = defaultFilters[key]) === null || _a === void 0 ? void 0 : _a.items.filter(item => item.id !== SelectAllField.ID)) || [])
                .map(item => item.id);
            const type = activeFilters[key].type;
            const filterObject = {
                name: key,
                default: defaultIds,
                type,
            };
            const areActiveAndDefaultFiltersEqual = activeIds.length === defaultIds.length && defaultIds.every(id => activeIds.includes(id));
            // Dev Note: Only add selected if it's not the same as default
            if (!areActiveAndDefaultFiltersEqual) {
                filterObject.selected = activeIds;
            }
            return filterObject;
        });
    };
    /**
     * Used to clear all selected filters on click of clear button
     *
     * @example - clearClickHandler()
     */
    const clearClickHandler = () => {
        const clearedFilters = Object.keys(activeCopilotFilters).reduce((clearedFilters, key) => {
            clearedFilters[key] = {
                type: activeCopilotFilters[key].type,
                items: [],
            };
            return clearedFilters;
        }, {});
        dispatch(CcfCopilotActions.updateFilterValues({ caseId: activeCaseId, filterType: CopilotFilterValueType.ACTIVE, filterValues: clearedFilters }));
    };
    /**
     * Used to handle close Icon click
     *
     * @example - closeIconClickHandler()
     */
    const closeIconClickHandler = () => {
        setFilterTargetValue(null);
    };
    /**
     * function to get filter data array
     * @example getFilterData()
     */
    const getFilterData = () => {
        return filterOptions;
    };
    /**
     * function to get extra initial params
     * @example getExtraInitialParams()
     */
    const getExtraInitialParams = () => {
        const extraInitialParams = {
            searchText: {},
            dropdownOptions: {},
            loadMoreFlagValues: {},
        };
        filterOptions.forEach(filter => {
            const key = filter.fieldName;
            if (key) {
                extraInitialParams.searchText[key] = '';
                extraInitialParams.dropdownOptions[key] = [];
                extraInitialParams.loadMoreFlagValues[key] = false;
            }
        });
        return extraInitialParams;
    };
    return (_jsx(Box, Object.assign({ sx: styles.dropdownBox }, { children: _jsx(CcfDropdownOptions, { placeholder: translate('select'), dropdownItems: getFilterData(), dropdownTextStyles: styles.dropdownLabels, listSubheaderTitle: translate('filterCopilotData'), listSubheaderStyles: styles.filtersText, menuItemStyles: styles.filterMenuItem, onCloseIconClick: closeIconClickHandler, copilotFilter: true, extraInitialParams: getExtraInitialParams(), buttons: [
                {
                    title: translate('clear'),
                    styles: styles.button,
                    onClickHandler: clearClickHandler,
                },
                {
                    title: translate('apply'),
                    styles: styles.applyButton,
                    onClickHandler: applyClickHandler,
                    disabled: !isFilterApplied,
                }
            ] }) })));
};
//# sourceMappingURL=ccf-agent-copilot-filter.js.map