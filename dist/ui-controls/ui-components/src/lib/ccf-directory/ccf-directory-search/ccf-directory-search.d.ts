import React from 'react';
export interface CcfDirectorySearchProps {
    updateSearchQuery: (e: string) => void;
}
/**
 * Component to be used for directory search
 * @param param0 - any
 * @example <CcfDirectorySearch />
 * @returns
 */
export declare const CcfDirectorySearch: React.MemoExoticComponent<({ updateSearchQuery }: CcfDirectorySearchProps) => JSX.Element>;
