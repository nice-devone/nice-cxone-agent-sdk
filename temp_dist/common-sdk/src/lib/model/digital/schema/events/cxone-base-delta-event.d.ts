/**
 * Abstract base class for digital delta events containing common validation logic and properties.
 * Provides a foundation for parsing and validating WebSocket delta events by implementing
 * common field validation and requiring concrete implementations for event-specific validation.
 */
export declare abstract class BaseDeltaEvent<T> {
    eventType: string;
    caseId: string;
    traceId?: string | null;
    interactionId: string | null;
    timestamp: Date;
    delta: T;
    /**
     * Creates a base delta event wrapper for validating event data.
     * @param eventData - Raw event payload to validate.
     * @example
     * // Use concrete implementation since this is an abstract class
     * const event = new CaseStatusChangedDeltaEvent(eventData);
     * const validatedEvent = event.parseAndValidate();
     */
    constructor(eventData: any);
    /**
     * Validates common delta event fields shared across all event types.
     *
     * Validates eventType, traceId, caseId, interactionId, and sets timestamp.
     * Called internally by parseAndValidate() method.
     *
     * @param eventData - Raw event payload to validate.
     * @throws Error if validation fails for any common field
     * @example - validateCommonFields() is called internally by parseAndValidate().
     */
    protected validateCommonFields(eventData: any): void;
    /**
     * Abstract method for validating event-specific delta fields.
     *
     * Must be implemented by each concrete event type class to validate
     * the fields specific to that event type.
     *
     * @param eventData - Raw event payload to validate.
     * @throws Error if validation fails for any event-specific field
     */
    protected abstract validateDeltaFields(eventData: any): void;
}
