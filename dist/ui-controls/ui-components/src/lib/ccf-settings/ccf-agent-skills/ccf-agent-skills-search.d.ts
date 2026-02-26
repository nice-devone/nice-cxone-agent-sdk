import React from 'react';
/**
 * Basic structure for accepatable props for CcfAgentSkillsSearch component
 */
export interface CcfAgentSkillsSearchProps {
    setMediaTypeIds: number[];
    filterSelectedMediaType: (id: number) => void;
    mediaTypeFromChip: number;
    setSearchText: (searchText: string) => void;
}
/**
 * @example CcfAgentSkillsSearch()
 * @returns
 */
export declare function CcfAgentSkillsSearch(props: CcfAgentSkillsSearchProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfAgentSkillsSearch>;
export default _default;
