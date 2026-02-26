/// <reference types="react" />
interface CcfSkillDetailsProps {
    isAppSpace?: boolean;
    rowItemClicked?: number;
    setSkillDetailsScreen?: React.Dispatch<React.SetStateAction<boolean>>;
}
/**-
 * component for CcfSkillDetails
 * @returns component for rendering the Skill Details
 * @example <CcfSkillDetails />
 */
export declare function CcfSkillDetails({ setSkillDetailsScreen, isAppSpace, rowItemClicked }: CcfSkillDetailsProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfSkillDetails>;
export default _default;
