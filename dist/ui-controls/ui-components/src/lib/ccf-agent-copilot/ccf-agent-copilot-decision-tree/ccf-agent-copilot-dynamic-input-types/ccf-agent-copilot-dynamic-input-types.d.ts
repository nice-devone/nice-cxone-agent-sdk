import React from 'react';
import { CapturedQuestion } from '@nice-devone/common-sdk';
/**
 * - Boolean → Yes/No
 * - Date → always editable
 * - Text/Number → inline edit mode with ✓ ✕
 * @example
 * ```tsx
 * <CommonInput
 *  question={q}
 * />
 * ```
 * @returns JSX.Element
 */
export declare const CcfAgentCopilotDynamicInput: React.FC<{
    question: CapturedQuestion;
}>;
