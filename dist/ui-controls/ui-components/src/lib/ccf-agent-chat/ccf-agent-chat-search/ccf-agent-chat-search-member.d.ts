/// <reference types="react" />
import { CcfAgentChatSearchOptions } from '../common/interfaces';
/**
 * Component for ccf agents search member
 * @example - <CcfAgentChatSearchMember />
 * @returns
 */
export declare const CcfAgentChatSearchMember: ({ member, contentSearch, userId }: {
    member: CcfAgentChatSearchOptions;
    contentSearch?: boolean | undefined;
    userId?: string | undefined;
}) => JSX.Element;
declare const _default: import("react").MemoExoticComponent<({ member, contentSearch, userId }: {
    member: CcfAgentChatSearchOptions;
    contentSearch?: boolean | undefined;
    userId?: string | undefined;
}) => JSX.Element>;
export default _default;
