import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Card, Stack, IconButton } from '@mui/material';
import { amdOverrideType } from '@nice-devone/agent-sdk';
import { CcfVoicemailIcon, CcfTooltip, CcfFaxMachineIcon, CcfBadNumberIcon } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { CallContactEventStatus } from '@nice-devone/core-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
/**
 * Component to display dialer controls
 * @param props - None
 * ```
 * @example-
 * <CcfDialerControls />
 * ```
 */
export const CcfDialerControls = (props) => {
    const [showAMDControls, setShowAMDControls] = useState(false);
    const cxoneAcdClient = CXoneAcdClient.instance;
    useEffect(() => {
        let timeout;
        const startTime = Date.now();
        const endTime = props.ansMachineOverrideEndTime;
        const timeDifference = new Date(endTime).valueOf() - startTime.valueOf();
        //Show AMD controls when in NaturalCallAMD state
        if (props.status === CallContactEventStatus.NATURAL_CALL_AMD
            && props.isLinked
            && (props.ansMachineOverride && timeDifference > 0 || !props.ansMachineOverride)) {
            setShowAMDControls(true);
        }
        else if (props.status !== CallContactEventStatus.NATURAL_CALL_AMD && !props.ansMachineOverride) {
            setShowAMDControls(false);
        }
        if (props.ansMachineOverride && props.isLinked && timeDifference > 0) {
            setShowAMDControls(true);
            timeout = setTimeout(() => {
                setShowAMDControls(false);
            }, timeDifference);
        }
        return () => {
            timeout && clearTimeout(timeout);
        };
    }, [props.ansMachineOverride, props.ansMachineOverrideEndTime, props.isLinked, props.status]);
    /**
    * Send the amdOverrideType
    * @param contactId -
    * @param type - enum amdOverrideTypes
    * @example
    * ```
    * amdOverride(23423423, amdOverrideTypes.answeringMachine)
    * ```
    */
    const amdOverride = (contactId, type) => {
        if (props.status === CallContactEventStatus.ACTIVE) {
            return new Promise((resolve, reject) => {
                cxoneAcdClient.contactManager.contactService.answeringMachineOverride(contactId, type).then((resp) => {
                    resolve(resp);
                }, (err) => {
                    reject(err);
                });
            });
        }
        return new Promise((resolve, reject) => {
            cxoneAcdClient.contactManager.contactService.amdOverride(contactId, type).then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    };
    const dialerButtons = [
        {
            key: amdOverrideType.answeringMachine,
            icon: _jsx(CcfVoicemailIcon, { color: 'secondary' }),
            permission: props.agentOverrideOptionAnsweringMachine,
        },
        {
            key: amdOverrideType.badNumber,
            icon: _jsx(CcfBadNumberIcon, { viewBox: '0 0 20 20', color: 'secondary' }),
            permission: props.agentOverrideOptionBadNumber,
        },
        {
            key: amdOverrideType.faxMachine,
            icon: _jsx(CcfFaxMachineIcon, { color: 'secondary' }),
            permission: props.agentOverrideOptionFax,
        }
    ];
    return _jsx(Card, Object.assign({ sx: { margin: '1px' } }, { children: showAMDControls && _jsx(Stack, Object.assign({ direction: 'row', justifyContent: "space-around", alignItems: 'center', height: '100%' }, { children: dialerButtons.map(button => button.permission
                && _jsx(CcfTooltip, Object.assign({ title: '', translationKey: amdOverrideType[button.key] }, { children: _jsx(IconButton, Object.assign({ onClick: () => __awaiter(void 0, void 0, void 0, function* () { return yield amdOverride(props.contactID, button.key); }) }, { children: button.icon })) }))) })) }));
};
//# sourceMappingURL=ccf-dialer-controls.js.map