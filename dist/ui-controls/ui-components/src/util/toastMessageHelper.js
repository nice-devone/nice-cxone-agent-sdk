import { jsx as _jsx } from "react/jsx-runtime";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { DigitalContactActions } from '@nice-devone/common-sdk';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
const ccfLogger = new CcfLogger('App.consumer', 'App.ccf-dispostion');
/**
 * Function to create toast for agent profile
 * @param toastInfo - AgentProfileToast
 * @example agentProfileToast(toastInfo)
 */
export const agentProfileToast = (toastInfo) => {
    var _a;
    const messageComponent = (_jsx(CcfAppToastMessage, { type: toastInfo.isError ? 'error' : 'success', messageKey: toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.messageKey }));
    const toastOptions = {
        autoClose: 2000,
        containerId: 'AppToastContainer',
        onClose: () => {
            toastInfo.toastId.current = ''; // Reset toastId.current when toast is closed
        },
    };
    if (((_a = toastInfo.toastId) === null || _a === void 0 ? void 0 : _a.current) === '') {
        toastInfo.toastId.current = toast[toastInfo.isError ? 'error' : 'success'](messageComponent, toastOptions);
    }
};
/**
   *
   * @param props - type: string, messageKey: CcfTranslationKey, status: DigitalContactStatus | string, caseId: string, options?: ToastOptions
   * @example CcfAppToastMessageWithParams(type: string, messageKey: CcfTranslationKey, status: DigitalContactStatus | string, caseId: string, options?: ToastOptions)
   */
const CcfAppToastMessageComponent = (type, messageKey, status, caseId) => {
    return (_jsx(CcfAppToastMessage, { type: type, messageKey: messageKey, extraArgs: { format: [status === DigitalContactActions.UNASSIGNED ? caseId : status] } }));
};
/**
   * Dependant on the type param, function will provide the proper toast message.
   * @param props - type: string, caseId: string, status: DigitalContactStatus | string, messageKey: CcfTranslationKey, ccfLoggerMessage: string, ccfLoggerFunctionName: string, error?: ContactLog | AgentLog | SkillLog,
   * @example toastSuccessErrorMessage(type: string, caseId: string, status: DigitalContactStatus | string, messageKey: CcfTranslationKey, ccfLoggerMessage: string, ccfLoggerFunctionName: string, error?: ContactLog | AgentLog | SkillLog)
   */
const toastSuccessErrorMessage = (type, caseId, status, messageKey, ccfLoggerMessage, ccfLoggerFunctionName, error) => {
    if (type === 'error') {
        toast.error(CcfAppToastMessageComponent(type, messageKey, status, caseId), { autoClose: 2000, containerId: 'AppToastContainer' });
        ccfLogger.info(ccfLoggerMessage + caseId, JSON.stringify(error));
    }
    else {
        toast.success(CcfAppToastMessageComponent(type, messageKey, status, caseId), { autoClose: 2000, containerId: 'AppToastContainer' });
        ccfLogger.info(ccfLoggerFunctionName, ccfLoggerMessage + caseId);
    }
};
/**
   * Function to handle the data being passed to toastSuccessErrorMessage()
   * @example handleToastMessage()
   */
export const handleToastMessage = (contactDetails, status) => {
    if (status === DigitalContactActions.UNASSIGNED) {
        contactDetails
            .unassign()
            .then(() => {
            toastSuccessErrorMessage('success', contactDetails.caseId, status, 'caseUnassigned', 'Unassign Case', `${'Successfully Unassigned case: ' + contactDetails.caseId}`);
        })
            .catch(() => {
            toastSuccessErrorMessage('error', contactDetails.caseId, status, 'unableToUnassignCase', 'Unassign Case', `${'Unable to unassign case: ' + contactDetails.caseId}`);
        });
    }
    else {
        contactDetails
            .changeStatus(status)
            .then(() => {
            toastSuccessErrorMessage('any', contactDetails.caseId, status, 'caseStatusChanged', `${'Successfully changed status of case: ' + contactDetails.caseId}`, 'Change Status');
        })
            .catch((err) => {
            toastSuccessErrorMessage('error', contactDetails.caseId, status, 'unableToChangeCaseStatus', `${'Unable to change status of case: ' + contactDetails.caseId}`, 'Change Status', err);
        });
    }
};
/**
 * Function to create toast for agent hive
 * @param toastInfo - AgentHiveToast
 * @example agentHiveToast(toastInfo)
 */
export const agentHiveToast = (toastInfo) => {
    var _a;
    const messageComponent = (_jsx(CcfAppToastMessage, { type: toastInfo.isError ? 'error' : 'success', messageKey: toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.messageKey }));
    const toastOptions = {
        autoClose: 2000,
        containerId: 'AppToastContainer',
        onClose: () => {
            toastInfo.toastId.current = ''; // Reset toastId.current when toast is closed
        },
    };
    if (((_a = toastInfo.toastId) === null || _a === void 0 ? void 0 : _a.current) === '') {
        toastInfo.toastId.current = toast[toastInfo.isError ? 'error' : 'success'](messageComponent, toastOptions);
    }
};
/**
 * * Function to handle the data being passed to handleUnassignSuccessToast(contactDetails, status)
  * @param contactDetails -contactDetails: CXoneDigitalContact
  * @param status -status: string
  * @param type -type: string - type of the message toaster ex: error, success
  * @example handleUnassignSuccessErrorToast(contactDetails, status)
*/
export const handleUnassignSuccessErrorToast = (contactDetails, status, type) => {
    toastSuccessErrorMessage(type, contactDetails.caseId, status, type === 'success' ? 'caseUnassigned' : 'unableToUnassignCase', type === 'success' ? 'Unassign Case' : 'unableToUnassignCase', `${type === 'success' ? 'Successfully Unassigned case: ' : 'Unable to unassign case: ' + contactDetails.caseId}`);
};
/**
 * Displays a global toast message with the provided messageKey.
 * @param messageKey - The translation key for the message.
 * @example
 * handleGlobalToast('transferDigitalContact');
 */
export const handleGlobalToast = (messageKey) => {
    switch (messageKey) {
        case 'transferDigitalContact':
            toastSuccessErrorMessage('success', '', '', 'transferDigitalContact', 'Successfully transferred digital contact', 'transferDigitalContact');
            break;
        case 'unableToTransferDigitalContact':
            toastSuccessErrorMessage('error', '', '', 'unableToTransferDigitalContact', 'Unable to transfer digital contact', 'transferDigitalContact');
            break;
        default:
            toastSuccessErrorMessage('any', '', '', messageKey, '', '');
            break;
    }
};
//# sourceMappingURL=toastMessageHelper.js.map