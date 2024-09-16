import { ActionCreator, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
/**
 * Class for desktop studio helpers.
 */
declare class StudioForDesktop {
    fillData: (payload: any, dispatch: Dispatch<any>, initialize: ActionCreator<any>, setToken: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setToken'>, setData: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setData'>) => -1 | 0;
    setupCommunicationInterface: (dispatch: Dispatch<any>, initialize: ActionCreator<any>, setToken: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setToken'>, setData: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setData'>) => void;
    populate: (data: {
        [key: string]: any;
    }) => Promise<void>;
    close: () => Promise<void>;
    private getWindowObject;
    private setfillData;
}
/**
 * Class for web studio helpers.
 */
declare class StudioForWeb {
    private actionId;
    private uid;
    private eventListenerForCommunicationInterface;
    private onMessage;
    setupCommunicationInterface: (origin: string, dispatch: Dispatch<any>, initialize: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setToken'>, setToken: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setToken'>, setData: ActionCreatorWithPayload<string, 'studioActionEditorSlice/setData'>) => void;
    populate: (data: {
        [key: string]: any;
    }) => void;
    close: () => void;
}
/**
 * Class for studio helpers.
 */
export default class Studio {
    private static studio;
    private _context;
    desktop: StudioForDesktop;
    web: StudioForWeb;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const studio = Studio.instace;
     * ```
     */
    static get instance(): Studio;
    /**
     * Method to get editor context.
     * @example
     */
    get context(): string;
    /**
     * Method for updating editor context.
     */
    setContext: (context: string) => void;
    /**
     * Method for populating studio action with editor data.
     * @example
     * ```
     * const studio = Studio.instace;
     * ```
     */
    populate: (data: {
        [key: string]: any;
    }) => Promise<void>;
    /**
     * Method for populating studio action with editor data.
     * @example
     * ```
     * const studio = Studio.instace;
     * ```
     */
    close: () => Promise<void>;
}
export {};
