import { SEARCH_TABS_LABEL } from '../ccf-digital-search.slice';
/**
 * Used to handle key Down event
 * @param searchText - input search field value
 * @param activeTab - current active tab
 * @example setSearchTextInLS(searchText)
 */
export declare const setSearchTextInLS: (searchText: string, activeTab: SEARCH_TABS_LABEL) => void;
/**
   * CcfDigitalSearchInput - to display search component
   * @example - `<CcfDigitalSearchInput />`
   */
export declare const CcfDigitalSearchInput: () => JSX.Element;
