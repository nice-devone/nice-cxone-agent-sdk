/**
 * Event Data dispatched from embedded app for initialization update.
 */
export interface EmbeddedAppInitializedEvent {
    /**
     * detail that includes what data are we sending from embedded app to CXone agent app.
     */
    detail: EmbeddedAppInitializedData;
}
interface EmbeddedAppInitializedData {
    embeddedAppInitialized: boolean;
}
export {};
