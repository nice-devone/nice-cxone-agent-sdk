import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Typography, Grid, useTheme, Divider, Box } from '@mui/material';
import ccfTelemetricInformationStyles from './ccf-telemetric-information-styles';
import { DividerOrientation, DividerVariant, useTranslator } from '@nice-devone/ui-controls';
/**
 * component to display the telemetric information in UI
 * @example - <CcfTelemetricInformation/>
 * @returns react component
 */
export function CcfTelemetricInformation() {
    const TelemetricPollingInterval = 2000; // 2 seconds
    const theme = useTheme();
    const styles = ccfTelemetricInformationStyles(theme);
    let timerId = '';
    const cxoneExtId = 'ihgfdecdmhcckcnlhgfciplpbpmmjmdl';
    const voiceExtId = 'gcfjbjldfomnopnpdjajjfpldkkdmmoi';
    const ctdExtId = 'anehaijgfhlkchmihoaklaimlclnomag';
    const initialState = {
        memory: {
            totalRAM: '',
            usedRAM: '',
            usedRAMinPercentage: 0,
        },
        cpu: { cpuUsage: 0, modelName: '' },
    };
    const [sysMetaData, setSysMetaData] = useState(initialState);
    const [translate] = useTranslator();
    useEffect(() => {
        getInstalledEtension().then((inialledExtId) => {
            if (inialledExtId) {
                fetchTelemetricData(inialledExtId);
            }
        });
        return () => clearInterval(timerId);
    }, []);
    /**
     * find what extensions are available
     * @example getInstalledEtension()
     */
    const getInstalledEtension = () => {
        return new Promise(function (resolve) {
            var _a;
            // check if the cxone extension is installed
            (_a = chrome === null || chrome === void 0 ? void 0 : chrome.runtime) === null || _a === void 0 ? void 0 : _a.sendMessage(cxoneExtId, { type: 'hasTelemetricPermissionsEnabled' }, (result) => {
                if (result && result.hasTelemetricPermissionsEnabled)
                    resolve(cxoneExtId);
                else {
                    // check if the cxone extension is installed
                    chrome.runtime.sendMessage(voiceExtId, { type: 'hasTelemetricPermissionsEnabled' }, (result) => {
                        if (result && result.hasTelemetricPermissionsEnabled)
                            resolve(voiceExtId);
                        else {
                            // check if the click to dial extension is installed
                            chrome.runtime.sendMessage(ctdExtId, { type: 'hasTelemetricPermissionsEnabled' }, (result) => {
                                if (result && result.hasTelemetricPermissionsEnabled)
                                    resolve(ctdExtId);
                                if (chrome.runtime.lastError)
                                    return;
                            });
                        }
                        if (chrome.runtime.lastError)
                            return;
                    });
                }
                if (chrome.runtime.lastError)
                    return;
            });
        });
    };
    /**
     * fetch telemetric data by sending message to the extension
     * @example fetchTelemetricData()
     */
    const fetchTelemetricData = (targetExtension) => {
        chrome.runtime.sendMessage(targetExtension, { type: 'getTelemetricData' }, (result) => {
            setSysMetaData(result || initialState);
            timerId = setTimeout(() => { fetchTelemetricData(targetExtension); }, TelemetricPollingInterval);
            if (chrome.runtime.lastError)
                return;
        });
    };
    // don't show anything when no data received from the extension for CPU and memory usage
    if (!sysMetaData.memory.totalRAM || !sysMetaData.cpu.cpuUsage)
        return _jsx(Box, {});
    return (_jsxs(Box, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: translate('telemetricData') })), _jsxs(Grid, Object.assign({ container: true, lg: 12, style: styles.gridContainer }, { children: [sysMetaData.cpu.modelName &&
                        _jsxs(Grid, Object.assign({ item: true, style: styles.gridCell, sm: 4 }, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: translate('processorName') })), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: sysMetaData.cpu.modelName }))] }), 'cpu'), _jsxs(Grid, Object.assign({ item: true, style: styles.gridCell, sm: 4 }, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: translate('cpuUsage') })), _jsxs(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: [sysMetaData.cpu.cpuUsage, "%"] }))] }), 'cpu'), _jsxs(Grid, Object.assign({ item: true, style: styles.gridCell, sm: 4 }, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: translate('memoryUsage') })), _jsxs(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: [sysMetaData.memory.usedRAM, " / ", sysMetaData.memory.totalRAM, " ", translate('memoryUnit'), " (", sysMetaData.memory.usedRAMinPercentage, "%)"] }))] }), 'memory')] })), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH })] }));
}
export default CcfTelemetricInformation;
//# sourceMappingURL=ccf-telemetric-information.js.map