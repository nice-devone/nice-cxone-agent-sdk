import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfTranscriptionErrorIcon used to display transcription error icon
 * @example -- <CcfTranscriptionErrorIcon />
 */
export function CcfTranscriptionErrorIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 14 14", fill: "none" }, props, { children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.76025 0C4.40173 0 4.05789 0.142422 3.80438 0.395935L0.636902 3.56342C0.383389 3.81693 0.240967 4.16077 0.240967 4.51929V8.99878C0.240967 9.3573 0.383389 9.70114 0.636902 9.95465L3.80438 13.1221C4.05789 13.3756 4.40173 13.5181 4.76025 13.5181H9.23975C9.59827 13.5181 9.94211 13.3756 10.1956 13.1221L13.3631 9.95465C13.6166 9.70114 13.759 9.3573 13.759 8.99878V4.51929C13.759 4.16077 13.6166 3.81693 13.3631 3.56341L10.1956 0.395935C9.94211 0.142422 9.59827 0 9.23975 0H4.76025ZM6.33194 6.74134V4.05188C6.33194 3.64846 6.6019 3.37952 7.00683 3.37952C7.34428 3.37952 7.68174 3.64846 7.68174 4.05188V6.74134C7.68174 7.14476 7.34428 7.4137 7.00683 7.4137C6.6019 7.4137 6.33194 7.14476 6.33194 6.74134ZM6.33194 9.4308C6.33194 9.02738 6.6019 8.75843 7.00683 8.75843C7.34428 8.75843 7.68174 9.02738 7.68174 9.4308C7.68174 9.83422 7.34428 10.1032 7.00683 10.1032C6.6019 10.1032 6.33194 9.83422 6.33194 9.4308Z", fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.agentState.unavailable }) })));
}
export default CcfTranscriptionErrorIcon;
//# sourceMappingURL=ccf-transcription-error-icon.js.map