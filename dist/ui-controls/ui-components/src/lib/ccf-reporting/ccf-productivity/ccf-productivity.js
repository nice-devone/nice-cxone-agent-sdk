import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import CcfReportingHeader from '../components/ccf-reporting-header';
import CcfProductivityDetails from './ccf-productivity-details';
/**
 * Component for productivity tab
 *
 * @example - <CcfProductivity />
 * @returns
 */
export function CcfProductivity() {
    const [agentOverallPercentage, setAgentOverallPercentage] = useState(null);
    return (_jsxs(_Fragment, { children: [_jsx(CcfReportingHeader, { agentOverallPercentage: agentOverallPercentage, type: 'productivity' }), _jsx(CcfProductivityDetails, { handleAgentOverallPercentage: setAgentOverallPercentage })] }));
}
export default CcfProductivity;
//# sourceMappingURL=ccf-productivity.js.map