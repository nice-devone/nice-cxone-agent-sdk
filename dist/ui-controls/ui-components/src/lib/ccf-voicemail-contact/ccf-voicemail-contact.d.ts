import { CXoneVoiceMailContact } from '@nice-devone/acd-sdk';
import { CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
/**
   * Method to pause the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * pauseVoiceMailContact(voiceMailContact);
   * ```
   */
export declare const pauseVoiceMailContact: (voiceMailContact: CXoneVoiceMailContact) => Promise<CXoneSdkError | HttpResponse>;
/**
   * Method to play the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * resumeVoiceMailContact(voiceMailContact);
   * ```
   */
export declare const resumeVoiceMailContact: (voiceMailContact: CXoneVoiceMailContact) => Promise<CXoneSdkError | HttpResponse>;
/**
   * Method to end the voicemail audio
   * @param voiceMailContact - CXoneVoiceMailContact data
   * @example
   * ```
   * endVoiceMailContact(voiceMailContact);
   * ```
   */
export declare const endVoiceMailContact: (voiceMailContact: CXoneVoiceMailContact) => Promise<CXoneSdkError | HttpResponse>;
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
export declare const playVoiceMailContact: (voiceMailContact: CXoneVoiceMailContact, playTimeStamp: boolean, position: number) => Promise<CXoneSdkError | HttpResponse>;
