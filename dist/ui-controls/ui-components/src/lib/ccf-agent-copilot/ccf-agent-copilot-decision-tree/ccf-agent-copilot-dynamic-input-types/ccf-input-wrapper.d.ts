import React from 'react';
/**
 * Props for the `InputWrapper` component.
 */
interface InputWrapperProps {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}
/**
 * Provides a consistent label + required indicator wrapper around form inputs.
 * NOTE: Replace hard-coded styles with theme tokens in future iteration.
 * @example
 * ```tsx
 * <InputWrapper label="First Name" required>
 *   <input type="text" />
 * </InputWrapper>
 * ```
 */
export declare const InputWrapper: React.FC<InputWrapperProps>;
export {};
