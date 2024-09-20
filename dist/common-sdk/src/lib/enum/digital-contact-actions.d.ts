/**
 * Enum for Digital Contact Actions
 */
export declare enum DigitalContactActions {
    /**
     * The contact has been unassigned and dismissed
     */
    UNASSIGNED = "unassign",
    /**
    * The fingerprint has been done
    */
    FINGERPRINTED = "chatFingerprint",
    /**
     * The contact has to open origin of post
     */
    SHOW_ORIGIN = "show origin",
    /**
     * The message has to be hidden
     */
    HIDE = "hide",
    /**
     * The message has to be unhidden
     */
    UNHIDE = "unhide",
    /**
     * The message has to be deleted
     */
    DELETE = "delete",
    /**
    * The Message is yet to be shared
    */
    SHARE = "share",
    /**
    * The message is already shared
    */
    SHARED = "shared",
    /**
    * Contact needs transcript to be emailed
    */
    TRANSCRIPT = "transcript",
    /**
  * Open Co-browse link
  */
    COBROWSE = "cobrowse",
    /**
      * Open translate messages popover
      */
    TRANSLATE = "translate",
    /**
    * The contact has to be dismissed in case of preview case
    */
    DISMISS = "dismiss",
    /**
    * print the interaction space
    */
    PRINT = "print",
    /**
     * The contact has to be assigned to same agent
     */
    ASSIGN_TO_ME = "assignToMe",
    /**
     * Delete author name
     */
    DELETE_AUTHOR_NAME = "delete author name",
    /**
     * Delete content
     */
    DELETE_CONTENT = "delete content"
}
