/**
 * model interface for WEM embedded page
 */
export interface WemEmbeddedPage {
    /**
    * @remarks app context
    */
    appContext: string;
    /**
   * @remarks base url for page
   */
    baseUrl: string;
    /**
   * @remarks feature toggle
   */
    featureToggle: string;
    /**
   * @remarks svg icon
   */
    iconSvg: string;
    /**
   * @remarks id of the embedded page
   */
    id: string;
    /**
   * @remarks list of license
   */
    license: Array<string>;
    /**
   * @remarks name of wem embedded page
   */
    name: string;
    /**
   * @remarks permission of embedded page
   */
    permission: string;
    /**
   * @remarks url of embedded pages
   */
    url: string;
    /**
   * @remarks hide on feature enable
   */
    hideOnFeatureEnabled: boolean;
}
