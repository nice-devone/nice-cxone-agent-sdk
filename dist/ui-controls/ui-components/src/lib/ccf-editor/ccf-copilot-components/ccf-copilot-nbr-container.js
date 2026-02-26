import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CcfTooltip, CcfTypography, useTranslator, CcfCarousel, CcfSendIcon, CcfInsertIcon, CcfSparklesIcon, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useMediaQuery, Box, IconButton } from '@mui/material';
import { CcfCopilotActions, getNbrObjectDetails, getIsNBROpen, } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import CcfCopilotNBRStyles from './ccf-copilot-nbr.styles';
import { sendCopilotReply } from '../../ccf-agent-copilot/ccf-agent-copilot-middleware';
/**
 * Component that displays copilot nbr container
 * @returns NBR container
 * @example <CcfCopilotNBRContainer/>
 */
const CcfCopilotNBRContainer = ({ caseId, responses }) => {
    var _a, _b;
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('md'));
    const copilotNextBestResponses = responses;
    const [isActionDispatched, setIsActionDispatched] = useState(false);
    const insertedNBRId = useSelector(getNbrObjectDetails(caseId || '', true));
    const styles = CcfCopilotNBRStyles(theme);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const isResponseVisible = useSelector(getIsNBROpen(caseId || ''));
    const [nbrCardIndex, setNbrCardIndex] = useState(0);
    const primaryIconColor = ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.main);
    /**
     * method to handle insert response
     * @param response - response from the insert action
     * @example
     * ```
     * insertNBRHandler('response');
     * ```
     */
    const insertNBRHandler = (response) => {
        var _a;
        dispatch(CcfCopilotActions.updateSentBestResponse({ response, caseId }));
        dispatch(CcfCopilotActions.updateIsBestResponseSent({ isResponseInserted: true, caseId }));
        setIsActionDispatched(true);
        setTimeout(() => {
            setIsActionDispatched(false);
            dispatch(CcfCopilotActions.updateIsBestResponseSent({ isResponseInserted: false, caseId }));
        }, 250);
        dispatch(CcfCopilotActions.setInsertedNBRId({ insertedNBRId, caseId }));
        const newNbrIndex = (_a = copilotNextBestResponses === null || copilotNextBestResponses === void 0 ? void 0 : copilotNextBestResponses.indexOf(response)) !== null && _a !== void 0 ? _a : 0;
        setNbrCardIndex(newNbrIndex);
    };
    /**
     * method to handle send response
     * @param response - response from the send action
     * @example
     * ```
     * sendNBRHandler('response')
     * ```
     */
    const sendNBRHandler = (response) => {
        dispatch(sendCopilotReply({ caseId, response }));
        dispatch(CcfCopilotActions.removeNextBestResponse(caseId));
        dispatch(CcfCopilotActions.setIsNBRAvailable({ isNBRAvailable: false, caseId }));
        dispatch(CcfCopilotActions.setIsNBROpen({ isNBROpen: false, caseId }));
    };
    return (_jsxs(Box, { children: [isSmView && (_jsx(Box, { children: isResponseVisible && !isActionDispatched && !!copilotNextBestResponses && (_jsx(CcfCarousel, Object.assign({ index: nbrCardIndex }, { children: copilotNextBestResponses === null || copilotNextBestResponses === void 0 ? void 0 : copilotNextBestResponses.map((response, index) => {
                        var _a, _b;
                        const nextResponseId = `nbr_${caseId}_${index}`;
                        return (_jsx(Box, Object.assign({ onClick: () => insertNBRHandler(response), sx: styles.nbrHoverStyle }, { children: _jsxs(Box, Object.assign({ sx: styles.responseDiv }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.responseText }, { children: response })), _jsx(Box, Object.assign({ sx: styles.responseIcons }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('sendResponse'), arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: styles.nullHover }, { children: _jsx(CcfSendIcon, { onClick: (e) => {
                                                        e.stopPropagation();
                                                        sendNBRHandler(response);
                                                    }, sx: styles.icons, "data-testid": "send", fill: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter }) })) })) }))] })) }), nextResponseId));
                    }) }))) })), !isActionDispatched && !!copilotNextBestResponses && (_jsx(Box, { children: !isSmView && (_jsx(CcfCarousel, Object.assign({ index: nbrCardIndex }, { children: copilotNextBestResponses === null || copilotNextBestResponses === void 0 ? void 0 : copilotNextBestResponses.map((response, index) => {
                        var _a, _b, _c, _d;
                        const nextResponseId = `nbr_${caseId}_${index}`;
                        return (_jsxs(Box, Object.assign({ sx: styles.responseDiv }, { children: [_jsx(CcfSparklesIcon, { htmlColor: primaryIconColor, sx: styles.nbrSparkle }), _jsx(CcfTypography, Object.assign({ sx: styles.responseText }, { children: response })), _jsxs(Box, Object.assign({ sx: styles.responseIcons }, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('insertResponse'), arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: styles.nullHover }, { children: _jsx(CcfInsertIcon, { sx: styles.icons, onClick: () => insertNBRHandler(response), "data-testid": "insert", fill: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter }) })) })), _jsx(CcfTooltip, Object.assign({ title: translate('sendResponse'), arrow: true }, { children: _jsx(IconButton, Object.assign({ sx: styles.nullHover }, { children: _jsx(CcfSendIcon, { sx: styles.icons, onClick: () => sendNBRHandler(response), "data-testid": "send", fill: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.filter }) })) }))] }))] }), nextResponseId));
                    }) }))) }))] }));
};
export default CcfCopilotNBRContainer;
//# sourceMappingURL=ccf-copilot-nbr-container.js.map