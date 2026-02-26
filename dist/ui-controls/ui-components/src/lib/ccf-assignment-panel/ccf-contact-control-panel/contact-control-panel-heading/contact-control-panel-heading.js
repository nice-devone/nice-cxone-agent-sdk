import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DigitalChannelType, MediaType } from '@nice-devone/common-sdk';
import { CcfChatIcon, CcfFacebookIcon, CcfHeader, CcfLinkedinIcon, CcfPopOver, CcfSmsIcon, CcfTwitterIcon, CcfTypography, CcfWhatsAppIcon, useTranslator, CcfUpArrowIcon, CcfPopOverWrapper, CcfPhoneInboundRevampedIcon, CcfPhoneOutboundRevampedIcon, CcfTooltip, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import { selectInboxCollapsedState, CcfAssignmentAction, } from '../../ccf-assignment-panel.slice';
import { commitmentActions, getCommitmentPermission } from '../../../ccf-commitment/ccf-commitment.slice';
import { getPanelAppNavigationItems, globalActions, } from '../../../global.app.slice';
import { Navigation } from '../../../../enums/navigation-menus';
import { updateAppSpaceTabStatus } from '../../../ccf-app-space/ccf-app-space.slice';
import { phoneOBSkillsSelector } from '../../../ccf-agent-skill/ccf-agent-skill-details-slice';
import contactControlPanelHeadingStyles from './contact-control-panel-heading.style';
import CcfAddChannelOptions from '../../../ccf-add-channel-options/ccf-add-channel-options';
import { getAgentProfileSettings } from '../../../ccf-agent-setting/ccf-agent-setting-slice';
import { agentProfileToast } from '../../../../util/toastMessageHelper';
/**
 * Component display control panel Heading, it cosnist of common header and dropdown items
 * @param props - ContactControlPanelHeadingProps
 * ```
 * @example -
 * const headerText = 'Liam Davis'
 * const headerTextClassess = 'controlButtonHeaderText'
 * <ContactControlPanelHeading headerText={headerText} headerTextClassess={'controlButtonHeaderText'} contact={contact} />
 * ```
 */
export function ContactControlPanelHeading(props) {
    const { popOverMenuItems, setPopOverMenuItems, onVoiceTranscriptToggle } = props;
    const theme = useTheme();
    const styles = contactControlPanelHeadingStyles(theme);
    const [translate] = useTranslator();
    const IconsLeftMap = new Map([
        [MediaType.VOICE.toString(), props.contact.isInbound ? _jsx(CcfTooltip, Object.assign({ title: translate('ib_call'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneInboundRevampedIcon, { sx: Object.assign(Object.assign({}, styles.controlPanelHeaderLeftIcon), styles.phonefillColor) }) }), MediaType.VOICE) : _jsx(CcfTooltip, Object.assign({ title: translate('ob_call'), disableInteractive: true, arrow: true }, { children: _jsx(CcfPhoneOutboundRevampedIcon, { sx: Object.assign(Object.assign({}, styles.controlPanelHeaderLeftIcon), styles.phonefillColor) }) }), MediaType.VOICE)],
        [DigitalChannelType.TWITTER.toString(), _jsx(CcfTwitterIcon, { id: 'cuntrolPanelTwitterIcn', sx: styles.controlPanelHeaderLeftIcon }, DigitalChannelType.TWITTER)],
        [DigitalChannelType.FACEBOOK.toString(), _jsx(CcfFacebookIcon, { id: 'fbIconControlPanel', sx: styles.controlPanelHeaderLeftIcon }, DigitalChannelType.FACEBOOK)],
        [DigitalChannelType.LINKEDIN.toString(), _jsx(CcfLinkedinIcon, { sx: styles.controlPanelHeaderLeftIcon }, DigitalChannelType.LINKEDIN)],
        [DigitalChannelType.CHAT.toString(), _jsx(CcfChatIcon, { sx: styles.controlPanelHeaderLeftIcon, viewBox: "0 0 19 19" }, DigitalChannelType.CHAT)]
    ]);
    const isInboxCollpased = useSelector(selectInboxCollapsedState);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    const { create: hasCreateCommitmentPermission } = useSelector(getCommitmentPermission) || {};
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const toastId = useRef('');
    /**
     * Function pins the contact control panel outside assignment box
     * @param event -React.MouseEvent<HTMLElement>
     * @example pinControl(event?)
     */
    const handleClick = (event) => {
        setAnchorEl(event);
    };
    /**
     * Function pins the contact control panel outside assignment box
     * @param event -React.MouseEvent<HTMLElement>
     * @example pinControl(event?)
     */
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    // const initialPopOverMenuList = {
    //   menuItems: [
    //     {
    //       items: [
    //         ...contactControl
    //       ],
    //     }
    //   ],
    // };
    // const [popOverMenuItems, setPopOverMenuItems] = useState(
    //   initialPopOverMenuList
    // );
    const [, setShowDetailedPopOverMenu] = useState(false);
    // const callConferenceState = useSelector(getCallConferenceState)
    // useEffect(() => {
    //   setPopOverMenuItems((popOverMenuItems) => ({
    //     ...popOverMenuItems,
    //     menuItems: popOverMenuItems.menuItems.map(menuItem => ({
    //       ...menuItem,
    //       items: menuItem.items.map(item => 
    //         item.translationKey === 'addOutbound' ? { ...item, disabled: !!callConferenceState.isActiveConference } : item
    //       ),
    //     })),
    //   }))
    // }, [callConferenceState.isActiveConference])
    /**
     * Function pins the contact control panel outside assignment box
     * @param event -React.MouseEvent<HTMLElement>
     * @example pinControl(event?)
     */
    const pinControl = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
    };
    /**
     * Functions docks the contact control panel to inbox card
     * @example dockControl()
     */
    const dockControl = () => {
        if (isInboxCollpased) {
            dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: false }));
        }
    };
    /**
     * Function to on selecting popover item selection
     * @param item -PopOverMenuItem
     * @param event -React.MouseEvent<HTMLElement>
     * @example - onPopOverItemSelection(item, e, anchorEl)
     */
    const onPopOverItemSelection = (item, event, anchorEl) => () => {
        switch (item.type) {
            case 'pinControl':
                return pinControl(event);
            case 'dockControls':
                return dockControl();
            case 'sms':
                setPopOverMenuItems({
                    menuItems: [
                        {
                            items: [
                                {
                                    label: translate('back'),
                                    icon: (_jsx(CcfUpArrowIcon, { className: "actionIconStyle backArrowIcon" })),
                                    type: 'backToInitialMenu',
                                    closeOnSelection: false,
                                },
                                {
                                    label: props.contact.skill,
                                    icon: _jsx(CcfSmsIcon, { id: 'controlPanelMSIcon', className: "actionIconStyle" }),
                                    type: 'smsChat',
                                    closeOnSelection: true,
                                },
                                {
                                    label: props.contact.skill,
                                    icon: _jsx(CcfWhatsAppIcon, { className: "actionIconStyle" }),
                                    type: 'whatsapp',
                                    closeOnSelection: true,
                                }
                            ],
                        }
                    ],
                });
                setShowDetailedPopOverMenu(true);
                return;
            case 'backToInitialMenu':
                navigateToInitialPopOverState();
                return;
            case 'commitment':
                navigateToCommitmentForm();
                return;
            case 'elevation':
                anchorEl && handleClick(anchorEl);
                return;
            case 'voiceTranscript': {
                onVoiceTranscriptToggle();
                return;
            }
            default:
                return;
        }
    };
    /**
     * Function to navigate to commitment form
     * @example navigateToCommitmentForm()
     */
    const navigateToCommitmentForm = () => {
        if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule) {
            const toastInfo = {
                isError: true,
                messageKey: 'agentProfileGenericErrorToastMessage',
                toastId: toastId,
            };
            agentProfileToast(toastInfo);
            return;
        }
        dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
        const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.CALENDAR && !tab.isHidden);
        dispatch(updateAppSpaceTabStatus({
            index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
            tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
        }));
        dispatch(commitmentActions.addCommitmentEvent(true));
        dispatch(commitmentActions.showCommitmentForm(true));
    };
    /**
     * Function to navigate to initial pop over state
     * @example navigateToInitialPopOverState()
     */
    const navigateToInitialPopOverState = () => {
        initialPopOver();
        setShowDetailedPopOverMenu(false);
        setPopOverMenuItems(popOverMenuItems);
    };
    /**
     * Function to display inital popover when popover icon is clicked
     * @example initialPopOver()
     */
    const initialPopOver = () => {
        return (_jsx(CcfTypography, { children: _jsx(Box, Object.assign({ sx: {
                    marginTop: '3px',
                    marginRight: '3px'
                } }, { children: _jsx(CcfPopOver, { anchorOrigin: { horizontal: 'right', vertical: 'top' }, transformOrigin: { horizontal: 'left', vertical: 'top' }, onPopOverItemSelection: onPopOverItemSelection, navigateToInitialPopOverState: navigateToInitialPopOverState, optionList: popOverMenuItems, propogateOnClickEvent: false, tooltipTitle: 'more', tooltipArrow: true }) })) }));
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.controlHeader }, { children: [_jsx(CcfHeader, { LeftIcon: props.contact.type === 'VoiceContact'
                            ? _jsx(_Fragment, { children: IconsLeftMap.get(MediaType.VOICE) })
                            : undefined, headerText: props.headerText, headerTextClassess: props.headerTextClassess, RightIcon: false }), initialPopOver()] })), _jsx(Divider, { variant: "fullWidth", className: "horizontalDivider" }), _jsx(CcfPopOverWrapper, Object.assign({ id: 'elevation-popover', anchorReference: 'anchorEl', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, open: open, anchorEl: anchorEl, handleClose: handleClose }, { children: _jsx(CcfAddChannelOptions, { handleClose: handleClose }) }))] }));
}
export default ContactControlPanelHeading;
//# sourceMappingURL=contact-control-panel-heading.js.map