import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, MenuItem, useTheme } from '@mui/material';
import { useTranslator } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { selectDropDownQueryValue, agentDirectoryActions, DirectoryDropdownValues, getExternalDirectories, standardAddressBooks, stopEveryPolling, selectExternalDirectoryState, } from '../+state/ccf-directory.slice';
import { useEffect, useRef, useState } from 'react';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
;
/**
 * Component to be used for ccf directoy select
 * @example - <CcfDirectorySelect />
 * @returns
 */
export function CcfDirectorySelect(props) {
    const dispatch = useDispatch();
    const selectedOption = useSelector(selectDropDownQueryValue);
    const standardAddressBookNames = useSelector(standardAddressBooks);
    const dropDownRef = useRef(null);
    const [dropDownWidth, setDropDownWidth] = useState(0);
    const appSpaceLocal = LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO);
    const theme = useTheme();
    const type = theme.palette.mode;
    const [translate] = useTranslator();
    const externalDirectories = useSelector(getExternalDirectories);
    const { directories } = externalDirectories;
    const [externalDirectoryStatus, setExternalDirectoryStatus] = useState(false);
    const directoryStyles = ccfDirectoryStyles(theme);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const inputRef = useRef(null);
    const externalDirectoryState = useSelector(selectExternalDirectoryState);
    /**
     * Function to dispatch an action to fetch agent contact group
     * @param e -  React.ChangeEvent
     * @example - dispatchQueryUpdateAction(e)
     */
    function dispatchQueryUpdateAction(e) {
        dispatch(agentDirectoryActions.updateEmptySearchState(false));
        dispatch(agentDirectoryActions.updateSelectedDropdown(e.target.value));
        dispatch(stopEveryPolling());
        if (standardAddressBookNames.length > 0) {
            const payload = {
                addressBookEntryId: 0,
                isVisible: false,
            };
            dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
        }
    }
    /**
     * Function to get the aria label for the selected option in the dropdown
     * @param selectedOption -  string
     * @example - getAriaLabel(selectedOption)
     */
    const getAriaLabel = (selectedOption) => {
        var _a;
        switch (selectedOption) {
            case DirectoryDropdownValues.All:
                return translate('all');
            case DirectoryDropdownValues.FavoriteList:
                return translate('favorites');
            case DirectoryDropdownValues.AgentList:
                return translate('agents');
            case DirectoryDropdownValues.SkillList:
                return translate('skills');
            case DirectoryDropdownValues.TeamList:
                return translate('teams');
            default:
                if (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.includes(DirectoryDropdownValues.AddressBookList)) {
                    const addressBookId = parseInt(selectedOption.split('_')[1]);
                    return ((_a = standardAddressBookNames.find((item) => item.addressBookId === addressBookId)) === null || _a === void 0 ? void 0 : _a.addressBookName) || '';
                }
                if (externalDirectories === null || externalDirectories === void 0 ? void 0 : externalDirectories.directories) {
                    const directory = externalDirectories.directories.find((directory) => directory.directoryId === selectedOption);
                    return (directory === null || directory === void 0 ? void 0 : directory.directoryName) || '';
                }
                return '';
        }
    };
    /**
     * Function to get the available dropdown values based on agent profile settings and directory status
     * @returns - Array of available dropdown values
     * @example - getAvailableDropdownValues()
     */
    const getAvailableDropdownValues = () => {
        const values = [];
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAll)) {
            values.push(DirectoryDropdownValues.All);
        }
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites)) {
            values.push(DirectoryDropdownValues.FavoriteList);
        }
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAgents)) {
            values.push(DirectoryDropdownValues.AgentList);
        }
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySkills)) {
            values.push(DirectoryDropdownValues.SkillList);
        }
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryTeams)) {
            values.push(DirectoryDropdownValues.TeamList);
        }
        if (externalDirectoryState && externalDirectoryStatus && (directories === null || directories === void 0 ? void 0 : directories.length)) {
            directories.forEach((d) => values.push(d.directoryId));
        }
        if (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryStandardAddressBook) &&
            (standardAddressBookNames === null || standardAddressBookNames === void 0 ? void 0 : standardAddressBookNames.length)) {
            standardAddressBookNames.forEach(item => values.push(`${DirectoryDropdownValues.AddressBookList}_${item.addressBookId}`));
        }
        return values;
    };
    useEffect(() => {
        const availableValues = getAvailableDropdownValues();
        if (!(availableValues === null || availableValues === void 0 ? void 0 : availableValues.length))
            return;
        if (!selectedOption || !(availableValues === null || availableValues === void 0 ? void 0 : availableValues.includes(selectedOption))) {
            dispatch(agentDirectoryActions === null || agentDirectoryActions === void 0 ? void 0 : agentDirectoryActions.updateSelectedDropdown(availableValues[0]));
        }
    }, [
        selectedOption,
        agentProfileSettings,
        directories,
        standardAddressBookNames,
        externalDirectoryStatus
    ]);
    useEffect(() => {
        var _a;
        /**
         * Sets width of the dropdown on window resize event.
         * @example
         * handleWindowResize()
         */
        const handleWindowResize = () => {
            var _a;
            if ((_a = dropDownRef === null || dropDownRef === void 0 ? void 0 : dropDownRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) {
                setDropDownWidth(dropDownRef.current.offsetWidth);
            }
        };
        if ((_a = dropDownRef === null || dropDownRef === void 0 ? void 0 : dropDownRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) {
            setDropDownWidth(dropDownRef.current.offsetWidth);
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [dropDownWidth, appSpaceLocal]);
    useEffect(() => {
        if (props.externalDirectory) {
            setExternalDirectoryStatus(true);
        }
        else
            setExternalDirectoryStatus(false);
    }, [props.externalDirectory]);
    useEffect(() => {
        if (props.focusSelect && inputRef.current) {
            inputRef.current.focus();
        }
    }, [props.focusSelect]);
    return (_jsx(Box, Object.assign({ bgcolor: "background.light", p: 1, pb: 2 }, { children: _jsxs(TextField, Object.assign({ id: props.id ? props.id : 'ccfTextFieldSelect', size: "small", select: true, style: {
                background: type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'white',
            }, InputProps: {
                onChange: dispatchQueryUpdateAction,
            }, inputRef: inputRef, value: selectedOption, variant: "outlined", fullWidth: true, inputProps: { 'data-testid': 'directory-filter', 'aria-labelledby': 'directorySelect', 'aria-label': getAriaLabel(selectedOption) }, SelectProps: {
                ref: dropDownRef,
                MenuProps: {
                    PaperProps: {
                        sx: { width: dropDownWidth + 'px', maxHeight: '300px', minWidth: '296px' },
                    },
                },
            } }, { children: [!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAll) && _jsx(MenuItem, Object.assign({ "aria-label": translate('all'), value: DirectoryDropdownValues.All, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: translate('all') })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && _jsx(MenuItem, Object.assign({ "aria-label": translate('favorites'), value: DirectoryDropdownValues.FavoriteList, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: translate('favorites') })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAgents) && _jsx(MenuItem, Object.assign({ "aria-label": translate('agents'), value: DirectoryDropdownValues.AgentList, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: translate('agents') })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySkills) && _jsx(MenuItem, Object.assign({ "aria-label": translate('skills'), value: DirectoryDropdownValues.SkillList, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: translate('skills') })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryTeams) && _jsx(MenuItem, Object.assign({ "aria-label": translate('teams'), value: DirectoryDropdownValues.TeamList, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: translate('teams') })), externalDirectoryStatus && directories && directories.map((directory) => _jsx(MenuItem, Object.assign({ "aria-label": directory.directoryName, value: directory.directoryId, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: directory.directoryName }), directory.directoryId)), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryStandardAddressBook) && standardAddressBookNames && standardAddressBookNames.map((item) => _jsx(MenuItem, Object.assign({ "aria-label": item.addressBookName, value: DirectoryDropdownValues.AddressBookList + '_' + item.addressBookId, sx: Object.assign(Object.assign(Object.assign({}, directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.selectableElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.hoveredElement), directoryStyles === null || directoryStyles === void 0 ? void 0 : directoryStyles.focussedElement) }, { children: item.addressBookName }), item.addressBookId))] })) })));
}
;
export default CcfDirectorySelect;
//# sourceMappingURL=ccf-directory-select.js.map