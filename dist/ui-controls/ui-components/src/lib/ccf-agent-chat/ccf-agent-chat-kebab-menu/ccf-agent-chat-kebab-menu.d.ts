/// <reference types="react" />
/**
 * Enum for group kebab action
 */
export declare enum GroupKebabMenu {
    ADD_MEMBER = "addRemoveMember",
    EDIT_GROUP_NAME = "editGroupName",
    LEAVE_GROUP = "leaveGroup",
    MARK_FAVORITE = "markFavorite",
    REMOVE_FAVORITE = "removeFavorite",
    SEARCH_CHAT = "searchChat"
}
/**
 * Enum for favorites kebab action
 */
export declare enum FavoritesKebabMenu {
    REMOVE_FAVORITE = "removeFavorite",
    ADD_MEMBER = "addMember"
}
/**
 * Enum for direct messages kebab action
 */
export declare enum DirectKebabMenu {
    MARK_FAVORITE = "markFavorite",
    ADD_MEMBER = "addMember"
}
declare const _default: import("react").MemoExoticComponent<({ kebab }: {
    kebab: string;
}) => JSX.Element>;
export default _default;
