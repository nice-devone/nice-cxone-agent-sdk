import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CcfLoader, CcfTypography } from '@nice-devone/ui-controls';
import CcfPerformanceDetailsListItem from './ccf-performance-details-list-item';
import { getLoaderStatus, getPerformanceResponse, getProductivityErrorStatus } from '../ccf-reporting.slice';
import CcfPerformanceStyles from './ccf-performance-styles';
/**
 * Component for display Performance Details
 * @example - <CcfPerformanceDetails />
 * @returns
 */
export default function CcfPerformanceDetails(props) {
    const theme = useTheme();
    const performanceStyles = CcfPerformanceStyles(theme);
    const [agentPerformanceData, setAgentPerformanceData] = useState([]);
    const isProductivityDataLoading = useSelector(getLoaderStatus);
    const performanceResponse = useSelector(getPerformanceResponse);
    const productivityErrorStatus = useSelector(getProductivityErrorStatus);
    useEffect(() => {
        var _a;
        if (performanceResponse) {
            setAgentPerformanceData(performanceResponse);
            const agentOverallPercentage = (_a = performanceResponse.find((performance) => performance.channelType === 'overall')) === null || _a === void 0 ? void 0 : _a.percentage;
            agentOverallPercentage !== undefined && props.handleAgentOverallPercentage(agentOverallPercentage);
        }
    }, [performanceResponse]);
    /**
     * @example - renderPerformanceComponentState()
     * @returns Error Component or Loading Component
     */
    const renderPerformanceComponentState = () => {
        if (productivityErrorStatus) {
            props.handleAgentOverallPercentage(null);
            return _jsx(CcfTypography, { translationKey: "genericErrorMessage" });
        }
        else if (isProductivityDataLoading) {
            return _jsx(CcfLoader, { showLoadingText: true, isPrimary: true });
        }
        else {
            return _jsx(CcfPerformanceDetailsListItem, { agentStateData: agentPerformanceData });
        }
    };
    return (_jsx(Box, Object.assign({ sx: performanceStyles.productivityListItemContainer, justifyContent: isProductivityDataLoading || productivityErrorStatus ? 'center' : '' }, { children: renderPerformanceComponentState() })));
}
//# sourceMappingURL=ccf-performance-details.js.map