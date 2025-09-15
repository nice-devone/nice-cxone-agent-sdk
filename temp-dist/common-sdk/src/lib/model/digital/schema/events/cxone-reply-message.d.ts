/**
 * Interface used for passing values of messgae on click of reply button
 */
export interface CXoneReplyToMessages {
    /**
    * @remarks idOnExternalPlatform of the selected message to reply
    */
    idOnExternalPlatform: string;
    /**
      * @remarks threadIdOnExternalPlatform of the selected message to reply
      */
    threadIdOnExternalPlatform: string;
    /**
      * @remarks authorAgentName will be agent's full name if reply is on agent's message for public channel
      */
    authorAgentName: string;
    /**
      * @remarks messageId of the selected message to reply
      */
    messageId?: string;
}
