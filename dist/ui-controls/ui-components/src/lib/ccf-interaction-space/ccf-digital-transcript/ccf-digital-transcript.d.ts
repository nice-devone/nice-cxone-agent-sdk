import React from 'react';
/**
 * Enum for Digital Transcript Status
 */
export declare enum DigitalTranscriptStatus {
    /**
    * Digital Transcript in Pending status
    */
    PENDING = "pending",
    /**
    * Digital Transcript in fulfilled status
    */
    SUCCEEDED = "succeeded",
    /**
    * Digital Transcript in Failed status
    */
    FAILED = "failed"
}
/**
 * component function for render Digital Transcript Popup
 * @example '<CcfDigitalTranscriptx />'
 */
export declare function CcfDigitalTranscript(): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfDigitalTranscript>;
export default _default;
