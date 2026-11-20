/**
 * Util to check whether voice transcription is enabled (permission + product enablement)
 * @returns - boolean
 * @example -
 * ```
 * isVoiceTranscriptionEnabledAndToggledOn();
 * ```
 */
export declare const isVoiceTranscriptEnabledAndToggledOn: () => Promise<boolean>;
/**
 * Util to check whether the V3 multi-party voice transcription path is enabled.
 * Requires the base voice transcript enablement plus the V3 feature toggle, so
 * V3 conference rendering can be rolled out independently of V2 transcription.
 * @returns - boolean
 * @example -
 * ```
 * isVoiceTranscriptV3EnabledAndToggledOn();
 * ```
 */
export declare const isVoiceTranscriptV3EnabledAndToggledOn: () => Promise<boolean>;
