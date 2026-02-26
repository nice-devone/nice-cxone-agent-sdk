import { __awaiter } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, useTheme, TextField, CircularProgress, Paper } from '@mui/material';
import { CcfTypography, CcfButton, CcfDeboucedInput, CcfBox, CcfAutoComplete, } from '@nice-devone/ui-controls';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import CcfEnhancedWEManualCreateFilterStyles from './ccf-enhanced-workflow-exec-manual-create-filter-styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkflowEntitiesFields } from '../../thunks';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import { toast } from 'react-toastify';
/**
 * Handles changes for a field selection in the autocomplete.
 *
 * @param handleColumnChange - Callback to update column criteria in the store
 * @param entityIndex - Index of the entity being updated
 * @param paramIndex - Index of the parameter within the entity
 * @param _ - Event argument (unused)
 * @param newValue - The selected field object with name and label
 *
 * @example
 * handleFieldChangeFn(
 *   mockHandleColumnChange,
 *   0,
 *   1,
 *   null,
 *   \{ name: 'accountId', label: 'Account ID' \}
 * );
 */
export const handleFieldChangeFn = (handleColumnChange, entityIndex, paramIndex, _, newValue) => {
    const fieldNameValue = (newValue === null || newValue === void 0 ? void 0 : newValue.name) || '';
    const labelValue = newValue === null || newValue === void 0 ? void 0 : newValue.label;
    handleColumnChange(entityIndex, paramIndex, 'fieldName', fieldNameValue, labelValue);
};
/**
 * Logs an error that occurs during fetching workflow entity fields.
 *
 * @param error - The error object
 * @param context - Description of where the error occurred
 *
 * @example
 * handleFetchError(new Error("Network failure"), "fetchAllEntitiesFields");
 */
const handleFetchError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    // You could also dispatch an error action here if needed
};
/**
 * Component displays agent workflow execution application Specific search workflow Information screen.
 *
 * This component renders a "workflow mapping" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the workflow mapping information screen.
 * @example
 *   <CcfEnhancedWEManualFilter />
 */
