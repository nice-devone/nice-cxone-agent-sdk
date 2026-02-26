export interface CcfAppHamburgerMenuProps {
    isDrawerOpen?: boolean;
    toggleDrawer: (isDrawerOpen: boolean) => void;
    isAppSpaceMenu?: boolean;
    helpUrl?: string;
}
/**
 * Used for Application Navigation
 * @param props - ? - CcfAppHamburgerMenuProps
 * @example `<CcfAppHamburgerMenu />`
 */
export declare const CcfAppHamburgerMenu: (props: CcfAppHamburgerMenuProps) => JSX.Element;
export default CcfAppHamburgerMenu;
