export interface CcfToastProps {
    open: boolean;
    type: string;
    message: string;
}
/**
 * Used to show Toast messages for the application
 * @param props -?- CcfToastProps
 * @example - `<CcfToast {...props}/>`
 */
export declare function CcfToast(props: CcfToastProps): JSX.Element;
export default CcfToast;