const CcfEnhancedWEManualFilter = () => {
    var _a, _b, _c, _d, _e;
    const theme = useTheme();
    const styles = CcfEnhancedWEManualCreateFilterStyles(theme);
    const crmentities = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getEntities)) !== null && _a !== void 0 ? _a : [];
    const selectedEnhancedWorkflowConfig = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _b !== void 0 ? _b : {};
    const crmentityFieldsOptions = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getEntitiesFields)) !== null && _c !== void 0 ? _c : {};
    const [selectedEntity, setSelectedEntity] = useState('');
    const [newRow, setNewRow] = useState({ fieldName: '', operator: '', variable: '', condition: '' });
    const dispatch = useDispatch();
    const applicationExistingConfiguration = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _d !== void 0 ? _d : {};
    /**
     * Fetches fields for all entities in the selected enhanced workflow configuration.
     * Iterates through each entity and dispatches a fetchWorkflowEntitiesFields action.
     * @example - fetchAllEntitiesFields()
     */
    const fetchAllEntitiesFields = () => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        try {
            for (const entity of (_f = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities) !== null && _f !== void 0 ? _f : []) {
                yield dispatch(fetchWorkflowEntitiesFields({
                    configurationId: selectedEnhancedWorkflowConfig.configId,
                    entityName: entity.entityAPIName,
                }));
            }
        }
        catch (error) {
            console.error('Error while fetching fields for all entities:', error);
        }
    });
    // Load the fields of the previously configured entities
    useEffect(() => {
        fetchAllEntitiesFields();
    }, []);
    /**
      * useEffect to set the selected entity value to the state when the component renders
    */
    useEffect(() => {
        var _a;
        // EXTRACTED LOGIC FOR BETTER TESTABILITY
        const shouldSetEntity = ((_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.length) > 0;
        if (shouldSetEntity) {
            setSelectedEntity(selectedEnhancedWorkflowConfig.entities[0].entityName);
        }
        else {
            setSelectedEntity(''); // Explicitly set to empty string
        }
    }, [selectedEnhancedWorkflowConfig.entities]);
    /**
   * Function to add rows to the entity
   * @example - handleAddRow()
   */
    const handleAddRow = () => {
        var _a, _b;
        if (!selectedEntity) {
            toast.error('Please select an entity before adding.');
            return;
        }
        // Check if the maximum number of entities has been reached
        if (selectedEnhancedWorkflowConfig.entities.length >= 5) {
            toast.info('You can only add up to 5 entities.');
            return;
        }
        const isEntityAlreadyAdded = selectedEnhancedWorkflowConfig.entities.some((entity) => entity.entityName === selectedEntity);
        if (isEntityAlreadyAdded) {
            toast.info('This entity has already been added.');
            return;
        }
        dispatch(fetchWorkflowEntitiesFields({
            entityName: ((_a = crmentities.find(entity => entity.label === selectedEntity)) === null || _a === void 0 ? void 0 : _a.name) || '',
            configurationId: selectedEnhancedWorkflowConfig.configId,
        }));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.addRow({
            entity: selectedEntity,
            row: newRow,
            entityAPIName: ((_b = crmentities.find(entity => entity.label === selectedEntity)) === null || _b === void 0 ? void 0 : _b.name) || '',
        }));
        setNewRow({ fieldName: '', operator: '', variable: '', condition: '' });
    };
    /**
   * Function to add rows to the entities column
   * @example - handleAddEntityRow()
   */
    const handleAddEntityRow = (entityName) => {
        var _a;
        const entity = selectedEnhancedWorkflowConfig.entities.find((entity) => entity.entityName === entityName);
        if (entity) {
            if (entity.columns.length < 5) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.addEntityRow({
                    entity: entityName,
                    row: newRow,
                    entityAPIName: ((_a = crmentities.find(entity => entity.label === selectedEntity)) === null || _a === void 0 ? void 0 : _a.name) || '',
                }));
                setNewRow({ fieldName: '', operator: '', variable: '', condition: '' });
            }
            else {
                toast.info('Maximum of 5 rows allowed for each entity');
            }
        }
    };
    /**
   * Function to update the fields value for the column of entities
   * @example - handleColumnChange()
   */
    const handleColumnChange = (entityIndex, paramIndex, fieldName, value, label) => {
        // Dispatch action to update either columnName or operator in Redux store
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.updateColumnCriteria({
            entityIndex,
            paramIndex,
            fieldName,
            value,
            label,
        }));
    };
    /**
   * Function to delete the added entity
   * @example - handleDeleteEntity()
   */
    const handleDeleteEntity = (entityIndex) => {
        // Dispatch action to delete entity from Redux store
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.deleteEntity({
            entityIndex,
        }));
    };
    /**
     * Function to update the display name of the entity text field
     * @param entityIndex - index of the entity
     * @param displayName - new display name
     * @example - handleUpdateEntityDisplayName()
     */
    const handleUpdateEntityDisplayName = (entityIndex, displayName) => {
        // Dispatch action to update entity display name in Redux store
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.updateEntityDisplayName({
            entityIndex,
            displayName,
        }));
    };
    /**
   * Function to delete the column entries for the particular entity
   * @example - handleDeleteColumn()
   */
    const handleDeleteColumn = (entityIndex, paramIndex) => {
        // Dispatch action to delete column from Redux store
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.deleteColumn({
            entityIndex,
            paramIndex,
        }));
    };
    useEffect(() => {
        var _a;
        const currentConfigId = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.configId;
        const existingConfigs = applicationExistingConfiguration === null || applicationExistingConfiguration === void 0 ? void 0 : applicationExistingConfiguration.configs;
        // Early return if configs is empty, undefined, or null
        if (!existingConfigs || !existingConfigs.length) {
            return;
        }
        const existingConfigId = (_a = existingConfigs[0]) === null || _a === void 0 ? void 0 : _a.configId;
        // Reset only if currentConfigId exists and is different
        if (currentConfigId && currentConfigId !== existingConfigId) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.resetPage());
            setSelectedEntity('');
        }
    }, [selectedEnhancedWorkflowConfig.configId, applicationExistingConfiguration, dispatch]);
    /**
   * Function to handle the field change in the autocomplete component
   * @example - handleFieldChange()
   */
    const handleFieldChange = (entityIndex, paramIndex, e, newValue) => {
        handleFieldChangeFn(handleColumnChange, entityIndex, paramIndex, e, newValue);
    };
    return (_jsxs(Box, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsxs(Box, Object.assign({ sx: styles.filterContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2" }, { children: "SEARCH PARAMETERS" })), _jsxs(Grid, Object.assign({ container: true, spacing: 2, alignItems: "flex-end" }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 8, sm: 6, md: 4 }, { children: _jsx(CcfAutoComplete, { disableClearable: true, options: crmentities || [], value: (crmentities === null || crmentities === void 0 ? void 0 : crmentities.find((config) => config.label === selectedEntity)) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.label) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.label) === (value === null || value === void 0 ? void 0 : value.label), onChange: (_, option) => {
                                        setSelectedEntity((option === null || option === void 0 ? void 0 : option.label) || '');
                                    }, renderInput: (params) => {
                                        var _a;
                                        return _jsx(TextField, Object.assign({}, params, { placeholder: "Select Item", size: "small", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(_Fragment, { children: [crmentities.length === 0 ? _jsx(CircularProgress, { color: "inherit", size: 20, "data-testid": "entity-loading-indicator" }) : null, (_a = params.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment] })) }) }));
                                    }, sx: styles.selectionDropdown, size: "small" }) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfButton, Object.assign({ sx: styles.buttonAdd, variant: "contained", onClick: () => {
                                        if (!selectedEntity) {
                                            toast.error('Please select an entity before adding.');
                                            return;
                                        }
                                        handleAddRow();
                                    } }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.buttonTypography }, { children: "Add Entity" })) })) }))] }))] })), _jsx(Box, Object.assign({ sx: {
                    maxHeight: 'calc(100vh - 200px)',
                    //overflowY: 'auto',
                    paddingBottom: '20px',
                } }, { children: (_e = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities) === null || _e === void 0 ? void 0 : _e.map((entity, entityIndex) => {
                    var _a;
                    return (_jsx(Card, Object.assign({ variant: "outlined" }, { children: _jsxs(CardContent, { children: [_jsxs(Grid, Object.assign({ container: true, alignItems: "center", spacing: 1.5 }, { children: [_jsxs(Grid, Object.assign({ item: true, xs: true }, { children: [_jsx(CcfTypography, Object.assign({ variant: "h6", sx: styles.paramTypography }, { children: entity.entityName })), _jsxs(CcfBox, Object.assign({ sx: { mt: 2 } }, { children: [_jsxs(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ["DISPLAY NAME", _jsx("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] })), _jsx(CcfDeboucedInput, { className: "workflowNameInput", size: "small", required: true, variant: "outlined", id: "workflow-name", value: entity.displayName || '', placeholder: 'Enter display name', delay: 500, onChange: (e) => {
                                                                handleUpdateEntityDisplayName(entityIndex, e.target.value);
                                                            }, sx: styles.inputPlaceHolder })] })), _jsx(CcfTypography, Object.assign({ variant: "caption", color: "textSecondary", sx: styles.paramHeadingTypography }, { children: "Select the CXone Data below that you would like mapped to the external software." }))] })), _jsx(Grid, Object.assign({ item: true }, { children: _jsxs(CcfButton, Object.assign({ "data-testid": `delete-entity-button-${entityIndex}`, onClick: () => handleDeleteEntity(entityIndex), sx: Object.assign(Object.assign({}, styles.buttonAdd), { color: theme.palette.text.clearText }) }, { children: [_jsx(DeleteIcon, { style: styles.deleteIcon }), _jsx(CcfTypography, Object.assign({ sx: styles.buttonTypography }, { children: "Delete All" }))] })) }))] })), (_a = entity === null || entity === void 0 ? void 0 : entity.columns) === null || _a === void 0 ? void 0 : _a.map((param, paramIndex) => {
                                    var _a;
                                    return (_jsxs(Grid, Object.assign({ container: true, spacing: 1, style: { marginTop: '10px' }, alignItems: "center" }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 3, md: 3 }, { children: _jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.dropdownContainer), { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }) }, { children: [_jsxs(CcfTypography, Object.assign({ variant: "body2", sx: Object.assign({}, styles.labelTypography) }, { children: ["FIELD NAME", _jsx("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] })), _jsx(CcfAutoComplete, { disableClearable: true, "data-testid": `fieldName-select-${entityIndex}-${paramIndex}`, options: (crmentityFieldsOptions[entity.entityAPIName] || []).map((field, index) => (Object.assign(Object.assign({}, field), { id: `${field.name}-${index}` }))), renderOption: (props, option) => (_createElement("li", Object.assign({}, props, { key: option.id }),
                                                                _jsx("span", { children: option.label }))), value: ((_a = crmentityFieldsOptions[entity.entityAPIName]) === null || _a === void 0 ? void 0 : _a.find(field => field.name === param.columnAPIName)) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.label) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.name) === (value === null || value === void 0 ? void 0 : value.name), onChange: (event, newValue) => handleFieldChange(entityIndex, paramIndex, event, newValue), renderInput: (params) => {
                                                                var _a;
                                                                return (_jsx(TextField, Object.assign({}, params, { placeholder: "Select field", size: "small", sx: styles.autocompleteInput, InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(_Fragment, { children: [!crmentityFieldsOptions[entity.entityAPIName] && (_jsx(CircularProgress, { color: "inherit", size: 20 })), (_a = params.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment] })), sx: {
                                                                            '&::placeholder': {
                                                                                color: 'red !important',
                                                                                opacity: 1, // otherwise firefox shows a lighter color
                                                                            },
                                                                        } }) })));
                                                            }, sx: styles.selectionDropdown, PaperComponent: (props) => (_jsx(Paper, Object.assign({}, props, { sx: styles.paperComponent }))) })] })) })), _jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4, md: 4 }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.variableInputContainer }, { children: [_jsxs(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ["VARIABLE", _jsx("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] })), _jsx(CcfDeboucedInput, { className: "workflowNameInput", size: "small", required: true, variant: "outlined", id: "workflow-name", value: param.value || '', placeholder: 'Enter name', delay: 500, onChange: (e) => handleColumnChange(entityIndex, paramIndex, 'variable', e.target.value), sx: styles.inputPlaceHolder })] })) })), _jsx(Grid, Object.assign({ item: true, xs: 12, sm: 2, md: 2 }, { children: _jsx(CcfButton, Object.assign({ onClick: () => handleDeleteColumn(entityIndex, paramIndex), color: "error", size: "small", style: { marginTop: '18px' }, "aria-label": "delete", sx: styles.buttonDelete }, { children: _jsx(DeleteIcon, {}) })) }))] }), param.columnName));
                                }), _jsx(CcfButton, Object.assign({ onClick: () => handleAddEntityRow(entity.entityName), "data-testid": `add-button-${entity.entityName}`, style: { marginTop: '8px', minWidth: '3px', borderRadius: '9px', padding: '1px 1px' }, primary: true }, { children: _jsx(AddIcon, {}) }))] }) }), entity.entityName));
                }) }))] })));
};
export default CcfEnhancedWEManualFilter;
export const __testables = { handleFieldChangeFn, handleFetchError };
//# sourceMappingURL=ccf-enhanced-workflow-exec-manual-create-filter.js.map