import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CcfHeader, CcfLoader, CcfReportingIcon, CcfTabs, useTranslator } from '@nice-devone/ui-controls';
import CcfReportingStyles from './ccf-reporting-styles';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationDirection } from '../global.app.slice';
import { getPerformanceReport, getProductivityReport } from './ccf-reporting.slice';
/**
 * Component for ccf reporting page
 *
 * Show Client Settings
 *
 * @example - <CcfReporting />
 * @returns
 */
export function CcfReporting() {
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const reportingStyles = CcfReportingStyles(theme);
    const [currentTab, setCurrentTab] = useState(0);
    const appDirection = useSelector(getApplicationDirection);
    const [productivityElement, setProductivityElement] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const [performaceElement, setPerformaceElement] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const reportingTabs = [
        {
            element: _jsx(_Fragment, { children: productivityElement }),
            isActive: true,
            label: translate('productivity'),
        },
        {
            element: _jsx(_Fragment, { children: performaceElement }),
            isActive: true,
            label: translate('performance'),
        }
    ];
    const activeTabs = reportingTabs.filter((tab) => tab.isActive);
    /**
       * Import ccf-productivity component dynamically
       * @example
       * ```
       * renderProductivityReport()
       * ```
       */
    const renderProductivityReport = () => __awaiter(this, void 0, void 0, function* () {
        const productivityReport = yield import('./ccf-productivity/ccf-productivity');
        const CcfProductivity = productivityReport.CcfProductivity;
        setProductivityElement(_jsx(CcfProductivity, {}));
    });
    /**
     * Import ccf-performance component dynamically
     * @example
     * ```
     * renderPerformanceReport()
     * ```
     */
    const renderPerformanceReport = () => __awaiter(this, void 0, void 0, function* () {
        const performanceReport = yield import('./ccf-performance/ccf-performance');
        const CcfPerformance = performanceReport.CcfPerformance;
        setPerformaceElement(_jsx(CcfPerformance, {}));
    });
    useEffect(() => {
        switch (currentTab) {
            case 0:
                renderProductivityReport();
                dispatch(getProductivityReport({ range: 'today' }));
                break;
            case 1:
                renderPerformanceReport();
                dispatch(getPerformanceReport({ range: 'today' }));
                break;
        }
    }, [currentTab]);
    return (_jsx(Box, Object.assign({ sx: reportingStyles.reportingBox }, { children: _jsxs(Box, Object.assign({ sx: reportingStyles.headerStyle }, { children: [_jsx(CcfHeader, { LeftIcon: _jsx(CcfReportingIcon, { htmlColor: theme.palette.secondary.main, viewBox: "-2 -2 24 24", fontSize: "small" }), headerText: translate('reporting'), direction: appDirection }), _jsx(CcfTabs, Object.assign({ currentTab: currentTab, variant: CcfTabs.Variant.STANDARD, setCurrentTab: setCurrentTab, textColor: CcfTabs.Color.PRIMARY, sx: reportingStyles === null || reportingStyles === void 0 ? void 0 : reportingStyles.tabContainerStyle }, { children: activeTabs.map((tab) => (_jsx(CcfTabs.TabPanel, Object.assign({ label: tab.label }, { children: _jsx(Box, Object.assign({ sx: reportingStyles.tabContentSection }, { children: tab.element })) }), tab.label))) }))] })) })));
}
export default CcfReporting;
//# sourceMappingURL=ccf-reporting.js.map