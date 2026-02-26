import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import * as interfaces from '../interfaces';
/**
 * Interface for screen pop data
 */
interface ScreenPopData {
    crm?: string;
    id?: string;
    [key: string]: unknown;
}
/**
 * Class for the "Relates To" service.
 */
declare class Service {
    localStorage: interfaces.service.IControllerLocalStorage;
    isRelatesToFeatureEnabledforMSD: boolean;
    CXoneAgentEvents: typeof CXoneAgentEvents;
    window: Window & typeof globalThis;
    getAgentWorkflowConfigurationDataMemorializationDetails: (selectedContactId: any) => {
        configurationId: any;
        workflowId: any;
    };
    generatePinnedRecordsConfiguration: (searches: any, relationships: any, selectedContactId: any, translate?: () => void) => {
        pinnedRecords: any;
        enableRowOpenURL: boolean;
    };
    screenPop: (data: ScreenPopData) => 0 | -1;
    getConfigurationForDefaultState: (pinnedRecordEntityId: string, records: any[] | undefined, relatableEntities: any[] | undefined, isAgentWorkflowConfigurationDataMemorializationConfigured: boolean | undefined, selectedContactId: string, translate?: (key: string) => void, crm?: string) => {
        elementAttributeOfID: string;
        isRelatesToEnabled: boolean;
        tooltipMessage: void;
    } | {
        elementAttributeOfID: string;
        isRelatesToEnabled: boolean;
        tooltipMessage: string;
    };
    determineIfRecordHasRelatableEntities: (records?: any[], relatableEntities?: any[]) => boolean;
    checkIfListItemTextIsOverflowing: (scrollWidth: number | undefined, clientWidth: number | undefined) => boolean;
}
declare const _default: Service;
export default _default;
