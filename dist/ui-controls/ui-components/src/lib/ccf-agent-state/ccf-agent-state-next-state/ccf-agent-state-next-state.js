import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CcfAvailableIcon, CcfBox, CcfDivider, CcfTypography, CcfUnavailableIcon, DividerOrientation, DividerVariant, useTranslator } from '@nice-devone/ui-controls';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectcurrentStatus } from '../ccf-agent-state.slice';
import agentStateNextStateStyles from './ccf-agent-state-next-state.styles';
/**
 * Component displays the Next State and the Next-Next state of the agent
 * @returns Component with Next State and the Next-Next state of the agent
 * @example `<CcfAgentStateNextState />`
 */
export function CcfAgentStateNextState() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const agentCurrentStatus = useSelector(selectcurrentStatus);
    const nextState = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.nextState;
    const nNextState = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.nNextState;
    const currentState = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState;
    const translatedNextState = translate('agentStateUpNext');
    const translatedNextNextState = translate('agentStateNextNext');
    const styles = agentStateNextStateStyles(theme);
    /**
     * Function to handle icon for status
     * @param status - string
     * @example handleIconForStatus()
     * @returns
     */
    const handleIconForStatus = (status) => {
        return status === 'Unavailable' ? (_jsx(CcfUnavailableIcon, { id: 'unavailableAgentStateId', sx: styles.agentStatusIcon })) : (_jsx(CcfAvailableIcon, { sx: styles.agentStatusIcon }));
    };
    /**
     * A function to render the next state or Next-Next State list item
     * @param state -
     * @example `renderNextState('Up Next', nextState)`
     * @returns Component
     */
    const renderNextState = (label, nextState) => (nextState === null || nextState === void 0 ? void 0 : nextState.state) && (_jsxs(CcfBox, Object.assign({ display: "flex", alignItems: "center" }, { children: [_jsx(CcfTypography, Object.assign({ "aria-label": label, sx: styles.nextStateTitle }, { children: label })), handleIconForStatus(nextState.state), _jsx(CcfTypography, Object.assign({ variant: "h5" }, { children: nextState.reason || nextState.state }))] })));
    return (((nextState === null || nextState === void 0 ? void 0 : nextState.state) && (nextState === null || nextState === void 0 ? void 0 : nextState.state.toLowerCase()) !== (currentState === null || currentState === void 0 ? void 0 : currentState.state.toLowerCase()))
        || (nNextState === null || nNextState === void 0 ? void 0 : nNextState.state) && (nNextState === null || nNextState === void 0 ? void 0 : nNextState.state.toLowerCase()) !== (currentState === null || currentState === void 0 ? void 0 : currentState.state.toLowerCase())) ? (_jsxs(_Fragment, { children: [_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsxs(CcfBox, Object.assign({ sx: styles.nextSection }, { children: [renderNextState(translatedNextState, nextState), renderNextState(translatedNextNextState, nNextState)] }))] })) : null;
}
export default CcfAgentStateNextState;
//# sourceMappingURL=ccf-agent-state-next-state.js.map