import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MediaType, VoiceContactStatus, contactButtons } from '@nice-devone/common-sdk';
import { CcfCallHungUpIcon, CcfConferenceIcon, CcfIconButton, CcfTooltip, useTranslator, CcfCallKeypadIcon, CcfDivider, DividerOrientation, DividerVariant, CcfTypography, } from '@nice-devone/ui-controls';
import { getDispositionData } from '../../ccf-disposition/ccf-disposition-slice';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInConference, selectUserInConsult, CcfAssignmentAction, voiceContactCardSelector, getActiveContactInSelectedInteraction, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getPanelAppNavigationItems, globalActions, navigateToAppSpaceTab } from '../../global.app.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { CcfOutcomeButton } from '../../ccf-outcome-button/ccf-outcome-button';
import { CallContactEventStatus, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
import { Timer } from '../../../util/timer/timer';
import { AcwType } from '@nice-devone/agent-sdk';
/**
   * @example - <RenderControls />
   * @returns Component with Hangup & Disposition Controls
   */
const RenderControls = ({ voiceContact, controlClicked, onlyShowHangup, activeDisposition, multipleControls, elevatedFrom, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const controls = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callControlButton;
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const usersInConference = useSelector(selectUserInConference);
    const userInConsult = useSelector(selectUserInConsult);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const isCallLive = (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) !== CallContactEventStatus.DISCONNECTED && !onlyShowHangup;
    const serverTimeOffset = LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET);
    const dispositionData = useSelector(getDispositionData);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isSelected = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICE;
    const hasControls = controls && Object.keys(controls).length > 0;
    const isContactSelectedWithDisposOrTags = hasControls && (((_c = (_b = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions) === null || _a === void 0 ? void 0 : _a[voiceContact.contactID]) === null || _b === void 0 ? void 0 : _b.dispositionList) === null || _c === void 0 ? void 0 : _c.length) > 0
        || ((_f = (_e = (_d = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions) === null || _d === void 0 ? void 0 : _d[voiceContact.contactID]) === null || _e === void 0 ? void 0 : _e.tagList) === null || _f === void 0 ? void 0 : _f.length) > 0);
    const isContactInactiveWithDisposOrTags = hasControls && !isSelected && (((_h = (_g = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceContact.contactID]) === null || _g === void 0 ? void 0 : _g.dispositionData) === null || _h === void 0 ? void 0 : _h.length) > 0 || ((_k = (_j = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceContact.contactID]) === null || _j === void 0 ? void 0 : _j.tagList) === null || _k === void 0 ? void 0 : _k.length) > 0);
    const showOutcomesButton = isContactSelectedWithDisposOrTags || isContactInactiveWithDisposOrTags;
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const voiceContactCard = useSelector(voiceContactCardSelector);
    const translatedWork = translate('workItem').split(' ')[0];
    const isDiscarded = ((_l = voiceContactCard[0]) === null || _l === void 0 ? void 0 : _l.contactStatus) === VoiceContactStatus.DISCONNECTED.toString() &&
        voiceContact.acwTypeId === AcwType.DISPOSITION;
    /**
     * template for control end
     * @example
     * ```
     * this.getControlEndTemplate();
     * ```
     */
    const getControlEndTemplate = () => {
        var _a;
        return (!(elevatedFrom && isDiscarded && showOutcomesButton) ? (_jsx(CcfTooltip, Object.assign({ title: translate('hungup'), arrow: true, placement: "top" }, { children: _jsx("div", Object.assign({ role: 'group', "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ tabIndex: 0, onClick: (e) => controlClicked(contactButtons.hungup, e), disabled: !controls.end.isEnable, "data-testid": "end", title: translate('hungup'), "aria-label": translate('hungup'), sx: { color: `${theme.palette.endCall}` } }, { children: _jsx(CcfCallHungUpIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 20 20" }) })) })) }))) : (!isSmView &&
            _jsxs(CcfTypography, Object.assign({ sx: controlStyles.timerStyles }, { children: [translate('outcomes'), ' ', translatedWork, " - ", ' ', _jsx(Timer, { countUp: !!voiceContact.requireDisposition, start: voiceContact.requireDisposition ? 0 : ((voiceContact.maxSecondsACW) || 0) * 1000, stop: voiceContact.requireDisposition ? Number.MAX_SAFE_INTEGER : 0, startReference: Number(voiceContact.lastStateChangeTime) - Number(serverTimeOffset) }, ((_a = voiceContactCard[0]) === null || _a === void 0 ? void 0 : _a.contactId) + '_contactDurationCounter')] }))));
    };
    return (_jsxs(_Fragment, { children: [controls && controls.end && controls.end.isVisible && usersInConference.length <= 1 && !userInConsult ? getControlEndTemplate() : ((usersInConference.length > 1 || userInConsult) && (_jsx(CcfTooltip, Object.assign({ title: translate('multiParty'), arrow: true }, { children: _jsx("div", Object.assign({ "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ "data-testid": "multi-party", tabIndex: 0, onClick: () => {
                            if (isSmView) {
                                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
                                dispatch(globalActions.setSelectedMenu({ name: 'Conference' }));
                            }
                            else {
                                navigateToAppSpaceTab({
                                    dispatch: dispatch,
                                    panelAppNavigationItems: panelAppNavigationItems,
                                    navigation: Navigation.CONFERENCE,
                                });
                            }
                        } }, { children: _jsx(CcfConferenceIcon, { sx: [controlStyles.controlIconsResponsiveStyles, { fill: `${(_m = theme.palette) === null || _m === void 0 ? void 0 : _m.background.dark}` }] }) })) })) })))), controls && isCallLive && (usersInConference.length > 1 || userInConsult) && (_jsx(CcfTooltip, Object.assign({ arrow: true, title: translate('keypad') }, { children: _jsx("div", Object.assign({ "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": contactButtons.keypad, onClick: () => dispatch(CcfAssignmentAction.toggleIVRKeyPad(true)), tabIndex: 0, "data-testid": "keypad" }, { children: _jsx(CcfCallKeypadIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }) })) })) }), 'keypad')), usersInConference.length <= 1 && !userInConsult && showOutcomesButton && ((_o = controls === null || controls === void 0 ? void 0 : controls.end) === null || _o === void 0 ? void 0 : _o.isVisible) && !(elevatedFrom && isDiscarded)
                &&
                    _jsx(CcfDivider, { orientation: DividerOrientation.VERTICAL, variant: DividerVariant.MIDDLE, flexItem: true, sx: controlStyles.ccfDivider }), showOutcomesButton && _jsx(CcfOutcomeButton, { sx: !multipleControls ? { cursor: 'pointer' } : {}, dispositionType: MediaType.VOICE, isSmViewConference: isSmView && usersInConference.length > 1, controlClicked: controlClicked })] }));
};
/**
   * renderMoreThanTwoControls - rendering hangup and resolved icons when we have contact controls more than two
 * @param props - CcfContactControlsProps
 * ```
 * @example-
 * <renderMoreThanTwoControls />
 * ```
 */
export const RenderMoreThanTwoControls = (props) => {
    const { activeDisposition, multipleControls, voiceContact } = props;
    const controls = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callControlButton;
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const usersInConference = useSelector(selectUserInConference);
    const userInConsult = useSelector(selectUserInConsult);
    return (_jsxs(_Fragment, { children: [usersInConference.length <= 1 && !userInConsult && multipleControls && (controls.end.isVisible || activeDisposition) && (_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: controlStyles.horizontalDivider })), (multipleControls || usersInConference.length > 1 || userInConsult) ? (_jsx(Stack, Object.assign({ direction: 'row', justifyContent: 'space-evenly', width: '100%', padding: '5px 0' }, { children: _jsx(RenderControls, Object.assign({}, props)) }))) : (_jsx(RenderControls, Object.assign({}, props)))] }));
};
//# sourceMappingURL=ccf-contact-with-multiple-controls.js.map