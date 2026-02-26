import React from 'react';
import { CapturedSection } from '@nice-devone/common-sdk';
/**
 * Capture details form component
 * @example
 * ```tsx
 * <CcfAgentCopilotCaptureDetails />
 * ```
 */
export interface CcfAgentCopilotCaptureDetailsProps {
    selectedSection?: CapturedSection;
    showConfirmSubmit: boolean;
    setShowConfirmSubmit: (value: boolean) => void;
    confirmFinalSubmit: () => void;
}
/**
 * Capture details section rendering selected section questions and submit action.
 * @example
 * ```tsx
 * <CcfAgentCopilotCaptureDetails
 *   sections={sections}
 *   selectedSection={selectedSection}
 *   onSubmit={(e)=>e.preventDefault()}
 *   showSubmit
 * />
 * ```
 */
export declare const CcfAgentCopilotCaptureDetails: React.FC<CcfAgentCopilotCaptureDetailsProps>;
export default CcfAgentCopilotCaptureDetails;
