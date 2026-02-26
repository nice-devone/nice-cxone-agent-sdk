import { EccReduxInteractionData } from '../lv-app-space.slice';
import { LvCustomerType } from '../lv-app-space-types';
import { InteractionData } from '@nice-devone/common-sdk';
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
export default function useCustomerIdUpdateOnActiveInteraction({ interaction, }?: {
    interaction?: InteractionData | null;
}): {
    onInteractionUpdated: (interactionData: EccReduxInteractionData) => void;
    updateCustomerIdInActiveInteraction: (customerId: LvCustomerType['account']) => void;
};
