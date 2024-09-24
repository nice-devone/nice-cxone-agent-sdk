import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { AgentState, CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
/**
   * Class to make Personal Connection calls
   */
export declare class PersonalConnectionService {
    private static singleton;
    protected logger: Logger;
    private acdSession;
    private auth;
    protected utilService: HttpUtilService;
    /**
       * Method to create singleton object of the class
       * ```
       * @example
       * const personalConnectionService = PersonalConnectionService.instance;
       * ```
       */
    static get instance(): PersonalConnectionService;
    /**
       *
       * ```
       * @example
       * const personalConnection = new PersonalConnectionService();
       * ```
       */
    constructor();
    /**
       * Service method to login to pc dialer
       * @param agentState - Log into the PC dialer skill
       * @returns - response from the PC_DIALER_LOGIN api
       * @example
       * ```
       * pcDialerLogin({ agentState: AgentState })
       * ```
      */
    pcDialerLogin(agentState: AgentState): Promise<HttpResponse | CXoneSdkError>;
    /**
       * Service method to logout of pc dialer
       * @param agentState - Log out of the PC dialer skill
       * @returns - response from the PC_DIALER_LOGOUT api
       * @example
       * ```
       * pcDialerLogout({ agentState: AgentState })
       * ```
       */
    pcDialerLogout(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Snoozes a preview personal connection contact. The contact will be delivered to another agent.
     * @param contactId - contact id
     * @example - snoozeContact(123456)
     */
    snoozeContact(contactId: string): Promise<HttpResponse>;
    /**
   * This method sets the primary and secondary dispositions on a contact after that contact has been disconnected.
   * This API call allows you to select the Disposition, provide any notes as part of the dispositioning of the contact,
   * and to provide a commitment amount, or a callback time and phone number.
   * @param contactId - contact id
   * @example - rescheduleSaveContact(123456)
   */
    rescheduleCall(data: {
        contactId: string;
        dispositionId: number;
        callbackNumber: string | undefined;
        callbackTime: string;
        rescheduleCallNotes: string;
    }): Promise<HttpResponse>;
    /**
   * This call updates the contact state and allows subsequent calls to update the outcome status of the contact.
   * The contact should have been routed to the Agent in a dialing state.
   * @param contactId - contact id
   * @example - callPlaced(123456)
   */
    callPlaced(contactId: string): Promise<HttpResponse>;
    /**
   * This method will update the outcome value of an independent call contact after the call is placed in a separate telephony system.
   * This should only be called a single time on a contact to indicate the final outcome for the call.
   * @param contactId - contact id
   * @example - outcomeSelection(123456)
   */
    outcomeSelection(data: {
        outcome: string;
        contactId: string;
    }): Promise<HttpResponse>;
}
