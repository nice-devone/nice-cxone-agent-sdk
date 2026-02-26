import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import CcfPaperclipIcon from '../../icons/ccf-paperclip-icon/ccf-paperclip-icon';
import CcfBox from '../ccf-box/ccf-box';
/**
 * This is the control component for attachment icon button
 * @param props - CcfAttachmentButtonProps
 * @returns - JSX ELement
 * @example -
 * ```
 * <CcfAttachmentButton {...{onChange: handleFileChange, contactId: 1234567}}/>
 * ```
 */
export const CcfAttachmentButton = forwardRef((props, ref) => {
    const iconSize = props.isEmailRevamp ? { height: '1.625rem', width: '1.625rem' } : {};
    return (_jsxs(_Fragment, { children: [_jsx("input", { hidden: true, multiple: true, type: "file", "data-testid": 'upload-input-box', onChange: (event) => props.onChange(event), onClick: (event) => props.onClick(event), ref: ref }), _jsx("section", { children: _jsx(CcfBox, Object.assign({ style: { width: 'max-content' } }, { children: _jsx(CcfPaperclipIcon, { style: iconSize }) })) })] }));
});
export default CcfAttachmentButton;
//# sourceMappingURL=ccf-attachmentbutton.js.map