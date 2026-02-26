import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import ccfCopilotCardStyles from '../../ccf-agent-copilot-container.styles';
import { useTheme, Button, FormGroup, Popover, useMediaQuery } from '@mui/material';
import { CcfBadge, CcfFilterIcon, CcfTooltip, useTranslator, SelectAllField } from '@nice-devone/ui-controls';
import { useEffect, useRef, useState } from 'react';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CopilotFilterTypes } from '@nice-devone/common-sdk';
import { CcfCopilotActions, CopilotFilterValueType, getAllCopilotFilterValueSets, getIsFilterCardShown, getScriptParamsForContact, getShouldOpenFilterPopover } from '../../ccf-agent-copilot-container.slice';
import { CcfAgentCopilotFilter } from '../ccf-agent-copilot-filter';
import { ValidationUtils } from '@nice-devone/core-sdk';
// enum for field types
export var CopilotFilterTagsFieldTypes;
(function (CopilotFilterTagsFieldTypes) {
    CopilotFilterTagsFieldTypes["DATE_PICKER"] = "datePicker";
    CopilotFilterTagsFieldTypes["DROPDOWN"] = "dropdown";
})(CopilotFilterTagsFieldTypes || (CopilotFilterTagsFieldTypes = {}));
/**
 * Component displays copilot filter container
 * @example
 * ```
 * <CcfAgentCopilotFilterContainer/>
 * ```
 */
