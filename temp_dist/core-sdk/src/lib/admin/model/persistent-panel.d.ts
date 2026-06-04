/**
 * Interface to declare all the PersistentPanel/CustomWorkspace details
 */
export interface PersistentPanel {
    /**
     * @remarks - Id of PersistentPanel/CustomWorkspace
     */
    persistentPanelId: number;
    /**
     * @remarks - Label text of PersistentPanel/CustomWorkspace
     */
    persistentPanelLabel: string;
    /**
     * @remarks - URI of PersistentPanel/CustomWorkspace
     */
    persistentPanelURI: string;
}
