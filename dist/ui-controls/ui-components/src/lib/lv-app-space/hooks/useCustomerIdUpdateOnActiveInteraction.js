import { useCallback } from 'react';
import { updateLVLSWithCustomerId } from '../lv-interactions/lv-interactions-utility';
import { CcfAssignmentAction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch } from 'react-redux';
import { Logger } from '@nice-devone/core-sdk';
import { LOGGER_MODULE } from '../lv-app-space-utility';
const logger = new Logger(LOGGER_MODULE, 'useCustomerIdUpdateOnActiveInteraction');
/**
 * Custom hook for managing customer ID updates in the active interaction.
 *
 * Provides callbacks to update the customer ID in the current interaction and to handle interaction updates.
 *
 * @param params - Object containing the current interaction.
 * @returns Object with `onInteractionUpdated` and `updateCustomerIdInActiveContact` callbacks.
 * @example
 * ```
 *    const { onInteractionUpdated, updateCustomerIdInActiveContact } = useCustomerIdUpdateOnActiveInteraction({ interaction });
 *    updateCustomerIdInActiveContact('customer-123');
 *    onInteractionUpdated(interactionData);
 * ```
 */
export default function useCustomerIdUpdateOnActiveInteraction({ interaction, } = {}) {
    const dispatch = useDispatch();
    /**
     * Once a customer is selected from the LV Customer Card, we are adding it to the current active
     * interaction.
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @example
     * ```
     * updateCustomerIdInActiveContact({ customerId: '123'})
     * ```
     */
    const updateCustomerIdInActiveInteraction = useCallback((customerId) => {
        try {
            const { selectedContactId: caseId, interactionId, interactionType } = interaction !== null && interaction !== void 0 ? interaction : {};
            if (interactionId && caseId && interactionType) {
                dispatch(CcfAssignmentAction.handleCustomerIdChangedContactEvent({
                    caseId,
                    customerId,
                    interactionId,
                    interactionType,
                }));
            }
        }
        catch (error) {
            logger.error('ECC - Error updating customer ID in active contact:', JSON.stringify(error));
        }
    }, [dispatch, interaction]);
    /**
     * Callback triggered when the interaction is updated.
     *
     * Dispatches an action to update the customer ID in the interaction UUIDs by contact ID.
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param interactionData - The updated interaction data.
     * @example
     * ```
     * onInteractionUpdated(interactionData)
     * ```
     */
    const onInteractionUpdated = useCallback((interactionData) => {
        const { externalThreadId: contactId, customerId } = interactionData;
        if (contactId && customerId) {
            updateCustomerIdInActiveInteraction(customerId);
            updateLVLSWithCustomerId(contactId, customerId);
        }
    }, [updateCustomerIdInActiveInteraction]);
    return { onInteractionUpdated, updateCustomerIdInActiveInteraction };
}
//# sourceMappingURL=useCustomerIdUpdateOnActiveInteraction.js.map