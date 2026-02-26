/// <reference types="react" />
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
import { DispositionData } from '../../ccf-disposition/ccf-disposition-slice';
/**
 * prop attributes for RenderMoreThanTwoControls
 */
interface RenderMoreThanTwoControlsProps {
    voiceContact: CXoneVoiceContact;
    multipleControls: boolean;
    controlClicked: (arg0: string, arg2: React.MouseEvent) => void;
    activeDisposition: DispositionData | null;
    onlyShowHangup?: boolean;
    elevatedFrom?: string;
}
/**
   * renderMoreThanTwoControls - rendering hangup and resolved icons when we have contact controls more than two
 * @param props - CcfContactControlsProps
 * ```
 * @example-
 * <renderMoreThanTwoControls />
 * ```
 */
export declare const RenderMoreThanTwoControls: (props: RenderMoreThanTwoControlsProps) => JSX.Element;
export {};
