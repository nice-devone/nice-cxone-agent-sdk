import { InferType } from 'yup';
export declare const CXoneUserRolePermissionsSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks - Agent can approve the draft message
     */
    canApproveDraft: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can assign case to some other agent
     */
    canAssign: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can create a draft message
     */
    canCreateDraft: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can reply on the message
     */
    canReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can unassign the case
     */
    canUnassign: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks - Agent can approve the draft message
     */
    canApproveDraft: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can assign case to some other agent
     */
    canAssign: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can create a draft message
     */
    canCreateDraft: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can reply on the message
     */
    canReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Agent can unassign the case
     */
    canUnassign: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
}>>;
export declare type CXoneUserRolePermissions = InferType<typeof CXoneUserRolePermissionsSchema>;
