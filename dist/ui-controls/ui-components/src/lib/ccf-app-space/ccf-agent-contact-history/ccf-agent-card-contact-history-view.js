import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import * as ACData from 'adaptivecards-templating';
import { useTheme } from '@mui/material';
import { CcfBox } from '@nice-devone/ui-controls';
import { AdaptiveCard } from 'adaptivecards-react';
import agentContactHistoryStyles, { contactHistoryAdaptiveCardCSS } from './ccf-agent-card-contact-history.style';
import * as ContactHistoryTemplate from './ccf-agent-contact-history-template.json';
/**
 * Component used to display agent contact history view
 * @param props - CcfAgentCardContactHistoryViewProps
 * @example
 * ```tsx
 * <CcfAgentCardContactHistoryView
 *   contactHistory={contactHistory}
 *   template={template}
 *   integratedView={integratedView}
 *   hostConfig={hostConfig}
 *   selectedContactHistory={selectedContactHistory}
 *   DispositionModal={DispositionModal}
 *   onExecuteAction={onExecuteAction}
 * />
 * ```
 * @returns
 */
export function CcfAgentCardContactHistoryView({ contactHistory, integratedView, hostConfig, selectedContactHistory, DispositionModal, onExecuteAction, }) {
    const theme = useTheme();
    const style = agentContactHistoryStyles(theme);
    const adaptiveCardCSS = contactHistoryAdaptiveCardCSS(theme);
    const template = new ACData.Template(ContactHistoryTemplate);
    return (_jsxs(CcfBox, Object.assign({ sx: style.detailsMenu }, { children: [_jsx("style", { children: adaptiveCardCSS }), _jsx(CcfBox, { children: _jsx(CcfBox, Object.assign({ sx: style.ccfContactHistoryAdaptiveCardContainer }, { children: contactHistory.map(history => {
                        const card = template.expand({ $root: Object.assign(Object.assign({}, history), { integratedView }) });
                        return _jsx(AdaptiveCard, { payload: card, hostConfig: hostConfig, onExecuteAction: () => onExecuteAction(history) }, history.contactId);
                    }) })) }), selectedContactHistory && DispositionModal] })));
}
export default memo(CcfAgentCardContactHistoryView);
//# sourceMappingURL=ccf-agent-card-contact-history-view.js.map