declare type CcfEnhancedWEWarningPopOverPropType = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    title: string;
    button1Title: string;
    button2Title: string;
};
/**
 * Component displays warning pop over
 * @returns agent advance workflow execution warning pop over
 * @example <CcfADWEWarningPopOver />
 */
declare const CcfEnhancedWEWarningPopOver: ({ open, onClose, onConfirm, message, title, button1Title, button2Title }: CcfEnhancedWEWarningPopOverPropType) => JSX.Element;
export default CcfEnhancedWEWarningPopOver;
