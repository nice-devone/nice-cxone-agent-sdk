import { useSelector } from 'react-redux';
import { userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
/**
 * Default hook implementation using Redux
 * @returns Object containing user information
 * @example
 * ```
 * const { userInfo } = useDefaultVoiceTranscriptionMessageTile();
 * ```
 */
export const useDefaultVoiceTranscriptionMessageTile = () => {
    const userInfo = useSelector(userInfoSelector);
    return {
        userInfo,
    };
};
//# sourceMappingURL=ccf-voice-transcription-message-tile-hook.js.map