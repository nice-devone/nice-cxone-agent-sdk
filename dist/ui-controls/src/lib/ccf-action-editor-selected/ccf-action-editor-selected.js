import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button } from '@mui/material';
import { CcfTypography } from '../core/ccf-typography/ccf-typography';
import CcfActionEditorSelectedStyles from './ccf-action-editor-selected-styles';
/**
 * Component displays chips based on selections
 * @param props - CcfActionEditorSelectedProps
 * @returns component
 * @example <CcfActionEditorSelected />
 */
export function CcfActionEditorSelected(props) {
    const { selections = [], handleDelete, label, title = '', titleStyles = {} } = props;
    const styles = CcfActionEditorSelectedStyles();
    return (_jsxs(Box, { children: [_jsx(CcfTypography, Object.assign({ sx: titleStyles }, { children: title })), _jsx(Box, Object.assign({ sx: styles.selections }, { children: selections.map((selection, index) => {
                    let name = '';
                    if (label) {
                        switch (typeof selection) {
                            case 'object':
                                name = selection[label];
                                break;
                            case 'string':
                                name = selection;
                                break;
                        }
                    }
                    return (_jsxs(Box, Object.assign({ sx: styles.chip, id: 'ccf-action-editor-selected_chip' }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.chip.label, id: 'ccf-action-editor-selected_chip_label' }, { children: name })), _jsx(Button, { sx: [styles.button, styles.chip.remove], id: 'ccf-action-editor-selected_button ccf-action-editor-selected_chip_remove', "data-testid": `aes-delete-button-${index}`, onClick: () => handleDelete && typeof handleDelete === 'function' && handleDelete(selection) })] }), `selected-${index}`));
                }) }))] }));
}
export default CcfActionEditorSelected;
//# sourceMappingURL=ccf-action-editor-selected.js.map