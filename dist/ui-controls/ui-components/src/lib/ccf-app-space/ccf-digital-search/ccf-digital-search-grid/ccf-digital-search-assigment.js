import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useTranslator, CcfButton, CcfDropdownOptions, CcfTypography, FilterFieldTypes, CcfInfoIcon, } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, Box, Select, MenuItem, ListItemText } from '@mui/material';
import CcfInteractionSearchSelectOptionStyle from './ccf-interaction-search-select-option/ccf-digital-search-toggle-buttons.styles';
import { getSelectedRowContacts, assignDigitalContact, getAgentListData, DIGITAL_SEARCH_FILTERS, ccfDigitalSearchActions, getDefaultFilterValues, getAgentList, fetchSkillListData, assignDigitalContactToSkill, fetchSkillList, getGridData, } from './../ccf-digital-search.slice';
import { InteractionSearchStatus } from '@nice-devone/common-sdk';
/**
 * Component to show the Select Options assignment menu for the interaction search on row selection
 * @example
 * ```
 * <CcfDigitalSearchAssignment />
 * ```
 */
export const CcfDigitalSearchAssignment = () => {
    var _a, _b, _c;
    const theme = useTheme();
    const styles = CcfInteractionSearchSelectOptionStyle(theme);
    const [translate] = useTranslator();
    const toastId = useRef('');
    const selections = useSelector(getSelectedRowContacts); // selector can be used in API calls to get the list of digital case ids
    const gridData = useSelector(getGridData);
    const agentList = (_a = useSelector(getAgentListData)) !== null && _a !== void 0 ? _a : [];
    const skillsList = (_b = useSelector(fetchSkillListData)) !== null && _b !== void 0 ? _b : [];
    const [closedInteraction, setClosedInteraction] = useState(false);
    const [noAssignee, setNoAssignee] = useState(false);
    const dropdownOption = useSelector(getDefaultFilterValues);
    const [showErrorMessage, setErrorMessageVisibility] = useState(false);
    const assignTypeListDropdown = [
        { id: '0', name: translate('agentLabel') },
        { id: '1', name: translate('skill') }
    ];
    const dispatch = useDispatch();
    const [selectedAssignType, setselectedAssignType] = useState({
        id: '0',
        name: translate('agentLabel'),
    });
    const [open, setOpen] = useState(false);
    const [isTabPressed, setIsTabPressed] = useState(false);
    useEffect(() => {
        if (selectedAssignType.id === '0') {
            dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName: 'agent', filterValues: [] }));
        }
    }, []);
    useEffect(() => {
        if (agentList.length === 0) {
            dispatch(getAgentList());
        }
        if (skillsList.length === 0) {
            dispatch(fetchSkillList());
        }
    }, []);
    useEffect(() => {
        if (selectedAssignType.id === '0' &&
            (!dropdownOption.agent ||
                (dropdownOption.agent && dropdownOption.agent.toString().length === 0))) {
            setNoAssignee(true);
            return;
        }
        else if (selectedAssignType.id === '1' &&
            (!dropdownOption.skill ||
                (dropdownOption.skill && dropdownOption.skill.toString().length === 0))) {
            setNoAssignee(true);
            return;
        }
        setNoAssignee(false);
    }, [dropdownOption, selectedAssignType]);
    useEffect(() => {
        const selectedRowData = selections.filter((id) => gridData.find((row) => row.id === id && row.status === InteractionSearchStatus.CLOSED));
        if (selectedRowData.length > 0) {
            setClosedInteraction(true);
            setErrorMessageVisibility(true);
            return;
        }
        setClosedInteraction(false);
        setErrorMessageVisibility(false);
    }, [selections, gridData]);
    /** function to get the selected Agent details AssignTo dropdown menu
     * @param data - selected assignee/user
     * @param fieldName - type of data (agent,skill,etc)
     * @example assignToMenuChangeHandler(data,fieldName)
     */
    const assignToMenuChangeHandler = (filterValues, fieldName) => {
        handleOpen && handleOpen(false); // To close dropdown after selecting an option from dropdown
        // Selected Agent details captured here from AssignTo dropdown
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    /**
     * function to get the agents list to be rendered on assign to Agent dropdown
     * @example getAllAgentListData()
     */
    const getAllAgentListData = () => {
        return [
            {
                options: agentList,
                onMenuItemClick: assignToMenuChangeHandler,
                fieldValue: dropdownOption.agent,
                fieldName: DIGITAL_SEARCH_FILTERS.AGENT,
                isSingleSelectWithPage: true,
                type: FilterFieldTypes.DROPDOWN,
            }
        ];
    };
    /** function to get the selected Skill details AssignTo dropdown menu
     * @param data - selected skill
     * @param fieldName - type of data (agent,skill,etc)
     * @example assignToSkillMenuChangeHandler(data,fieldName)
     */
    const assignToSkillMenuChangeHandler = (filterValues, fieldName) => {
        handleOpen && handleOpen(false); // To close dropdown after selecting an option from dropdown
        // Selected Agent details captured here from AssignTo dropdown
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    /**
     * the Skills list to be rendered on assign to Skill dropdown
     * @example getAssignToSkillsList
     */
    const getAssignToSkillsList = [
        {
            options: skillsList,
            onMenuItemClick: assignToSkillMenuChangeHandler,
            fieldValue: dropdownOption.skill,
            fieldName: DIGITAL_SEARCH_FILTERS.SKILL,
            isSingleSelectWithPage: true,
            type: FilterFieldTypes.DROPDOWN,
        }
    ];
    /** function to get the selected Assign Type details AssignTo dropdown menu
     * @param selectedType - assignment type (agent or skill)
     * @example - assignToTypeMenuChangeHandler(selectedType)
     */
    const assignToTypeMenuChangeHandler = (selectedType) => {
        // Selected Agent details captured here from AssignTo dropdown
        selectedAssignType.id === '0'
            ? dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName: 'agent', filterValues: [] }))
            : dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName: 'skill', filterValues: [] }));
        setselectedAssignType(selectedType);
    };
    /**
     * Function to handle click of Assign buttons on Selection option banner
     * @example handleAssignmentClick(clickEvent)
     */
    const handleAssignmentClick = () => {
        if (selectedAssignType.id === '0' && !closedInteraction) {
            const agentId = dropdownOption.agent;
            dispatch(assignDigitalContact({
                selectedContactIds: selections,
                cxoneUserId: agentId.userId,
                toastId: toastId,
            }));
        }
        else if (!closedInteraction) {
            const skillId = dropdownOption.skill;
            dispatch(assignDigitalContactToSkill({
                selectedContactIds: selections,
                skillId: skillId.id,
                toastId: toastId,
            }));
        }
    };
    /**
     * handle state of open from child component
     * @param state - state of open variable
     * @example handleOpen(state)
     */
    const handleOpen = (state) => {
        setOpen(state);
    };
    /**
     * handle onBlur to change focus only on other events other than tab
     * @example handleBlurEvent
     */
    const handleBlurEvent = () => {
        // Keep dropdown open if tab is pressed else close the dropdown like in case of mouseInput,etc events
        if (isTabPressed) {
            setOpen(true);
        }
        else {
            setOpen(false);
        }
        setIsTabPressed(false);
    };
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: '16rem',
                width: '5.5rem',
            },
        },
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.headerContainer }, { children: [_jsx(Select, Object.assign({ value: selectedAssignType.id, sx: styles.agentListSelect, "aria-label": 'assignTypeSelect', MenuProps: MenuProps, "data-testid": 'assignTypeSelect-menu' }, { children: assignTypeListDropdown.map((tone) => (_jsx(MenuItem, Object.assign({ value: tone.id, sx: styles.menuItemStyle, onClick: () => assignToTypeMenuChangeHandler(tone), "data-testid": `assignTypeSelect-item-${tone.id}` }, { children: _jsx(ListItemText, { primary: tone.name, sx: styles.listItemStyle }) }), tone.id))) })), (selectedAssignType.id === '0' || selectedAssignType.id === '1') && (_jsx(Box, Object.assign({ sx: styles.assignDropdown, onFocus: () => { setOpen(true); }, onBlur: handleBlurEvent, onKeyDown: (event) => { if (event.key === 'Tab' && event.shiftKey) {
                            setOpen(false);
                        }
                        else if (event.key === 'Tab') {
                            setIsTabPressed(true);
                        } } }, { children: _jsx(CcfDropdownOptions, { placeholder: translate('select'), dropdownItems: selectedAssignType.id === '0' ? getAllAgentListData() : getAssignToSkillsList, dropdownTextStyles: styles.assignToListItem, menuItemStyles: styles.assignToMenuItem, showOnlyDropDownBox: true, open: open, handleOpen: handleOpen }) }))), _jsx(CcfButton, Object.assign({ primary: true, onClick: handleAssignmentClick, sx: styles.actionButton, disabled: noAssignee, onFocus: () => { setOpen(false); }, id: 'interactionAssignButton', "data-testid": 'interactionAssignButton' }, { children: translate('assign') }))] })), showErrorMessage && (_jsxs(Box, Object.assign({ sx: styles.messageWrapper }, { children: [_jsx(CcfInfoIcon, { htmlColor: (_c = theme.palette.error) === null || _c === void 0 ? void 0 : _c.main, fontSize: 'large' }), _jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: Object.assign(Object.assign({}, styles.statusMessage), { color: `${theme.palette.endCall}` }) }, { children: [_jsx(Box, Object.assign({ fontWeight: 'bold', display: 'inline' }, { children: translate('closed') })), " ", translate('closedCaseAssignmentMessage')] }))] })))] }));
};
//# sourceMappingURL=ccf-digital-search-assigment.js.map