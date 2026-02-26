import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme, useMediaQuery, Paper, Box } from '@mui/material';
import { CcfAvailableIcon, CcfTypography, CcfWorkingIcon, CcfUnavailableIcon, CcfBackIcon, CcfTable, useTranslator, CcfNoAssignmentIcon, CcfTooltip } from '@nice-devone/ui-controls';
import skillDetailsStyles from './ccf-skill-details.styles';
import { useSelector } from 'react-redux';
import { iconList } from '../ccf-icon/ccf-icon-list';
import { getAgentSkillsAndQueueDetails, getAllSkillDetails } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { memo, useEffect, useState } from 'react';
import { convertMinutestoHours } from '../../util/uiValidationUtils';
import { EventKeys, MediaTypeId } from '@nice-devone/common-sdk';
/**-
 * component for CcfSkillDetails
 * @returns component for rendering the Skill Details
 * @example <CcfSkillDetails />
 */
export function CcfSkillDetails({ setSkillDetailsScreen, isAppSpace, rowItemClicked }) {
    const theme = useTheme();
    const isMdView = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.md, theme.breakpoints.values.lg));
    const isSmView = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md));
    const [translate] = useTranslator();
    const styles = skillDetailsStyles(theme, isMdView, isAppSpace);
    const inboundSkills = useSelector(getAgentSkillsAndQueueDetails);
    const queueSkillDetails = useSelector(getAllSkillDetails);
    const [totalContacts, setTotalContacts] = useState(0);
    const [backButtonText, setBackButtonText] = useState('inboundVoice');
    const [skillIcon, setSkillIcon] = useState('ib-call');
    const tableHeadersXlView = [translate('skillname'), translate('inQueue'), translate('longestWait'), translate('agentStates')];
    const tableHeadersMdView = [translate('skillname'), translate('inQueue'), translate('wait')];
    const tableHeadersSmView = [translate('skillname'), translate('inQueue')];
    const colWidthsXlView = ['30%', '15%', '25%', '30%'];
    const colWidthsMdView = ['50%', '20%', '30%'];
    const colWidthsSmView = ['70%', '30%'];
    const rowData = [];
    const filteredSkill = inboundSkills.filter((skill) => { return skill.mediaType === rowItemClicked; });
    const totalSkills = filteredSkill.length;
    if (totalSkills > 0) {
        filteredSkill.forEach(skill => {
            const dataStructured = [_jsxs(Box, Object.assign({ style: { display: 'flex' } }, { children: [iconList[skillIcon]('1.25rem'), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.iconHeaderClasses, title: skill.skillName, "aria-label": skill.skillName }, { children: skill.skillName }))] }), skill.skillId), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.tableLabels, title: skill.queueCount.toString(), "aria-label": skill.queueCount.toString() }, { children: skill.queueCount }), `${skill.skillId}_queueCount`), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.tableLabels, title: convertMinutestoHours(skill.longestQueueTimeInSeconds).toString(), "aria-label": convertMinutestoHours(skill.longestQueueTimeInSeconds).toString() }, { children: convertMinutestoHours(skill.longestQueueTimeInSeconds) }), `${skill.skillId}_longestQueueTimeInSeconds`), _jsxs(Box, Object.assign({ sx: styles.tableRowContainer, title: `${translate('working')} ${translate('agents')}: ${skill.agentsWorking}` }, { children: [_jsxs(Box, Object.assign({ sx: styles.tableRowContainer, title: `${translate('available')} ${translate('agents')}: ${skill.agentsAvailable}` }, { children: [_jsx(CcfAvailableIcon, { "aria-label": translate('available') }), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.agentStatesLabel, "aria-label": skill.agentsAvailable.toString() }, { children: skill.agentsAvailable }))] })), _jsxs(Box, Object.assign({ sx: styles.tableRowContainer }, { children: [_jsx(CcfWorkingIcon, { "aria-label": translate('working') }), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.agentStatesLabel, "aria-label": skill.agentsWorking.toString() }, { children: skill.agentsWorking }))] })), _jsxs(Box, Object.assign({ sx: styles.tableRowContainer, title: `${translate('unavailable')} ${translate('agents')}: ${skill.agentsUnavailable}` }, { children: [_jsx(CcfUnavailableIcon, { "aria-label": translate('unavailable') }), _jsx(CcfTypography, Object.assign({ variant: 'h4', sx: styles.agentStatesLabel, "aria-label": skill.agentsUnavailable.toString() }, { children: skill.agentsUnavailable }))] }))] }), `${skill.skillId}_agentsWorking`)
            ];
            const object = { data: dataStructured };
            rowData.push(object);
        });
    }
    /**
     * Used to navigate between channel and skill details screen
     * @example
     * const onClick = back icon
     */
    const handleBack = () => {
        setSkillDetailsScreen && setSkillDetailsScreen(false);
    };
    /**
     * Used to navigate between channel and skill details screen
     * @example
     * const onClick = back icon
     */
    const getTableHeaders = () => {
        if (isMdView) {
            return tableHeadersMdView;
        }
        else if (isSmView) {
            return tableHeadersSmView;
        }
        else {
            return tableHeadersXlView;
        }
    };
    /**
     * Used to get column widths of table
     * @example
     * const getColWidths()
     */
    const getColWidths = () => {
        if (isMdView) {
            return colWidthsMdView;
        }
        else if (isSmView) {
            return colWidthsSmView;
        }
        else {
            return colWidthsXlView;
        }
    };
    /**
     * Used to get rows data of table
     * @example
     * const getRowData()
     */
    const getRowData = () => {
        if (isMdView) {
            return rowData.filter((rowDetails) => rowDetails.data.splice(3, 1));
        }
        else if (isSmView) {
            return rowData.filter((rowDetails) => rowDetails.data.splice(2, 2));
        }
        else {
            return rowData;
        }
    };
    useEffect(() => {
        if (rowItemClicked === MediaTypeId.PhoneCall) {
            setTotalContacts(queueSkillDetails.totalPhoneContacts);
            setBackButtonText('inboundVoice');
            setSkillIcon('voice_inbound');
        }
        else if (rowItemClicked === MediaTypeId.VoiceEmail) {
            setTotalContacts(queueSkillDetails.totalVoiceMailContacts);
            setBackButtonText('voicemail');
            setSkillIcon('voice-mail');
        }
        else if (rowItemClicked === MediaTypeId.WorkItem) {
            setTotalContacts(queueSkillDetails.totalWorkItemContacts);
            setBackButtonText('workItem');
            setSkillIcon('work-item');
        }
        else if (rowItemClicked === MediaTypeId.Digital) {
            setTotalContacts(queueSkillDetails.totalDigitalContacts);
            setBackButtonText('digital');
            setSkillIcon('digital');
        }
    }, [queueSkillDetails]);
    return (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ sx: styles.skillsContainer }, { children: _jsxs(Box, Object.assign({ sx: styles.skillHeader }, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('back'), arrow: true }, { children: _jsx(Box, Object.assign({ component: 'div', "data-testid": "skill-details-back-icon", role: "button", tabIndex: 0, "aria-label": translate('back'), onClick: () => {
                                    handleBack();
                                }, onKeyUp: (event) => {
                                    if (event.key === EventKeys.ENTER || event.key === EventKeys.SPACE) {
                                        handleBack();
                                    }
                                } }, { children: _jsx(CcfBackIcon, { "aria-hidden": "true", focusable: "false", sx: styles.backIcon }) })) })), _jsx(CcfTypography, Object.assign({ sx: styles.skillHeading }, { children: translate(backButtonText) }))] })) })), _jsxs(Box, Object.assign({ sx: styles.queueCounterDetailsDiv }, { children: [_jsxs(Box, Object.assign({ sx: styles.skillsInformation }, { children: [_jsxs(Paper, Object.assign({ sx: styles.skillInfoContainer }, { children: [_jsx(CcfTypography, { sx: styles.skillInfoKey, translationKey: 'skills', "aria-label": translate('skills') }), _jsx(CcfTypography, Object.assign({ sx: styles.skillInfoValue, "aria-label": totalSkills.toString() }, { children: totalSkills }))] })), _jsxs(Paper, Object.assign({ sx: styles.skillInfoContainer }, { children: [_jsx(CcfTypography, { sx: styles.skillInfoKey, translationKey: 'contacts', "aria-label": translate('contacts') }), _jsx(CcfTypography, Object.assign({ sx: styles.skillInfoValue, "aria-label": totalContacts.toString() }, { children: totalContacts }))] }))] })), _jsx(Box, Object.assign({ sx: totalSkills > 0 ? styles.skillItems : styles.skillNoItems, "data-testid": "inbound-skill-list" }, { children: _jsx(CcfTable, { colWidths: getColWidths(), headersData: getTableHeaders(), rowsData: getRowData(), tableStyle: styles.tableStyle, rowStyle: styles.tableBodyRow, headerStyle: styles.tableHeadRow, containerStyle: styles.customTableContainer, stickyHeader: (isMdView || isSmView) ? false : true }) })), (totalSkills === 0) && (_jsxs(Box, Object.assign({ sx: styles.noSkillsInformation }, { children: [_jsx(CcfNoAssignmentIcon, { style: { height: '50', width: '50' } }), _jsx(CcfTypography, { sx: styles.noSkillInfoKey, translationKey: 'noSkillsAssigned' })] })))] }))] }));
}
export default memo(CcfSkillDetails);
//# sourceMappingURL=ccf-skill-details.js.map