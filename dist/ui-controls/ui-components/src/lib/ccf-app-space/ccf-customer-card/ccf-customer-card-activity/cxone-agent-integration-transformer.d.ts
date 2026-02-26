import { CXoneDigitalContactData, CXoneIntegrationEntity, RelatesToEntity, CXoneVoiceContactData } from '@nice-devone/shared-apps-lib';
import { CcfDispositionValues, timeDurationCalculation } from './ccf-customer-card-activity';
import { GlobalDispositionData } from '../../../ccf-disposition/ccf-disposition-slice';
import { AgentWorkflowRequestEvent, AgentWorkflowResponseEvent, CXoneRoutingQueue, ContactData, CustomEventDetails } from '@nice-devone/common-sdk';
import { DetailedDigitalContactData } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
/**
 * Utility class to transform type for CRM workflow executions
 * */
export declare class CXoneAgentIntegrationTransformer {
    private static logger;
    /**
       * Calculates the duration in seconds between two date/time values.
       * @param startTime - The start time (string, number, or Date)
       * @param endTime - The end time (string, number, or Date)
       * @returns The duration in seconds, or undefined if invalid input.
       * @example - NA
       */
    static getDurationInSeconds(startTime: string | number | Date, endTime: string | number | Date): number | string;
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @param contact - information about contact dispositionValue - Information about dispostion selected by Agent
      * VoiceContactDetails - state of voice contact details , CurrentUser - Localstorage object having info about current user
      * @example - NA
      */
    static toCXoneVoiceContactData(contact: any, dispositionValue: any, voiceContactDetails: any, currentUser: any): CXoneVoiceContactData;
    /**
     * * update CRM Navigation Data from storage into ScriptVariables for Dama Memoralization
     * @param target  - CXoneVoiceContactData | CXoneDigitalContactData
     * @example NA
     */
    static updateCRMNavigationDataintoScriptVariables(cxOneContactData: CXoneVoiceContactData | CXoneDigitalContactData): void;
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param contact - information about contact , dispositionValue - Information about dispostion selected by Agent
      * CurrentUser - Localstorage object having info about current user
      */
    static toCXoneDigitalContactData(contact: any, dispositionValue: CcfDispositionValues, currentUser: any, timeDuration: timeDurationCalculation, caseId: string): CXoneDigitalContactData;
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param entityInformation - id  & type of entity
      */
    static toCXoneIntegrationEntity(entityInformation: any): CXoneIntegrationEntity;
    /**
      * Transforms object to CXoneDigitalContactData that can be used by any Create TimeLine & Data Memorialization.
      * @example - NA -
      * @param entityInformation - id  & type of entity
      * @param relatedobject - object related to entity for call from and call to fields based on type of call related to entity
      */
    static toCXoneIntegrationEntityRelatesto(entityInformation: any, relatedobject: object): RelatesToEntity;
    /**
     * Transforms variables made available in screenpop to a script variables object that is provided to the Data Memorialization request payload.
     * @example - NA -
     * @param screenPopUrlVariables - array of objects
     */
    static screenPopUrlVariablesToScriptVariables: (screenPopUrlVariables?: {
        [key: string]: string;
    }[]) => {
        [key: string]: string;
    };
    /**
     * Transform the data as payload to dispatch method
     *  @example NA
     */
    static cxoneExecuteTimelineDataMapping(contact?: ContactData, dispositionData?: GlobalDispositionData, selectedActivityData?: any, selectedActivityConfig?: any, activeContact?: ContactData, digitalContactDetails?: DetailedDigitalContactData, getCxoneRoutingQueuId?: CXoneRoutingQueue, currentUser?: any, voiceContactDetails?: CXoneVoiceContact): {
        contact: ContactData | undefined;
        dispositionData: GlobalDispositionData | undefined;
        selectedActivityData: any;
        selectedActivityConfig: any;
        activeContact: ContactData | undefined;
        digitalContactDetails: DetailedDigitalContactData | undefined;
        getCxoneRoutingQueuId: import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
            isSubqueue: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            skillId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            agentResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFirstResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerResponseEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            agentFollowOnResponseTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            customerIdleTime: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            timeExtensionEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }> | undefined;
        currentUser: any;
        voiceContactDetails: CXoneVoiceContact | undefined;
    };
    /**
     * Transform the to object which is used to clear the local storage
     *  @example NA
     */
    static cxoneRemoveTimelineDMInfo(digitalContact?: ContactData, activityData?: AgentWorkflowResponseEvent, activitySearchData?: AgentWorkflowRequestEvent, availableCustomEvent?: CustomEventDetails): {
        contacts: ContactData | undefined;
        activityData: AgentWorkflowResponseEvent | undefined;
        cxoneCcActivitySearch: AgentWorkflowRequestEvent | undefined;
        customEventDetails: CustomEventDetails | undefined;
    };
}
