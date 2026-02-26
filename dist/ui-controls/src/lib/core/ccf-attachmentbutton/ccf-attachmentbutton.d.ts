import React from 'react';
export interface CcfAttachmentButtonProps {
    isEmailRevamp?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}
/**
 * This is the control component for attachment icon button
 * @param props - CcfAttachmentButtonProps
 * @returns - JSX ELement
 * @example -
 * ```
 * <CcfAttachmentButton {...{onChange: handleFileChange, contactId: 1234567}}/>
 * ```
 */
export declare const CcfAttachmentButton: React.ForwardRefExoticComponent<CcfAttachmentButtonProps & React.RefAttributes<HTMLInputElement>>;
export default CcfAttachmentButton;
