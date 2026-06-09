import { RequestControlMode } from '@nice-devone/common-sdk';
import { Abort } from './abort';
import { Delay } from './delay';
export interface ManagedRequest extends Abort, Delay {
    /**
     * @remarks - Unique identifier for tracking the request instance.
     */
    id: string;
    /**
     * @remarks - Timestamp indicating when the request was created.
     */
    createdAt: number;
    /**
     * @remarks - Defines how the request should be controlled. Determines whether the request should be delayed, aborted, or both when multiple requests are triggered.
     */
    requestType: RequestControlMode;
}
