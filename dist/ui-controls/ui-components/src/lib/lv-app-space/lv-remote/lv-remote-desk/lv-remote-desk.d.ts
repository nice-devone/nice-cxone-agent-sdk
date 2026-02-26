import React from 'react';
import { SxProps } from '@mui/material/styles';
import { CxOneInteractionDataType } from '../../lv-app-space-types';
import { agentCurrentStatus } from '../../../ccf-agent-state/ccf-agent-state.slice';
export declare type LvDeskProps = {
    componentProps?: {
        agentCurrentStatus?: agentCurrentStatus;
        onFailed?: (failed: boolean) => void;
    } & CxOneInteractionDataType;
    onMounted?: () => void;
    sx?: SxProps;
};
export declare const dataTestId: string;
/**
 *
 * LvDesk is the wrapper that imports LVDESK into CXone
 * @example
 * ```
 * <LvDesk />
 * ```
 */
export declare function LvRemoteDesk(props: LvDeskProps): JSX.Element;
/**
 * Preloads the LV Desk module federation in the DOM without displaying the component.
 * The component mounts `LvDesk` with `display: 'none'` to trigger module federation loading,
 * then removes itself from the DOM after a short delay.
 *
 * @example
 * // Usage: Place <LvDeskPreloader /> somewhere in your app to preload ECC in the background.
 * <LvDeskPreloader />
 */
export declare const LvDeskPreloader: React.NamedExoticComponent<object>;
export default LvRemoteDesk;
