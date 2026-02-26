import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import CcfReportingHeader from '../components/ccf-reporting-header';
import CcfPerformanceDetails from './ccf-performance-details';
/**
 * Component for Performance tab
 *
 * @example - <CcfPerformance />
 * @returns
 */
export function CcfPerformance() {
    const [agentOverallPercentage, setAgentOverallPercentage] = useState(null);
    return (_jsxs(_Fragment, { children: [_jsx(CcfReportingHeader, { agentOverallPercentage: agentOverallPercentage, type: 'performance' }), _jsx(CcfPerformanceDetails, { handleAgentOverallPercentage: setAgentOverallPercentage })] }));
}
export default CcfPerformance;
//# sourceMappingURL=ccf-performance.js.map