/// <reference types="react" />
export interface CcfCustomerCardContactHistoryProps {
    customerId: string;
}
export interface CcfCustomerOwnerAssigneeUser {
    nickname: string;
    surname: string;
    firstName: string;
}
export interface CcfCustomerInboxAssigneeUser {
    identities: CcfCustomerIdOnExternalPlatform[];
}
export interface CcfCustomerIdOnExternalPlatform {
    idOnExternalPlatform: string;
    externalPlatformId: string;
}
export interface CcfAuthorEndUserIdentity {
    externalPlatformId: string;
    fullName: string;
}
export interface CcfCustomerContactHistory {
    routingQueueId: string;
    ownerAssigneeUser: CcfCustomerOwnerAssigneeUser;
    createdAt: string;
    direction: string;
    inboxAssigneeUser: CcfCustomerInboxAssigneeUser;
    endUser: CcfCustomerInboxAssigneeUser;
    status: string;
    id: string;
    inboundCount: number;
    outboundCount: number;
    skill: string;
    name: string;
    image: string;
    agentName: string;
    authorEndUserIdentity: CcfAuthorEndUserIdentity;
    statusUpdatedAt: Date;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardContactHistory(props: CcfCustomerCardContactHistoryProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfCustomerCardContactHistory>;
export default _default;
