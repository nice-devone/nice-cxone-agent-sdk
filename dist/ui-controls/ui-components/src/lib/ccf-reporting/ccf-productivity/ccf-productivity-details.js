import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Grid, useMediaQuery } from '@mui/material';
import { CcfLoader, CcfTypography } from '@nice-devone/ui-controls';
import CcfProductivityDetailsListItem from './ccf-productivity-details-list-item';
import { getLoaderStatus, getProductivityErrorStatus, getProductivityResponse } from '../ccf-reporting.slice';
import CcfProductivityStyles from './ccf-productivity-styles';
/**
 * Component for display Productivity Details
 * @example - <CcfProductivityDetails />
 * @returns
 */
export default function CcfProductivityDetails(props) {
    const theme = useTheme();
    const productivityStyles = CcfProductivityStyles(theme);
    const isLgView = useMediaQuery(theme.breakpoints.up('sm'));
    const [agentStateData, setAgentStateData] = React.useState([]);
    const isProductivityDataLoading = useSelector(getLoaderStatus);
    const productivityResponse = useSelector(getProductivityResponse);
    const productivityErrorStatus = useSelector(getProductivityErrorStatus);
    React.useEffect(() => {
        var _a;
        if (productivityResponse) {
            setAgentStateData(productivityResponse);
            const agentProductivityPercentage = (_a = productivityResponse.find(el => el.stateName === 'Available')) === null || _a === void 0 ? void 0 : _a.stateAgentPercentage;
            agentProductivityPercentage !== undefined && props.handleAgentOverallPercentage(agentProductivityPercentage);
        }
    }, [productivityResponse]);
    /**
     * @example - renderProductivityComponentState()
     * @returns Error Component or Loading Component
     */
    const renderProductivityComponentState = () => {
        if (productivityErrorStatus) {
            props.handleAgentOverallPercentage(null);
            return _jsx(CcfTypography, { translationKey: "genericErrorMessage" });
        }
        else if (isProductivityDataLoading) {
            return _jsx(CcfLoader, { showLoadingText: true, isPrimary: true });
        }
        else {
            return agentStateData.map(agentState => _jsx(CcfProductivityDetailsListItem, { agentStateData: agentState }, agentState.stateName));
        }
    };
    return (_jsxs(_Fragment, { children: [!productivityErrorStatus && _jsxs(Grid, Object.assign({ container: true, padding: 1, sx: productivityStyles.details }, { children: [_jsx(Grid, Object.assign({ xs: 6, lg: 4 }, { children: _jsx(CcfTypography, { translationKey: "agentStates", marginLeft: isLgView ? 5 : 0, sx: productivityStyles.textEllipsis }) })), _jsx(Grid, Object.assign({ xs: 6, lg: 8 }, { children: _jsx(CcfTypography, { translationKey: "time" }) }))] })), _jsx(Box, Object.assign({ sx: productivityStyles.productivityListItemContainer, justifyContent: isProductivityDataLoading || productivityErrorStatus ? 'center' : '' }, { children: renderProductivityComponentState() }))] }));
}
//# sourceMappingURL=ccf-productivity-details.js.map