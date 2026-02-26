import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CcfNavigationIcon, CcfTable, CcfTypography, useTranslator, CcfButton, CcfTooltip } from '@nice-devone/ui-controls';
import CcfAppQueueCounterChannelsStyles from './ccf-app-queue-counter-channels.styles';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillDetails, startAgentSkillActivityPolling, stopAgentSkillActivityPolling } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { CHANNEL_ICON_NAME, iconList } from '../ccf-icon/ccf-icon-list';
import { convertMinutestoHours } from '../../util/uiValidationUtils';
import { MediaTypeId } from '@nice-devone/common-sdk';
import { Navigation } from '../../enums/navigation-menus';
import { getSelectedMenuName, globalActions } from '../global.app.slice';
import { selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
/**
 * Component displays queue counter channel details
 * @returns queue counter header and table
 * @example <CcfAppQueueCounterChannels/>
 */
export function CcfAppQueueCounterChannels({ isAppSpace }) {
    var _a;
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isMdView = useMediaQuery('(max-width:575px)'); // Need to remove it after breakpoints added into theme file
    const queueCounterStyles = CcfAppQueueCounterChannelsStyles(theme, isSmView, isAppSpace);
    const [translate] = useTranslator();
    const queueSkillDetails = useSelector(getAllSkillDetails);
    const [rowItemClicked, setRowItemClicked] = useState(0);
    const [skillDetailsScreen, setSkillDetailsScreen] = useState(false);
    const tableHeaders = isMdView ? [translate('channel'), translate('contacts'), ''] : [translate('channel'), translate('contactsInQueue'), translate('wait'), ''];
    const colWidths = ['40%', '25%', '25%', '10%'];
    const colWidthsMdView = ['60%', '30%', '10%'];
    const selectedMenu = useSelector(getSelectedMenuName);
    const activeTabLabel = (_a = useSelector(selectAppSpaceActiveTabStatus)) === null || _a === void 0 ? void 0 : _a.tab;
    const dispatch = useDispatch();
    const [QueueSkillDetails, setQueueSkillDetails] = useState(null);
    const [colWidthsState, setColWidthsState] = useState([]);
    useEffect(() => {
        setColWidthsState(isMdView ? colWidthsMdView : colWidths);
    }, [isMdView]);
    useEffect(() => {
        if (selectedMenu === Navigation.QUEUE || activeTabLabel === Navigation.QUEUE) {
            dispatch(startAgentSkillActivityPolling({}));
        }
        //component unmount
        return () => {
            dispatch(stopAgentSkillActivityPolling());
        };
    }, [selectedMenu, activeTabLabel]);
    /**
     * Used to get table rows data
     * @example
     * getTableHeaders()
     */
    const createRowData = (key, icon, iconString, totalContacts, longestWait) => {
        return {
            key: key,
            label: iconString.toString(),
            data: [_jsxs(Box, Object.assign({ style: queueCounterStyles.containerBox }, { children: [iconList[icon]('20px'), _jsx(CcfTypography, { variant: 'h4', sx: queueCounterStyles.iconHeaderClasses, translationKey: iconString, title: translate(iconString), "aria-label": translate(iconString) })] }), `${key}_iconString`), _jsx(CcfTypography, Object.assign({ variant: 'h4', title: totalContacts.toString(), "aria-label": totalContacts.toString() }, { children: totalContacts }), `${key}_totalContacts`), _jsx(CcfTypography, Object.assign({ variant: 'h4', title: longestWait.toString(), "aria-label": longestWait }, { children: longestWait }), `${key}_longestWait`), _jsx(CcfTooltip, Object.assign({ title: `${translate('moreInformationQueue')} ${translate(iconString)}`, arrow: true }, { children: _jsx(Box, Object.assign({ sx: queueCounterStyles.moreInfoContainer }, { children: _jsxs(CcfButton, Object.assign({ type: "button", sx: queueCounterStyles.buttonIconStyle, "aria-label": `${translate('moreInformationQueue')} ${translate(iconString)}`, onClick: (e) => {
                                e.stopPropagation();
                                setRowItemClicked(key);
                                setSkillDetailsScreen(true);
                                dispatch(globalActions.setAriaLiveAnnouncer({
                                    ariaMessage: `${translate(iconString)} panel hidden. Skill details displayed`,
                                }));
                            }, disableRipple: true }, { children: [_jsx("span", Object.assign({ style: { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 } }, { children: `${translate('moreInformationQueue')} ${translate(iconString)}` })), _jsx(CcfNavigationIcon, { viewBox: '0 0 18 18', sx: queueCounterStyles.navigationIcon, "aria-hidden": "true", focusable: "false" })] })) })) }), `${key}_queueCounterStyles`)
            ],
        };
    };
    const structuredRowData = [
        createRowData(MediaTypeId.Digital, CHANNEL_ICON_NAME.DIGITAL, 'digital', queueSkillDetails.totalDigitalContacts, convertMinutestoHours(queueSkillDetails.longestDigitalWait)),
        createRowData(MediaTypeId.PhoneCall, CHANNEL_ICON_NAME.VOICE_IB, 'inboundVoice', queueSkillDetails.totalPhoneContacts, convertMinutestoHours(queueSkillDetails.longestPhoneWait)),
        createRowData(MediaTypeId.VoiceEmail, CHANNEL_ICON_NAME.VOICEMAIL, 'voicemail', queueSkillDetails.totalVoiceMailContacts, convertMinutestoHours(queueSkillDetails.longestVoiceMailWait)),
        createRowData(MediaTypeId.WorkItem, CHANNEL_ICON_NAME.WORK_ITEM, 'workItem', queueSkillDetails.totalWorkItemContacts, convertMinutestoHours(queueSkillDetails.longestWorkItemWait))
    ];
    /**
     * Used to get table row data based on resolution
     * @example
     * getRowData()
     */
    const getRowData = () => {
        return isMdView ? structuredRowData.filter((rowDetails) => rowDetails.data.splice(2, 1)) : structuredRowData;
    };
    /**
     * Used to get column Widths
     * @example
     * const getColWidths()
     */
    const getColWidths = () => {
        return isMdView ? colWidthsMdView : colWidths;
    };
    /**
     * Used to handle rowclick of table
     * @example
     * const onClick = handleTableRow
     */
    const onRowClick = (rowData) => {
        var _a;
        rowData.key && setRowItemClicked(rowData.key);
        setSkillDetailsScreen && setSkillDetailsScreen(true);
        (rowData === null || rowData === void 0 ? void 0 : rowData.label) && dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: ((_a = rowData === null || rowData === void 0 ? void 0 : rowData.label) !== null && _a !== void 0 ? _a : '') + ' panel hidden. Skill details displayed' }));
    };
    useEffect(() => {
        if (skillDetailsScreen) {
            /**
            * lazily loaded the skill details
            * @example renderSkillDetails()
            */
            const renderSkillDetails = () => __awaiter(this, void 0, void 0, function* () {
                setQueueSkillDetails(null);
                const skillDetails = yield import('../ccf-skill-details/ccf-skill-details');
                const SkillDetails = skillDetails.CcfSkillDetails;
                setQueueSkillDetails(_jsx(SkillDetails, { setSkillDetailsScreen: setSkillDetailsScreen, isAppSpace: isAppSpace, rowItemClicked: rowItemClicked }));
            });
            renderSkillDetails();
        }
    }, [skillDetailsScreen]);
    return (_jsx(Box, Object.assign({ style: { height: '100%' } }, { children: !skillDetailsScreen ?
            _jsx(Box, Object.assign({ sx: queueCounterStyles.channelDetails }, { children: _jsx(Box, Object.assign({ sx: queueCounterStyles.tableDetails }, { children: _jsx(CcfTable, { tableStyle: queueCounterStyles.tableStyle, colWidths: colWidthsState, headersData: tableHeaders, rowsData: getRowData(), rowStyle: queueCounterStyles.tableBodyRow, headerStyle: queueCounterStyles.tableHeadRow, containerStyle: queueCounterStyles.customTableContainer, onRowClick: onRowClick, stickyHeader: true }) })) }))
            : QueueSkillDetails })));
}
//# sourceMappingURL=ccf-app-queue-counter-channels.js.map