export interface LoginInfo {
    agentId: string;
    rememberSetting: boolean;
    selectedVoicePref: string;
    voiceInputVal: string;
}
export interface LoginInfoAgentScreenSize {
    agentId: string;
    width: string;
    height: string;
}
/**
 * Component used for ccf voice preference
 * @param props - ccfAcdSessionProps
 * @example <ccfAcdSession />
 * @returns
 */
interface CcfAcdSessionProps {
    authError?: boolean;
    cxoneApp?: string;
    isLocationFTEnabled?: boolean | string;
}
/**
 * Acd session component
 * @param isLocationFTEnabled - boolean value to check if location feature toggle is enabled
 * @param authError - boolean value to check if there is any authentication error
 * @returns  CcfAcdSession component
 * @example
 * ```
 * <CcfAcdSession isLocationFTEnabled={true} authError={true} />
 * ```
 */
export declare function CcfAcdSession({ isLocationFTEnabled, authError, cxoneApp }: CcfAcdSessionProps): JSX.Element;
export default CcfAcdSession;
