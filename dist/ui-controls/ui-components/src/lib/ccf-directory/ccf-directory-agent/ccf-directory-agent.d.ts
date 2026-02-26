/// <reference types="react" />
import { withHoverProps } from '@nice-devone/ui-controls';
import { Agent } from '../+state/ccf-directory.slice';
declare const _default: import("react").FC<{
    user: Agent;
    click?: any;
    isFullView: boolean;
    transferContactType?: string | undefined;
} & withHoverProps>;
export default _default;
