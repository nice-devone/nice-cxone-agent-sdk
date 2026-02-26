import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, Grid } from '@mui/material';
import { CcfAssignmentAction, getAllCasesInSelectedDigitalInteraction, getNonIncomingActiveContactInSelectedInteraction, getSelectedInteractionType, getAllCasesInSelectedACDInteraction, getSelectedInteraction, updateDigitalMessageReadStatus, getPreviousAndNextCaseIds, getAllPreviewCasesInSelectedDigitalInteraction, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { MediaType, DigitalContactStatus, InteractionType } from '@nice-devone/common-sdk';
import CcfInteractionSpaceStyles from './ccf-interaction-space-styles';
import { CcfTabsGroup } from './ccf-tabs-group/ccf-tabs-group';
import { CcfPopOverWrapper } from '@nice-devone/ui-controls';
import CcfNavigationItemsStyles from '../ccf-navigation/ccf-navigation-items-styles';
import { getDispositionData } from '../ccf-disposition/ccf-disposition-slice';
import CcfAddChannelOptions from '../ccf-add-channel-options/ccf-add-channel-options';
import { SessionStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CcfVoiceTranscription } from '../ccf-voice-transcription/ccf-voice-transcription';
/**
 * Component displays InteractionSpace for selected contact
 * @returns InteractionSpace for selected contact
 * ```
 * @example
 * <CcfInteractionSpace/>
 * ```
  */
export function CcfInteractionSpace() {
    const [selectedInteractionTabNumber, setSelectedInteractionTabNumber] = useState('');
    const [tabs, setTabs] = useState([]);
    const [disableAddChannel, toggleDisableAddChannel] = useState(false);
    const allCasesInSelectedDigitalInteraction = useSelector(getAllCasesInSelectedDigitalInteraction);
    const previewCases = useSelector(getAllPreviewCasesInSelectedDigitalInteraction);
    const allCaseInSelectedACDInteraction = useSelector(getAllCasesInSelectedACDInteraction);
    const addTabRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const interactionType = useSelector(getSelectedInteractionType);
    const selectedInteraction = useSelector(getSelectedInteraction);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const theme = useTheme();
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-interaction-space');
    const dispositionData = useSelector(getDispositionData);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    let dispositionHeaderShown = false;
    const contactIdOrCaseId = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL
        ? nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId
        : nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId;
    if (nonIncomingActiveContactInSelectedInteraction && contactIdOrCaseId) {
        dispositionHeaderShown = (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[contactIdOrCaseId]) !== undefined;
    }
    /**
     * @param event - React.SyntheticEvent
     * @param newSelectedTab - new selected tab
     * @example - updateSelectedTab(e, newSelectedTab)
     */
    const updateSelectedTab = (_, newSelectedTab) => {
        dispatch(CcfAssignmentAction.setSelectedContactId({
            interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
            contactId: newSelectedTab,
        }));
        dispatch(CcfAssignmentAction.setSelectedContactRoot(newSelectedTab));
        SessionStorageHelper.setItem(StorageKeys.SELECTED_CASE_ID, newSelectedTab);
        ccfLogger.info('AW-25-updateSelectedTab', newSelectedTab.toString());
    };
    /**
     * Function closes the popover
     * @example closePopover
     */
    const closePopover = () => {
        setAnchorEl(null);
    };
    /**
     * Function pins the popover next to add button
     * @example showElevationPopover(e)
     */
    const showElevationPopover = () => {
        setAnchorEl(addTabRef.current);
    };
    /**
     * Function to discard the tab properly
     * @example - closeTab(lastTabNumber)
     */
    const closeTab = (caseId) => {
        const updatedTabs = tabs === null || tabs === void 0 ? void 0 : tabs.filter((tab) => tab.id !== caseId);
        setTabs(updatedTabs);
        ccfLogger.info('AW-25-closeTab', caseId);
    };
    /**
     * Update tabs with proper cases information for the selected interaction
     * @example - updatetabs(allCases)
     */
    const updatetabs = (allCases, _type) => {
        var _a;
        if (allCases && ((_a = Object.keys(allCases)) === null || _a === void 0 ? void 0 : _a.length) > 0 && selectedInteraction) {
            const tabsLocal = [];
            Object.keys(allCases).reverse().forEach((id) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                let isPreviewCase = false;
                if (allCases[id].media === MediaType.DIGITAL) {
                    isPreviewCase = ((_b = (_a = allCases[id]) === null || _a === void 0 ? void 0 : _a.contactStatus) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== ((_c = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.DRAFT) === null || _c === void 0 ? void 0 : _c.toLowerCase()) &&
                        ((_e = (_d = allCases[id]) === null || _d === void 0 ? void 0 : _d.contactStatus) === null || _e === void 0 ? void 0 : _e.toLowerCase()) !== ((_f = DigitalContactStatus === null || DigitalContactStatus === void 0 ? void 0 : DigitalContactStatus.INCOMING) === null || _f === void 0 ? void 0 : _f.toLowerCase()) &&
                        !((_g = allCases[id]) === null || _g === void 0 ? void 0 : _g.isAssignedToAgentInbox);
                }
                tabsLocal.push({
                    interactionId: selectedInteraction,
                    caseId: ((_h = allCases[id]) === null || _h === void 0 ? void 0 : _h.media) === MediaType.WORKITEM ? undefined : allCases[id].caseId,
                    contactId: (_j = allCases[id]) === null || _j === void 0 ? void 0 : _j.contactId,
                    createdAt: allCases[id].createdAt,
                    id: ((_k = allCases[id]) === null || _k === void 0 ? void 0 : _k.media) === MediaType.WORKITEM ? (_l = allCases[id]) === null || _l === void 0 ? void 0 : _l.contactId : (_m = allCases[id]) === null || _m === void 0 ? void 0 : _m.caseId,
                    isPreviewCase,
                    value: ((_o = allCases[id]) === null || _o === void 0 ? void 0 : _o.media) === MediaType.WORKITEM ? (_p = allCases[id]) === null || _p === void 0 ? void 0 : _p.contactId : (_q = allCases[id]) === null || _q === void 0 ? void 0 : _q.caseId,
                });
            });
            const sortedTabsLocal = tabsLocal.sort((a, b) => {
                if (a.createdAt < b.createdAt)
                    return -1;
                if (a.createdAt > b.createdAt)
                    return 1;
                return 0;
            });
            setTabs(sortedTabsLocal);
        }
        ccfLogger.info('AW-25-updatetabs', JSON.stringify(allCases));
    };
    useEffect(() => {
        if ((interactionType === null || interactionType === void 0 ? void 0 : interactionType.toLowerCase()) === MediaType.WORKITEM.toLowerCase()) {
            updatetabs(allCaseInSelectedACDInteraction, 'acd');
        }
        else {
            updatetabs(allCasesInSelectedDigitalInteraction, 'digital');
        }
    }, [
        selectedInteraction,
        previewCases.length,
        Object.keys(allCasesInSelectedDigitalInteraction !== null && allCasesInSelectedDigitalInteraction !== void 0 ? allCasesInSelectedDigitalInteraction : {}).length,
        Object.keys(allCaseInSelectedACDInteraction !== null && allCaseInSelectedACDInteraction !== void 0 ? allCaseInSelectedACDInteraction : {}).length
    ]);
    useEffect(() => {
        if (interactionType === InteractionType.WORKITEM) {
            toggleDisableAddChannel(true);
        }
        else if ((interactionType === InteractionType.DIGITAL || interactionType === InteractionType.ELEVATED) && allCasesInSelectedDigitalInteraction) {
            toggleDisableAddChannel(() => {
                if (Object.keys(allCasesInSelectedDigitalInteraction).some((contact) => (allCasesInSelectedDigitalInteraction[contact].contactStatus === DigitalContactStatus.DRAFT)) || Object.keys(allCasesInSelectedDigitalInteraction).every((contact) => (allCasesInSelectedDigitalInteraction[contact].contactStatus === DigitalContactStatus.CLOSED ||
                    !allCasesInSelectedDigitalInteraction[contact].isAssignedToAgentInbox //Check for preview
                ))) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        else {
            toggleDisableAddChannel(true);
        }
    }, [
        tabs,
        interactionType,
        nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus,
        selectedInteraction,
        nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isAssignedToAgentInbox //Check for preview
    ]);
    useEffect(() => {
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)) {
            dispatch(CcfAssignmentAction.setThreadId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.threadId));
            if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== DigitalContactStatus.DRAFT &&
                (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) &&
                (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId)) {
                dispatch(updateDigitalMessageReadStatus({
                    interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
                    caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                }));
                if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isPrivate)
                    dispatch(getPreviousAndNextCaseIds({
                        interactionId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId,
                        selectedCaseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                        contactId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                    }));
            }
            nonIncomingActiveContactInSelectedInteraction.media === MediaType.WORKITEM
                ? setSelectedInteractionTabNumber(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)
                : setSelectedInteractionTabNumber(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId);
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]);
    const themeStyles = CcfInteractionSpaceStyles(theme, dispositionHeaderShown);
    const styles = CcfNavigationItemsStyles(theme);
    return (nonIncomingActiveContactInSelectedInteraction && (nonIncomingActiveContactInSelectedInteraction.media === MediaType.DIGITAL || nonIncomingActiveContactInSelectedInteraction.media === MediaType.WORKITEM)
        ? _jsx(Grid, Object.assign({ sx: themeStyles.rightGridContainer }, { children: _jsxs(Grid, Object.assign({ item: true, padding: 1, xs: 8, sx: Object.assign(Object.assign({ display: { xl: 'flex' } }, styles.interactionSpaceResponsive), themeStyles.heightFull), xl: 12 }, { children: [_jsx(CcfTabsGroup, { tabs: tabs, onTabClose: closeTab, showPopOver: showElevationPopover, selectedTab: selectedInteractionTabNumber, updateSelectedTab: updateSelectedTab, disableAddChannel: disableAddChannel, ref: addTabRef }), _jsx(CcfPopOverWrapper, Object.assign({ id: 'elevation-popover', anchorReference: 'anchorEl', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, open: open, anchorEl: anchorEl, handleClose: closePopover }, { children: _jsx(CcfAddChannelOptions, { handleClose: closePopover }) }))] })) }))
        : _jsx(CcfVoiceTranscription, { contact: nonIncomingActiveContactInSelectedInteraction, selectedInteractionId: selectedInteraction }));
}
export default memo(CcfInteractionSpace);
//# sourceMappingURL=ccf-interaction-space.js.map