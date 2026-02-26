import { PopOverMenuItem } from '@nice-devone/ui-controls';
export interface CcfAddEventPopoverProps {
    paperProps?: {
        style?: {
            [key: string]: string;
        };
    };
}
/**
 *custom hook to give commitment popover items
 * @returns -addEventPopoverItems, disableAddEvent
 * @example - `useCCfCommitmentPopOverItems()`
 */
export declare const useCcfCommitmentAddEventPopOverItems: () => {
    addEventPopoverItems: PopOverMenuItem[];
    disableAddEvent: boolean;
};
/**
 * CcfCommitments - returns add commitment to schedular app
 * @returns - CcfCommitments
 * @example - `<CcfCommitments />`
 */
export declare const CcfAddEventPopover: ({ paperProps }: CcfAddEventPopoverProps) => JSX.Element;
