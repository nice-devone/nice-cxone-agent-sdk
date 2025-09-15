export interface ConversationsGroupDetails {
    /**
     * @remarks - groupId of the group chat
     */
    groupId: string;
    /**
     * @remarks - groupName of the group chat
     */
    groupName: string;
    /**
     * @remarks - members of the group chat
     */
    members?: string[];
    /**
     * @remarks - threadId of the group chat
     */
    threadId?: string;
}
