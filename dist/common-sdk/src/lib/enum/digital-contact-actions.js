"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalContactActions = void 0;
/**
 * Enum for Digital Contact Actions
 */
var DigitalContactActions;
(function (DigitalContactActions) {
    /**
     * The contact has been unassigned and dismissed
     */
    DigitalContactActions["UNASSIGNED"] = "unassign";
    /**
    * The fingerprint has been done
    */
    DigitalContactActions["FINGERPRINTED"] = "chatFingerprint";
    /**
     * The contact has to open origin of post
     */
    DigitalContactActions["SHOW_ORIGIN"] = "show origin";
    /**
     * The message has to be hidden
     */
    DigitalContactActions["HIDE"] = "hide";
    /**
     * The message has to be unhidden
     */
    DigitalContactActions["UNHIDE"] = "unhide";
    /**
     * The message has to be deleted
     */
    DigitalContactActions["DELETE"] = "delete";
    /**
    * The Message is yet to be shared
    */
    DigitalContactActions["SHARE"] = "share";
    /**
    * The message is already shared
    */
    DigitalContactActions["SHARED"] = "shared";
    /**
    * Contact needs transcript to be emailed
    */
    DigitalContactActions["TRANSCRIPT"] = "transcript";
    /**
  * Open Co-browse link
  */
    DigitalContactActions["COBROWSE"] = "cobrowse";
    /**
      * Open translate messages popover
      */
    DigitalContactActions["TRANSLATE"] = "translate";
    /**
    * The contact has to be dismissed in case of preview case
    */
    DigitalContactActions["DISMISS"] = "dismiss";
    /**
    * print the interaction space
    */
    DigitalContactActions["PRINT"] = "print";
    /**
     * The contact has to be assigned to same agent
     */
    DigitalContactActions["ASSIGN_TO_ME"] = "assignToMe";
    /**
     * Delete author name
     */
    DigitalContactActions["DELETE_AUTHOR_NAME"] = "delete author name";
    /**
     * Delete content
     */
    DigitalContactActions["DELETE_CONTENT"] = "delete content";
    /**
     * Reply on message
     */
    DigitalContactActions["REPLY"] = "reply";
    /**
    * Like the post
     */
    DigitalContactActions["LIKE"] = "like";
})(DigitalContactActions = exports.DigitalContactActions || (exports.DigitalContactActions = {}));
//# sourceMappingURL=digital-contact-actions.js.map