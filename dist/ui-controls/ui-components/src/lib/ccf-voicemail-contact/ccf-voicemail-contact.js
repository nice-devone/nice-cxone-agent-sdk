/**
   * Method to pause the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * pauseVoiceMailContact(voiceMailContact);
   * ```
   */
export const pauseVoiceMailContact = (voiceMailContact) => {
    return new Promise((resolve, reject) => {
        voiceMailContact.pause().then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
   * Method to play the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * resumeVoiceMailContact(voiceMailContact);
   * ```
   */
export const resumeVoiceMailContact = (voiceMailContact) => {
    return new Promise((resolve, reject) => {
        voiceMailContact.play().then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
   * Method to end the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * endVoiceMailContact(voiceMailContact);
   * ```
   */
export const endVoiceMailContact = (voiceMailContact) => {
    return new Promise((resolve, reject) => {
        voiceMailContact.end().then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
/**
   * Method to play the voicemail audio from certain
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @param playTimeStamp - Include date/time in audio playback
   * @param position -  Position of the wav file at a specified second
   * @example
   * ```
   * playVoiceMail({voiceMailContact:voiceMailContact,playTimeStamp:true,position:25});
   * ```
   */
export const playVoiceMailContact = (voiceMailContact, playTimeStamp, position) => {
    return new Promise((resolve, reject) => {
        voiceMailContact.playVoiceMail(playTimeStamp, position).then((resp) => {
            resolve(resp);
        }, (err) => {
            reject(err);
        });
    });
};
//# sourceMappingURL=ccf-voicemail-contact.js.map