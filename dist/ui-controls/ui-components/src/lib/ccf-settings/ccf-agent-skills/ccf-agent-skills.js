import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import CcfAgentSkillsSearch from './ccf-agent-skills-search';
import { Box, Chip, IconButton, useTheme } from '@mui/material';
import { CcfBox, CcfInfoIcon, CcfTable, CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { userSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import CcfAgentSkillsStyle from './ccf-agent-skills.styles';
import { MediaTypeIds, iconList } from './ccf-icon-list';
import { globalActions } from '../../global.app.slice';
/**
 * @example CcfAgentSkills()
 * @returns
 */
export function CcfAgentSkills() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfAgentSkillsStyle(theme);
    const skillList = useSelector(userSkillsSelector);
    const [mediaTypeId, setMediaTypeId] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [rowData, setRowData] = useState([]);
    const [skillTypeIds, setSkillTypeIds] = useState([]);
    const tableHeaders = ['assignedSkills'];
    const mediaTypeIdSet = new Set();
    const [filteredSkills, setFilteredSkils] = useState(skillList);
    const dispatch = useDispatch();
    useEffect(() => {
        skillList.forEach(skill => {
            mediaTypeIdSet.add(skill.typeId);
        });
        setSkillTypeIds(Array.from(mediaTypeIdSet));
    }, [skillList]);
    /**
     * Used to render the skills
     * @example
     * renderSkills()
     */
    const renderSkills = (skills) => {
        const newData = [];
        if (skills.length > 0) {
            skills.forEach(skill => {
                var _a, _b;
                const newMediaType = Object.keys(MediaTypeIds).includes(skill.typeId.toString());
                const dataStructured = [_jsxs(Box, Object.assign({ style: { display: 'flex', color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main, alignItems: 'center' } }, { children: [newMediaType && iconList[skill.typeId]('20', skill.isOutbound), _jsx(CcfTypography, Object.assign({ variant: 'h5', variantMapping: { h5: 'p' }, sx: styles.iconHeaderClasses, title: skill.skillName }, { children: skill.skillName })), !newMediaType && _jsx(CcfTooltip, Object.assign({ role: "tooltip", title: translate('skillNotSupported'), "aria-label": translate('skillNotSupported'), arrow: true, placement: 'top-start', styles: { ccfTooltip: Object.assign({}, styles.tooltip), ccfTooltipArrow: Object.assign({}, styles.skillsTooltipArrow) } }, { children: _jsx(IconButton, Object.assign({ sx: styles.infoIcon }, { children: _jsx(CcfInfoIcon, { htmlColor: (_b = theme.palette.agentState) === null || _b === void 0 ? void 0 : _b.working }) })) }))] }), skill.skillId)
                ];
                const object = { data: dataStructured };
                newData.push(object);
            });
        }
        else {
            const dataStructured = [
                _jsx(Box, { children: _jsx(CcfTypography, Object.assign({ variant: 'h5', variantMapping: { h5: 'p' }, sx: styles.noSkillsFound, title: (skillList.length > 0) ? translate('noResultFound') : translate('noAssignedSkills') }, { children: (skillList.length > 0) ? translate('noResultFound') : translate('noAssignedSkills') })) }, 'noResultFound')
            ];
            const object = { data: dataStructured };
            newData.push(object);
        }
        setRowData(newData);
    };
    useEffect(() => {
        if (mediaTypeId !== 0) {
            const skills = skillList.filter((skill) => { return skill.skillName.toLowerCase().includes(searchText.toLowerCase()) && skill.typeId === mediaTypeId; });
            renderSkilList(skills);
        }
        else {
            const skills = skillList.filter((skill) => { return skill.skillName.toLowerCase().includes(searchText.toLowerCase()); });
            renderSkilList(skills);
        }
    }, [searchText, mediaTypeId]);
    /**
     * set skill list in local storage and render list
     * @param list - Array<AgentSkill>
     * @example
     * renderSkilList()
     */
    const renderSkilList = (list) => {
        setFilteredSkils(list);
        renderSkills(list);
        const hasSkills = list.length > 0;
        let translationKey = 'noResultFound';
        if (hasSkills) {
            translationKey = mediaTypeId === 0 ? 'skillsFound' : 'skillsFoundWithMediatype';
        }
        const extraArgs = hasSkills ? { format: [list === null || list === void 0 ? void 0 : list.length, translate(MediaTypeIds[mediaTypeId])] } : null;
        setTimeout(() => dispatch(globalActions.setAriaLiveAnnouncer({
            translateConfig: Object.assign({ key: translationKey }, (extraArgs && { extraArgs })),
        })), 100);
    };
    /**
     * Used to filter the skills
     * @example
     * filterSkills()
     */
    const filterSkills = (id) => {
        setMediaTypeId(id);
    };
    /**
     * Used to get table headers based on resolution
     * @example
     * getTableHeaders()
     */
    const getTableHeaders = () => {
        tableHeaders.forEach((header, index) => {
            if (header === 'assignedSkills') {
                tableHeaders[index] = `${translate(header)} (${filteredSkills.length})`;
            }
        });
        return tableHeaders;
    };
    /**
     * Used to get table row data based on resolution
     * @example
     * getRowData()
     */
    const getRowData = () => {
        return rowData.filter((rowDetails) => rowDetails.data.splice(2, 1));
    };
    /**
     * Used to get table row data based on resolution
     * @example
     * handleDelete()
     */
    const handleDelete = () => {
        setMediaTypeId(0);
        renderSkilList(skillList);
    };
    return (_jsxs(_Fragment, { children: [_jsx(CcfAgentSkillsSearch, { setMediaTypeIds: skillTypeIds, filterSelectedMediaType: filterSkills, mediaTypeFromChip: mediaTypeId, setSearchText: setSearchText }), mediaTypeId !== 0 &&
                _jsx(CcfBox, Object.assign({ style: { display: 'inline-flex', maxWidth: '100%' } }, { children: _jsx(CcfTooltip, Object.assign({ role: "tooltip", title: translate(MediaTypeIds[mediaTypeId]), "aria-label": translate(MediaTypeIds[mediaTypeId]), arrow: true }, { children: _jsx(Chip, { tabIndex: 0, sx: styles.chipStyle, label: translate(MediaTypeIds[mediaTypeId]), size: "small", "data-testid": "chipIcon", variant: "outlined", onDelete: () => handleDelete() }) })) })), rowData && _jsx(Box, Object.assign({ "data-testid": "skill-list", id: "skill-list" }, { children: _jsx(CcfTable, { tableStyle: styles.tableStyle, headersData: getTableHeaders(), rowsData: getRowData(), rowStyle: styles.tableBodyRow, headerStyle: styles.tableHeadRow, stickyHeader: true }) }))] }));
}
export default CcfAgentSkills;
//# sourceMappingURL=ccf-agent-skills.js.map