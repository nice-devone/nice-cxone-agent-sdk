import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress, Typography, useTheme } from '@mui/material';
import { CcfListItem, CcfListItemAvatar, CcfListItemSecondaryAction, CcfListItemText, CcfPaperclipIcon, CcfPlusIcon, } from '@nice-devone/ui-controls';
import fileUploadItemStyles from './ccf-fileuploaditem.styles';
/**
 * Used to create container of attachment files
 * @param props - CcfFileUploadItemProps
 * @returns - JSX Element
 * @example -
 * ```
 * <CcfFileUploadItem {...{ id: file.id, name: file.name, size: formatBytes(file.size), uploaded: file.uploaded, removeAttachment: handleRemoveAttachment }} />
 * ```
 */
export function CcfFileUploadItem(props) {
    const theme = useTheme();
    const styles = fileUploadItemStyles(theme);
    /**
     * Used to get the file upload list item secondary action JSX Element
     * @returns - JSX Element
     * @example -
     * ```
     * <CcfListItem
     * secondaryAction={getListItemSecondaryAction()}
     * >
     * </CcfListItem>
     * ```
     */
    const getListItemSecondaryAction = () => (_jsx(CcfListItemSecondaryAction, Object.assign({ sx: styles.closeIconContainer, onClick: (e) => {
            e.stopPropagation();
            props.removeAttachment && props.removeAttachment(props.id);
        }, role: "button", "aria-label": 'remove attachment' }, { children: _jsx(CcfPlusIcon, { style: styles.closeIcon }) })));
    /**
     * Used to get the file upload list item avatar JSX Element
     * @returns - JSX Element
     * @example -
     * ```
     * {getListItemAvatar()}
     * ```
     */
    const getListItemAvatar = () => (_jsx(CcfListItemAvatar, Object.assign({ sx: styles.fileAvatarContainer }, { children: _jsx(CcfPaperclipIcon, { style: Object.assign(Object.assign({}, styles.fileAvatarIcon), (props.uploaded
                ? styles.primaryIconColor
                : styles.secondaryIconColor)) }) })));
    /**
     * Used to get the file upload list item text area JSX Element
     * @returns - JSX Element
     * @example -
     * ```
     * {getListItemText()}
     * ```
     */
    const getListItemText = () => (_jsx(CcfListItemText, { disableTypography: false, primary: getListItemPrimaryTextFields() }));
    /**
     * Used to get the file upload list item text area's primary text JSX Element
     * @returns - JSX Element
     * @example -
     * ```
     * <CcfListItemText
     * primary={getListItemPrimaryTextFields()}
     * ></CcfListItemText>
     * ```
     */
    const getListItemPrimaryTextFields = () => (_jsxs("div", Object.assign({ style: { display: 'flex' } }, { children: [_jsx(Typography, Object.assign({ noWrap: true, sx: Object.assign(Object.assign({}, styles.primaryText), (props.uploaded ? {} : styles.primaryTextLight)) }, { children: props.name })), !props.isReplyCard &&
                _jsxs(Typography, Object.assign({ noWrap: true, sx: styles.secondaryText }, { children: ["(", props.size, ")"] })), !props.uploaded && (_jsx(CircularProgress, { variant: "indeterminate", color: "secondary", size: 13, role: "progressbar", "aria-label": 'upload progressbar' }))] })));
    return ((props.isReplyCard) ?
        _jsxs(CcfListItem, Object.assign({ sx: styles.fileUploadItemContainer }, { children: [getListItemAvatar(), getListItemText()] })) :
        _jsxs(CcfListItem, Object.assign({ secondaryAction: getListItemSecondaryAction(), sx: styles.fileUploadItemContainer }, { children: [getListItemAvatar(), getListItemText()] })));
}
export default CcfFileUploadItem;
//# sourceMappingURL=ccf-fileuploaditem.js.map