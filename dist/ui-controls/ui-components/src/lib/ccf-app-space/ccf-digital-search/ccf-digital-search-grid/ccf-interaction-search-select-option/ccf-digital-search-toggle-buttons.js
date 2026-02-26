import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useTranslator, CcfTypography, CcfToggleButton, CcfBackIcon, CcfInfoIcon, CcfClipboardCheckIcon } from '@nice-devone/ui-controls';
import { useTheme, Box } from '@mui/material';
import CcfDigitalSearchToggleButtonsStyle from './ccf-digital-search-toggle-buttons.styles';
import { CcfDigitalSearchAssignment } from '../ccf-digital-search-assigment';
import { CcfDigitalSearchStatusChange } from '../ccf-digital-search-status-change';
import { CcfInteractionReply } from '../ccf-interaction-reply';
import { InteractionSearchStatus } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { assignDigitalContact, ccfDigitalSearchActions, DIGITAL_SEARCH_FILTERS, getAgentListData, getGridData, getSelectedRowContacts } from '../../ccf-digital-search.slice';
export var BULK_MODIFICATION_TABS;
(function (BULK_MODIFICATION_TABS) {
    BULK_MODIFICATION_TABS["ASSIGN_TO_ME"] = "assignToMe";
    BULK_MODIFICATION_TABS["ASSIGN_TO_OTHERS"] = "assignToOthers";
    BULK_MODIFICATION_TABS["EDIT_STATUS"] = "changeStatus";
    BULK_MODIFICATION_TABS["REPLY"] = "reply";
})(BULK_MODIFICATION_TABS || (BULK_MODIFICATION_TABS = {}));
/**
 * Component to show the Select Options assignment menu for the interaction search on row selection
 * @example
 * ```
 * <CcfDigitalSearchToggleButtons />
 * ```
 */
export const CcfDigitalSearchToggleButtons = (props) => {
    var _a, _b;
    const theme = useTheme();
    const appSpaceSizes = props.isAppSpace && JSON.parse(LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO) || '{}');
    const [textFieldWidth, setTextFieldWidth] = useState('');
    const styles = CcfDigitalSearchToggleButtonsStyle(theme);
    const [translate] = useTranslator();
    const [toggle, setToggle] = useState('');
    const gridData = useSelector(getGridData);
    const selections = useSelector(getSelectedRowContacts); // selector can be used in API calls to get the list of digital case ids
    const dispatch = useDispatch();
    const toastId = useRef('');
    const currentCxoneUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const [closedInteraction, setClosedInteraction] = useState(false);
    const [showErrorMessage, setErrorMessageVisibility] = useState(false);
    const agentList = (_a = useSelector(getAgentListData)) !== null && _a !== void 0 ? _a : [];
    const interactionTabs = {
        [BULK_MODIFICATION_TABS.ASSIGN_TO_ME]: {
            translationKey: 'assignToMe',
        },
        [BULK_MODIFICATION_TABS.ASSIGN_TO_OTHERS]: {
            translationKey: 'assignToOthers',
            component: _jsx(CcfDigitalSearchAssignment, {}),
        },
        [BULK_MODIFICATION_TABS.EDIT_STATUS]: {
            translationKey: 'changeStatus',
            component: _jsx(CcfDigitalSearchStatusChange, {}),
        },
        [BULK_MODIFICATION_TABS.REPLY]: {
            translationKey: 'sendMessage',
            component: _jsx(CcfInteractionReply, { textFieldWidth: textFieldWidth }),
        },
    };
    useEffect(() => {
        setTextFieldWidth(() => {
            if (props.isAppSpace) {
                if (appSpaceSizes[1] < 51) {
                    return '100%';
                }
                else
                    return '60%';
            }
            else
                return '60%';
        });
    }, [appSpaceSizes, props.isAppSpace]);
    useEffect(() => {
        var _a, _b, _c, _d;
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName: DIGITAL_SEARCH_FILTERS.AGENT, filterValues: { id: (_a = agentList[0]) === null || _a === void 0 ? void 0 : _a.id, userId: (_b = agentList[0]) === null || _b === void 0 ? void 0 : _b.userId, name: (_c = agentList[0]) === null || _c === void 0 ? void 0 : _c.name, agentStatus: (_d = agentList[0]) === null || _d === void 0 ? void 0 : _d.agentStatus } }));
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName: DIGITAL_SEARCH_FILTERS.SKILL, filterValues: [] }));
    }, []);
    useEffect(() => {
        const selectedClosedRowData = selections === null || selections === void 0 ? void 0 : selections.filter((id) => gridData === null || gridData === void 0 ? void 0 : gridData.find((row) => row.id === id && row.status === InteractionSearchStatus.CLOSED));
        if (selectedClosedRowData.length > 0) {
            setClosedInteraction(true);
            setErrorMessageVisibility(true);
            return;
        }
        setClosedInteraction(false);
        setErrorMessageVisibility(false);
    }, [selections, gridData]);
    /**
      * Used to handle selected toggle button
      * @param _event - MouseEvent
      * @returns - void
      * @example - handleChange(e)
    */
    const handleChange = (_event, selectedToggle) => {
        if (selectedToggle === toggle) {
            setToggle('');
        }
        else {
            setToggle(selectedToggle);
            if (selectedToggle === BULK_MODIFICATION_TABS.ASSIGN_TO_ME && !closedInteraction) {
                dispatch(assignDigitalContact({
                    selectedContactIds: selections,
                    cxoneUserId: currentCxoneUser.userId,
                    toastId: toastId,
                }));
            }
        }
    };
    return _jsxs(Box, Object.assign({ sx: styles.parentTabBox }, { children: [_jsx(Box, Object.assign({ sx: styles.bulkModificationButtons, display: "flex" }, { children: Object.keys(interactionTabs).map((tab) => {
                    return _jsxs(CcfToggleButton, Object.assign({ value: tab, selected: toggle === tab, onClick: (e) => handleChange(e, tab) }, { children: [interactionTabs[tab].translationKey === BULK_MODIFICATION_TABS.ASSIGN_TO_ME ? _jsx(CcfClipboardCheckIcon, { viewBox: '-2 0 20 15', fill: theme.palette.text.clearText }) :
                                (_jsx(CcfBackIcon, { sx: toggle === tab ? styles.downIcon : styles.backIcon })), _jsx(CcfTypography, Object.assign({ sx: styles.tabHeading }, { children: translate(interactionTabs[tab].translationKey) }))] }), tab);
                }) })), toggle && _jsxs(Box, Object.assign({ sx: styles.tabContainer }, { children: [interactionTabs[toggle].component, showErrorMessage && interactionTabs[toggle].translationKey === BULK_MODIFICATION_TABS.ASSIGN_TO_ME &&
                        _jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.messageWrapper), { marginTop: '0px' }) }, { children: [_jsx(CcfInfoIcon, { htmlColor: (_b = theme.palette.error) === null || _b === void 0 ? void 0 : _b.main, fontSize: 'large' }), _jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: Object.assign(Object.assign({}, styles.statusMessage), { color: `${theme.palette.endCall}` }) }, { children: [_jsx(Box, Object.assign({ fontWeight: 'bold', display: 'inline' }, { children: translate('closed') })), " ", translate('closedCaseAssignmentMessage')] }))] }))] }))] }));
};
//# sourceMappingURL=ccf-digital-search-toggle-buttons.js.map