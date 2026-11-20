"use strict";
/**
 * Delivery-tracking resolution helpers for digital message events.
 *
 * `MessageSeenChanged` and `MessageDeliveryStatusChanged` events carry the
 * Point-of-Contact object under `pointOfContact` (new contract) or `channel`
 * (old contract). These helpers resolve that object in a channel-agnostic way
 * and expose the `isTrackingMessageDeliveryStatus` flag as a strict boolean so
 * callers can ignore the events when delivery-status tracking is off.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeliveryTrackingEnabled = exports.resolvePointOfContact = void 0;
/**
 * Resolve the Point-of-Contact object from event data, tolerating both the new
 * (`pointOfContact`) and old (`channel`) contracts. `pointOfContact` takes
 * precedence when both are present. Returns `undefined` when neither exists.
 * @param eventData - the `data` payload of a seen/delivery digital event
 * @example
 * ```
 * resolvePointOfContact(event.data);
 * ```
 */
const resolvePointOfContact = (eventData) => { var _a, _b; return (_b = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.pointOfContact) !== null && _a !== void 0 ? _a : eventData === null || eventData === void 0 ? void 0 : eventData.channel) !== null && _b !== void 0 ? _b : undefined; };
exports.resolvePointOfContact = resolvePointOfContact;
/**
 * Determine whether delivery-status tracking is enabled for a seen/delivery event.
 * Reads `isTrackingMessageDeliveryStatus` from the resolved Point-of-Contact,
 * falling back to a caller-supplied source (e.g. the tracked contact's channel)
 * when the event omits the object. The decision is driven solely by the flag —
 * there is no channel-name-specific logic.
 * @param eventData - the `data` payload of a seen/delivery digital event
 * @param fallbackSource - optional source used when the event omits the Point-of-Contact
 * @returns `true` only when the flag is strictly `true`; `false`/`null`/absent all return `false`
 * @example
 * ```
 * isDeliveryTrackingEnabled(event.data, currentContact.channel);
 * ```
 */
const isDeliveryTrackingEnabled = (eventData, fallbackSource) => {
    var _a;
    const source = (_a = (0, exports.resolvePointOfContact)(eventData)) !== null && _a !== void 0 ? _a : fallbackSource;
    return (source === null || source === void 0 ? void 0 : source.isTrackingMessageDeliveryStatus) === true;
};
exports.isDeliveryTrackingEnabled = isDeliveryTrackingEnabled;
//# sourceMappingURL=delivery-tracking.util.js.map