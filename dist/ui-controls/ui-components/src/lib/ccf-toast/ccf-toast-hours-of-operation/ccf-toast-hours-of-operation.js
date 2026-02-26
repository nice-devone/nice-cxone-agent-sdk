import { jsx as _jsx } from "react/jsx-runtime";
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
const cxoneAcdClient = CXoneAcdClient.instance;
/**
* Function to display the hours of operation message
* @example -displayHoursOfOperationToast()
*/
export function displayHoursOfOperationToast() {
    const hooToast = _jsx(CcfAppToastMessage, { primaryBtnText: 'Proceed', secondaryBtnText: 'cancel', messageKey: 'hooNotification', triggerPrimaryHandler: () => sendReskillApi(true), triggerSecondaryHandler: () => sendReskillApi(false), type: 'warn' });
    toast.warn(hooToast, {
        autoClose: false,
        closeButton: false,
        containerId: 'AppToastContainer',
    });
    return hooToast;
}
;
/**
* Function to send the reskill API
* @example - sendReskillApi()
*/
function sendReskillApi(continueReskill) {
    cxoneAcdClient.contactManager.voiceService.sendContinueReskill(continueReskill);
    toast.dismiss();
}
;
//# sourceMappingURL=ccf-toast-hours-of-operation.js.map