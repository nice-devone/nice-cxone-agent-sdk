import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CcfBox, CcfTable, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import CcfReportingStyles from './ccf-performance-styles';
import { CHANNEL_ICON_NAME, iconList } from '../../ccf-icon/ccf-icon-list';
const getIconForSkills = new Map([
    [
        'outbound',
        _jsx(_Fragment, { children: iconList[CHANNEL_ICON_NAME.OBCALL]('medium') })
    ],
    [
        'inbound',
        _jsx(_Fragment, { children: iconList[CHANNEL_ICON_NAME.IBCALL]('medium') })
    ]
]);
/**
 * Show List Item for Productivity Details
 * @example - <CcfProductivityDetailsListItem />
 * @returns
 */
const CcfPerformanceDetailsListItem = (props) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const performanceStyles = CcfReportingStyles(theme);
    const { agentStateData } = props;
    /**
     * @param channelType - input channel type
     * @returns - object specifying channel
     * @example
     * ```
     * GetTranslatedChannelType(channelType)
     * ```
    */
    const GetTranslatedChannelType = (channelType) => {
        switch (channelType) {
            case 'inbound':
            case 'overall':
            case 'outbound':
                return translate(channelType);
            default: return '';
        }
    };
    const tableHeadings = [translate('channelType'), translate('youPerformance'), translate('teamPerformance'), translate('percentagePerformance')];
    const rowData = agentStateData.map((agentState) => ({ data: [_jsxs(Box, Object.assign({ sx: performanceStyles.tableCell, component: "span" }, { children: [_jsx(CcfBox, Object.assign({ sx: performanceStyles.iconBox }, { children: getIconForSkills.get(agentState.channelType) })), _jsx(Box, Object.assign({ "aria-label": GetTranslatedChannelType(agentState.channelType) }, { children: GetTranslatedChannelType(agentState.channelType) }))] }), `${agentState.channelType}_channelType`), _jsx(CcfTypography, Object.assign({ variant: 'body1', variantMapping: { 'body1': 'span' }, "aria-label": agentState.yourCount.toString() }, { children: agentState.yourCount }), `${agentState.channelType}_yourCount`), _jsx(CcfTypography, Object.assign({ variant: 'body1', variantMapping: { 'body1': 'span' }, "aria-label": agentState.teamCount.toString() }, { children: agentState.teamCount }), `${agentState.channelType}_teamCount`), _jsxs(CcfTypography, Object.assign({ variant: 'body1', variantMapping: { 'body1': 'span' }, "aria-label": agentState.percentage.toString() }, { children: [agentState.percentage, "%"] }), `${agentState.channelType}_percentage`)] }));
    return (_jsx(Grid, Object.assign({ container: true, sx: performanceStyles.productivityListContainer }, { children: _jsx(CcfTable, { tableStyle: performanceStyles.customTableContainer, headersData: tableHeadings, rowsData: rowData, headerStyle: performanceStyles.tableRowHeader, rowStyle: performanceStyles.tableRowBody, stickyHeader: true, tabIndexForCells: false }) })));
};
export default React.memo(CcfPerformanceDetailsListItem);
//# sourceMappingURL=ccf-performance-details-list-item.js.map