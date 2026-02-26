import { jsx as _jsx } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectcurrentStatus } from '../../ccf-agent-state/ccf-agent-state.slice';
import useLvCustomerState from '../lv-customer-card/hooks/useLvCustomerState';
import LvRemoteDesk from '../lv-remote/lv-remote-desk/lv-remote-desk';
import LvCustomerCard from '../lv-customer-card/lv-customer-card';
import { selectIsLvInteractionsSyncEnabled } from '../lv-app-space.slice';
import useCustomerIdUpdateOnActiveInteraction from '../hooks/useCustomerIdUpdateOnActiveInteraction';
/**
 * Renders the main desk component, which conditionally displays either the customer card
 * or the remote desk based on the desk failure state and the `showEccOnFail` prop.
 *
 * This component is being used for the App Space
 *
 * @example
 * ```
 * <LvDesk showEccOnFail={false} />
 * ```
 */
export function LvDesk(props) {
    const { showEccOnFail = true } = props;
    const { interaction, digitalContact, voiceContact } = useLvCustomerState();
    const [deskFailed, setDeskFailed] = useState(false);
    const agentCurrentStatus = useSelector(selectcurrentStatus);
    const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
    const { onInteractionUpdated, updateCustomerIdInActiveInteraction } = useCustomerIdUpdateOnActiveInteraction({ interaction });
    // #IMPORTANT
    // memoizing this is crucial to prevent unrequired changes produces by changes in the redux slice
    const componentProps = useMemo(() => ({
        agentCurrentStatus,
        digitalContact,
        interaction,
        onFailed: setDeskFailed,
        onInteractionUpdated: isLvInteractionsSyncEnabled ? onInteractionUpdated : undefined,
        updateCustomerIdInActiveInteraction,
        voiceContact,
    }), [
        agentCurrentStatus,
        digitalContact,
        interaction,
        isLvInteractionsSyncEnabled,
        onInteractionUpdated,
        updateCustomerIdInActiveInteraction,
        voiceContact
    ]);
    return showEccOnFail && deskFailed ? (_jsx(LvCustomerCard, {})) : (_jsx(LvRemoteDesk, { componentProps: componentProps }));
}
/**
 * Renders the main desk component, which conditionally displays either the customer card
 * or the remote desk based on the desk failure state and the `showEccOnFail` prop.
 *
 * * Differences from `LvDesk`:
 *  * 1. Used specifically for the home desk component.
 *  * 2. Does not send the active interaction to `LvRemoteDesk`.
 *
 * @example
 * ```
 * <LvDeskHome showEccOnFail={false} />
 * ```
 */
export function LvDeskHome(props) {
    const { showEccOnFail = true } = props;
    const agentCurrentStatus = useSelector(selectcurrentStatus);
    const [deskFailed, setDeskFailed] = useState(false);
    // #IMPORTANT
    // memoizing this is crucial to prevent unrequired changes produces by changes in the redux slice
    const componentProps = useMemo(() => ({
        agentCurrentStatus,
        onFailed: setDeskFailed,
    }), [agentCurrentStatus]);
    return showEccOnFail && deskFailed ? (_jsx(LvCustomerCard, {})) : (_jsx(LvRemoteDesk, { componentProps: componentProps }));
}
export default LvDesk;
//# sourceMappingURL=lv-desk.js.map