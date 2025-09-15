/**
 * Interface MessageNoteUserAttributes contais message note's user attributes
 */
interface MessageNoteUserAttributes {
    /**
 * @remarks - agentId - agent id of the user
 */
    agentId: number;
    /**
   * @remarks - emailAddress - email address of the user
   */
    emailAddress: string;
    /**
   * @remarks - firstName - first name of the user
   */
    firstName: string;
    /**
   * @remarks - id - id of the user
   */
    id: number;
    /**
   * @remarks - incontactId - incontactId for a user
   */
    incontactId: string;
    /**
   * @remarks - isBotUser - true if user is a bot user
   */
    isBotUser: boolean;
    /**
   * @remarks - isSurveyUser - true if user is a survey user
   */
    isSurveyUser: boolean;
    /**
  * @remarks - loginUsername - username, user has logged in with
  */
    loginUsername: string;
    /**
   * @remarks - nickname - nickname of the user
   */
    nickname: string;
    /**
   * @remarks - surname - surname of the user
   */
    surname: string;
}
/**
 * Interface CxoneContactMessageNote containing message note properties
 */
export interface CxoneDigitalMessageNote {
    /**
 * @remarks - content holds the message of the note
 */
    content: string;
    /**
   * @remarks - createdAt - datetime stamp when message note created
   */
    createdAt: string;
    /**
   * @remarks - currentAssignee - current user who has been assigned the digital case
   */
    currentAssignee: string | null;
    /**
   * @remarks - id - id of the message note
   */
    id: string;
    /**
   * @remarks - message - holds id attribute for which the note has been posted
   */
    message: {
        id: string;
    };
    /**
   * @remarks - status - status of the action of the message note ex: new or checked
   */
    status: {
        type: string;
    };
    /**
   * @remarks - updatedAt - datetimestamp when the message note has been updated
   */
    updatedAt: string;
    /**
   * @remarks - user - details of the user who posted the message note
   */
    user: MessageNoteUserAttributes;
}
export {};
