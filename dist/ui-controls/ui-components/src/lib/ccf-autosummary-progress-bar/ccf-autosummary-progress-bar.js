import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, Stack, useTheme } from '@mui/material';
import CcfDispositionStyles from '../ccf-disposition/ccf-disposition.styles';
import { CcfTypography } from '@nice-devone/ui-controls';
import { voiceContactSelector } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useSelector } from 'react-redux';
import { MediaType, VoiceContactStatus } from '@nice-devone/common-sdk';
/**
 * Component to show an overlay of with loader
 * circle and text
 * @example - <CcfAutoSummaryProgressBar />
 * @returns
 */
const CcfAutoSummaryProgressBar = ({ activeDisposition, mediaType }) => {
    const theme = useTheme();
    const dispositionStyles = CcfDispositionStyles(theme);
    const voiceContact = useSelector(voiceContactSelector);
    /**
   * shows correct loading message for autosummary
   * circle and text
   * @example - displayMessage()
   * @returns
   */
    const displayMessage = () => {
        var _a;
        if (mediaType === MediaType.DIGITAL) {
            if (activeDisposition && ((activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateAutoSummaryRequestSent) || (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.isGenerateFinalSummaryRequestSent))) {
                return 'autoSummaryBeingGenerated';
            }
            else
                return 'autoSummaryWillGenerate';
        }
        else {
            if (((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === VoiceContactStatus.DISCONNECTED) {
                return 'autoSummaryBeingGenerated';
            }
            else
                return 'autoSummaryWillGenerate';
        }
    };
    return (_jsx(Box, Object.assign({ sx: dispositionStyles.autoSummary }, { children: _jsxs(Stack, Object.assign({ direction: 'row', spacing: 3, sx: {
                margin: '10px',
                padding: '10px',
            } }, { children: [_jsx(Box, { children: _jsx(CircularProgress, { variant: "indeterminate", thickness: 5, size: 30, sx: {
                            color: theme.palette.primary.main,
                        } }) }), _jsx(CcfTypography, { variant: 'body2', translationKey: displayMessage() })] })) })));
};
export default CcfAutoSummaryProgressBar;
//# sourceMappingURL=ccf-autosummary-progress-bar.js.map