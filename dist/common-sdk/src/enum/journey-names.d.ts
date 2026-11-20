/**
 * Registry of journey names used with Logger.journey() / CcfLogger.journey().
 * Every journeyName value emitted anywhere in the app must come from this
 * enum, never a duplicated string literal, so call sites across different
 * Nx libraries and their tests cannot silently drift from one another.
 */
export declare const enum JourneyNames {
    DIGITAL_CONTACT_AUTO_ASSIGNMENT = "digital_contact_auto_assignment"
}