export function CcfAgentCopilotFilterContainer() {
    var _a;
    const dispatch = useDispatch();
    const theme = useTheme();
    const cardStyles = ccfCopilotCardStyles(theme);
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || `${activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId}`;
    const allCopilotFilterValueSets = useSelector(getAllCopilotFilterValueSets(activeCaseId));
    const activeCopilotFilters = (allCopilotFilterValueSets === null || allCopilotFilterValueSets === void 0 ? void 0 : allCopilotFilterValueSets.active) || {};
    const previousCopilotFilters = (allCopilotFilterValueSets === null || allCopilotFilterValueSets === void 0 ? void 0 : allCopilotFilterValueSets.previous) || {};
    const allCopilotFilters = (allCopilotFilterValueSets === null || allCopilotFilterValueSets === void 0 ? void 0 : allCopilotFilterValueSets.all) || {};
    const [isFilterSelected, setIsFilterSelected] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const filterTargetRef = useRef(null);
    const scriptParams = useSelector(getScriptParamsForContact);
    const scriptParamsData = JSON.parse(scriptParams);
    const copilotFilterTags = (_a = scriptParamsData === null || scriptParamsData === void 0 ? void 0 : scriptParamsData.expertTags) !== null && _a !== void 0 ? _a : [];
    const [filterTargetValue, setFilterTargetValue] = useState(null);
    const isPopoverMenuOpen = Boolean(filterTargetValue);
    const hasFilterCardBeenDisplayed = useSelector(getIsFilterCardShown(activeCaseId || ''));
    const [translate] = useTranslator();
    const isInitialRender = useRef(false);
    const validationUtils = new ValidationUtils();
    const selectAllOption = {
        id: SelectAllField.ID,
        name: translate('selectAll'),
    };
    const [totalLengthOfActiveFilters, setTotalLengthOfActiveFilters] = useState(0);
    let lengthOfActiveFilters = 0;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const shouldOpenFilterPopover = useSelector(getShouldOpenFilterPopover(activeCaseId || ''));
    /**
     * Function to handle click event
     * @param event - mouse event triggered by clicking the button.
     * @example
     * ```
     * handleClick()
     * ```
     */
    const handleClick = (e) => {
        setFilterTargetValue(e.currentTarget);
    };
    /** function to select item from dropdown and update their values in redux according to fieldname
     * @param filterValues - filterValues to be updated in redux store
     * @param fieldName - according to fieldName we are updating the values in redux
     * @example onMenuItemClick(data, fieldName)
     */
    const onMenuItemClickHandler = (filterValues, fieldName) => {
        var _a;
        const filterValuesArray = Array.isArray(filterValues) ? filterValues : [filterValues];
        const formattedFilterValues = filterValuesArray.map(filter => ({
            id: filter.id,
            name: filter.name,
        }));
        const type = ((_a = activeCopilotFilters[fieldName]) === null || _a === void 0 ? void 0 : _a.type) || CopilotFilterTypes.FILTER;
        const filterValuesObject = {
            [fieldName]: {
                type,
                items: formattedFilterValues,
            },
        };
        dispatch(CcfCopilotActions.updateFilterValues({ caseId: activeCaseId, filterType: CopilotFilterValueType.ACTIVE, filterValues: filterValuesObject }));
    };
    useEffect(() => {
        var _a, _b, _c;
        const areFiltersEmpty = Object.keys(allCopilotFilters).length === 0;
        if (areFiltersEmpty) {
            let activeTags = {};
            let defaultTags = {};
            let allTags = {};
            (_a = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.custom) === null || _a === void 0 ? void 0 : _a.forEach((customTag) => {
                const { name, default: defaultValues, values, selected, type } = customTag;
                const activeValues = selected && selected.length > 0 ? selected : defaultValues !== null && defaultValues !== void 0 ? defaultValues : [];
                if (activeValues.length > 0) {
                    const activeItems = activeValues === null || activeValues === void 0 ? void 0 : activeValues.map((value) => ({ id: value, name: value }));
                    activeTags[name] = { type: type !== null && type !== void 0 ? type : CopilotFilterTypes.FILTER, items: activeItems };
                }
                else {
                    activeTags[name] = { type: '', items: [] };
                }
                if (values && values.length > 0) {
                    const allItems = values === null || values === void 0 ? void 0 : values.map((value) => ({ id: value, name: value }));
                    allTags[name] = { type: type !== null && type !== void 0 ? type : CopilotFilterTypes.FILTER, items: allItems };
                }
                else {
                    allTags[name] = { type: '', items: [] };
                }
                if (defaultValues && defaultValues.length > 0) {
                    const defaultItems = defaultValues === null || defaultValues === void 0 ? void 0 : defaultValues.map((value) => ({ id: value, name: value }));
                    defaultTags[name] = { type: type !== null && type !== void 0 ? type : CopilotFilterTypes.FILTER, items: defaultItems };
                }
                else {
                    defaultTags[name] = { type: '', items: [] };
                }
            });
            if (((_b = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.standard) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                const standardTagsObject = [];
                (_c = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.standard) === null || _c === void 0 ? void 0 : _c.forEach((standardTag) => {
                    standardTagsObject.push({ id: standardTag, name: standardTag });
                });
                activeTags = Object.assign({ [translate('standardTags')]: { type: CopilotFilterTypes.FILTER, items: standardTagsObject } }, activeTags);
                defaultTags = Object.assign({ [translate('standardTags')]: { type: CopilotFilterTypes.FILTER, items: standardTagsObject } }, defaultTags);
                allTags = Object.assign({ [translate('standardTags')]: { type: CopilotFilterTypes.FILTER, items: standardTagsObject } }, allTags);
            }
            dispatch(CcfCopilotActions.updateAllFilterValueSets({ caseId: activeCaseId, filters: {
                    default: defaultTags,
                    all: allTags,
                    active: activeTags,
                    previous: activeTags,
                } }));
        }
    });
    useEffect(() => {
        var _a, _b;
        const newFilterOptions = [];
        let addedCount = 0;
        let isFilterSelected = false;
        if (activeCopilotFilters && Object.keys(activeCopilotFilters).length > 0) {
            Object.entries(activeCopilotFilters).forEach(([fieldName, options]) => {
                if (addedCount >= 5)
                    return;
                if (Array.isArray(options === null || options === void 0 ? void 0 : options.items)) {
                    const fieldValue = options.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                    }));
                    newFilterOptions.push({
                        label: fieldName === null || fieldName === void 0 ? void 0 : fieldName.toUpperCase(),
                        options: [selectAllOption, ...allCopilotFilters[fieldName].items],
                        fieldValue: fieldValue,
                        onMenuItemClick: onMenuItemClickHandler,
                        fieldName: fieldName,
                        isMultipleSelectionAllowed: true,
                        type: CopilotFilterTagsFieldTypes.DROPDOWN,
                    });
                    addedCount += 1;
                    if (fieldValue.length > 0) {
                        isFilterSelected = true;
                    }
                }
            });
            for (const key in activeCopilotFilters) {
                lengthOfActiveFilters += (_b = (_a = activeCopilotFilters[key]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.filter(item => item.id !== SelectAllField.ID).length;
            }
            setTotalLengthOfActiveFilters(lengthOfActiveFilters);
        }
        setFilterOptions(newFilterOptions);
        setIsFilterSelected(isFilterSelected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCopilotFilters]);
    useEffect(() => {
        if (isInitialRender.current) {
            if (hasFilterCardBeenDisplayed && shouldOpenFilterPopover) {
                setFilterTargetValue(filterTargetRef.current);
                dispatch(CcfCopilotActions.setShouldOpenFilterPopoverForCase({ caseId: activeCaseId, shouldOpenFilterPopover: false }));
            }
        }
        else {
            isInitialRender.current = true;
        }
    }, [hasFilterCardBeenDisplayed, activeCaseId]);
    //to check if user closes popover without cliking apply then it needs to update the active filters with previous filters
    useEffect(() => {
        if (validationUtils.isNullOrEmpty(filterTargetValue)) {
            dispatch(CcfCopilotActions.updateFilterValues({
                caseId: activeCaseId,
                filterType: CopilotFilterValueType.ACTIVE,
                filterValues: previousCopilotFilters,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTargetValue]);
    // Dev Comment - Button width is increased based on number of filters selected, > 10 shows as 10+ which is being handled by the increased width
    let buttonMinWidth = '2.2rem';
    if (totalLengthOfActiveFilters >= 10) {
        buttonMinWidth = '2.5rem';
    }
    return (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('filterIconTooltip'), sx: { width: '30px' }, arrow: true }, { children: _jsx(Button, Object.assign({ variant: "text", startIcon: _jsx(CcfFilterIcon, { svgIconProps: { sx: cardStyles.filterIcon }, isFilterSelected: isFilterSelected }), size: "small", sx: Object.assign(Object.assign({}, cardStyles.kebabMenuBtn), { minWidth: buttonMinWidth, '& .MuiButton-startIcon': {
                            margin: 0,
                        } }), id: "filter-button", "data-testid": "filter-button", "aria-controls": isPopoverMenuOpen ? 'filter-options' : undefined, "aria-haspopup": "true", "aria-expanded": isPopoverMenuOpen ? 'true' : undefined, onClick: handleClick, ref: filterTargetRef, "aria-label": translate('copilotFilterIcon') }, { children: _jsx(CcfBadge, { id: 'filter-badge', "data-testid": 'filter-badge', label: totalLengthOfActiveFilters.toString(), sx: cardStyles.filterIconBadge, badgeContent: `${totalLengthOfActiveFilters}`, color: 'primary', overlap: 'circular', max: 10, "aria-label": translate('countOfCopilotFiltersSelected').replace('filterCount', totalLengthOfActiveFilters.toString()), tabIndex: 0 }) })) })), _jsx(Popover, Object.assign({ id: "filter-options", "data-testid": "filter-options", open: isPopoverMenuOpen, anchorEl: filterTargetValue, onClose: () => {
                    setFilterTargetValue(null);
                }, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, PaperProps: {
                    style: {
                        width: isSmView ? '80%' : '40%',
                        height: '70%',
                    },
                }, sx: Object.assign(Object.assign({}, cardStyles.listBox), { transform: 'translate(3rem, -3rem)' }) }, { children: _jsx(FormGroup, Object.assign({ sx: { height: '100%' } }, { children: _jsx(CcfAgentCopilotFilter, { filterOptions: filterOptions, setFilterTargetValue: setFilterTargetValue }) })) }))] }));
}
export default CcfAgentCopilotFilterContainer;
//# sourceMappingURL=ccf-agent-copilot-filter-container.js.map