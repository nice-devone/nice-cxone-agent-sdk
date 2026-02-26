import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTheme, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CcfEnhancedWEAutoManualCreateStyles from './ccf-enhanced-workflow-exec-auto-manual-create-styles';
import { CcfBox } from '@nice-devone/ui-controls';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import CcfEnhancedWEConfigurationTable from '../ccf-config-table/ccf-enhanced-workflow-exec-config-table';
import { useSelector, useDispatch } from 'react-redux';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
/**
 * Component displays workflow mapping" section for the agent workflow execution application along with choice of pinned, relatesTo, screenpop options.
 *
 * This component renders a "workflow mapping" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the workflow mapping information screen for Automatic and manual Create.
 * @example <CcfEnhancedWEAutoManualCreate />
 */
const CcfEnhancedWEAutoManualCreate = () => {
    var _a;
    const theme = useTheme();
    const styles = CcfEnhancedWEAutoManualCreateStyles(theme);
    const dispatch = useDispatch();
    const selectedConfig = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _a !== void 0 ? _a : {};
    const [createFeatureOptions, setCreateFeatureOptions] = useState([
        { key: 'pinnedRecord', label: 'Pinned Record', value: false },
        { key: 'screenPop', label: 'Screen Pop', value: false },
        { key: 'relatesTo', label: 'Relates To', value: false },
        { key: 'cacheResponse', label: 'CacheResponse', value: false }
    ]);
    useEffect(() => {
        const featureValues = {
            pinnedRecord: selectedConfig.pinnedRecord === 'true',
            screenPop: selectedConfig.screenPop === 'true',
            relatesTo: selectedConfig.relatesTo === 'true',
            cacheResponse: selectedConfig.cacheResponse === 'true',
        };
        setCreateFeatureOptions((prev) => prev.map((item) => (Object.assign(Object.assign({}, item), { value: featureValues[item.key] }))));
    }, [selectedConfig]);
    /**
      * Handle click on change of checkbox checked state
      * @example handleChange()
      */
    const handleChange = (event) => {
        const { name, checked } = event.target;
        const updatedConfig = Object.assign({}, selectedConfig);
        if (name === 'pinnedRecord' && !checked) {
            updatedConfig['relatesTo'] = 'false';
        }
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions
            .setSelectedConfiguration(Object.assign(Object.assign({}, updatedConfig), { [name]: String(checked) })));
        setCreateFeatureOptions(prev => prev.map(option => option.key === name ? Object.assign(Object.assign({}, option), { value: checked }) : option));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsx(CcfBox, Object.assign({ sx: styles.featureOptionsContainer }, { children: _jsx(FormGroup, { children: createFeatureOptions.map(({ key, label, value }) => {
                        var _a;
                        const isRelatesTo = key === 'relatesTo';
                        const isPinnedRecordChecked = (_a = createFeatureOptions.find((option) => option.key === 'pinnedRecord')) === null || _a === void 0 ? void 0 : _a.value;
                        const isDisabled = isRelatesTo && !isPinnedRecordChecked;
                        return (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: value, onChange: handleChange, name: key, disabled: isDisabled, sx: isDisabled ? { '& .MuiSvgIcon-root': { opacity: 0.5 } } : {} }), label: label, sx: isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {} }, key));
                    }) }) })), _jsx(CcfBox, { children: _jsx(CcfEnhancedWEConfigurationTable, {}) })] })));
};
export default CcfEnhancedWEAutoManualCreate;
//# sourceMappingURL=ccf-enhanced-workflow-exec-auto-manual-create.js.map