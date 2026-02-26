/// <reference types="react" />
import { CcfTranslationKey } from '@nice-devone/i18n';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
export interface AgentProfileToast {
    isError: boolean;
    messageKey: CcfTranslationKey;
    toastId: React.MutableRefObject<string | number>;
}
/**
 * Interface for AgentHiveToast
 */
export interface AgentHiveToast {
    isError: boolean;
    messageKey: CcfTranslationKey;
    toastId: React.MutableRefObject<string | number>;
}
/**
 * Function to create toast for agent profile
 * @param toastInfo - AgentProfileToast
 * @example agentProfileToast(toastInfo)
 */
export declare const agentProfileToast: (toastInfo: AgentProfileToast) => void;
/**
   * Function to handle the data being passed to toastSuccessErrorMessage()
   * @example handleToastMessage()
   */
export declare const handleToastMessage: (contactDetails: CXoneDigitalContact, status: string) => void;
/**
 * Function to create toast for agent hive
 * @param toastInfo - AgentHiveToast
 * @example agentHiveToast(toastInfo)
 */
export declare const agentHiveToast: (toastInfo: AgentHiveToast) => void;
/**
 * * Function to handle the data being passed to handleUnassignSuccessToast(contactDetails, status)
  * @param contactDetails -contactDetails: CXoneDigitalContact
  * @param status -status: string
  * @param type -type: string - type of the message toaster ex: error, success
  * @example handleUnassignSuccessErrorToast(contactDetails, status)
*/
export declare const handleUnassignSuccessErrorToast: (contactDetails: CXoneDigitalContact, status: string, type: string) => void;
/**
 * Displays a global toast message with the provided messageKey.
 * @param messageKey - The translation key for the message.
 * @example
 * handleGlobalToast('transferDigitalContact');
 */
export declare const handleGlobalToast: (messageKey: CcfTranslationKey) => void;
