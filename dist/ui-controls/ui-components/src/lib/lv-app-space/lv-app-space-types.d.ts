/// <reference types="react" />
import { Theme, SxProps } from '@mui/material/styles';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
import { InteractionData } from '@nice-devone/common-sdk';
import { EccReduxInteractionData } from './lv-app-space.slice';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
/**
 * Contact/Customer object definition
 */
export declare type LvCustomerType = {
    account?: string;
    firstName?: string;
    lastName?: string;
};
/**
 * Contact/Customer supports the same search criteria as the Contact/Customer fields
 * plus some other fields
 */
export declare type LvCustomerSearchCriteriaType = LvCustomerType & {
    emailAddress?: string;
    externalInteractionId?: string;
    externalThreadId?: string;
    interactionStartDate?: string;
    name?: string;
    omniSearch?: string;
    phone?: string;
};
/**
 * CxOneInteractionDataType is used to define the interaction data type
 */
export declare type CxOneInteractionDataType = {
    digitalContact?: CXoneDigitalContact | null;
    voiceContact?: CXoneVoiceContact | null;
    interaction?: InteractionData | null;
    onInteractionUpdated?: (interaction: EccReduxInteractionData) => void;
};
/**
 * TabProps is used to define the properties of a tab in the LVCustomer component.
 */
export declare type TabProps = {
    element: React.ReactNode;
    label: string;
    path: string;
    sx?: SxProps<Theme>;
};
