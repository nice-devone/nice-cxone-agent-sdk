export interface CcfActionEditorSelectedProps {
    selections?: any[];
    title?: string;
    label?: string;
    handleDelete?: (selection: any) => void;
    titleStyles?: any;
}
/**
 * Component displays chips based on selections
 * @param props - CcfActionEditorSelectedProps
 * @returns component
 * @example <CcfActionEditorSelected />
 */
export declare function CcfActionEditorSelected(props: CcfActionEditorSelectedProps): JSX.Element;
export default CcfActionEditorSelected;
