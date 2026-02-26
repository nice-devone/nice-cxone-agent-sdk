import { SxProps } from '@mui/material/styles';
export declare enum SMARTREACH_MODULES {
    ECC = "CustomerCard",
    DESK = "Desk"
}
export declare type LvRemoteProps = {
    componentProps: {
        [key: string]: any;
    };
    dataTestId: string;
    moduleName: SMARTREACH_MODULES;
    sx?: SxProps;
};
/**
 * LvRemote creates the MF connection with LV App Space, makes sure to pass CXA auth info and instances
 * @example
 * ```
 * <LvRemote />
 * ```
 */
export declare function LvRemote(props: LvRemoteProps): JSX.Element;
export default LvRemote;
