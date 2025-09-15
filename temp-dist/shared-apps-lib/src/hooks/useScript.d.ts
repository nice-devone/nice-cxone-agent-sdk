export interface UseScriptProps {
    /**
     * Specify source URL of the script which we need to load dynamically.
     */
    scriptSrc: string;
    /**
     * Defines type of the script which we need to load dynamically.
     * @example 'module' or 'text/javascript'
     */
    scriptType?: string;
    /**
     * Contains additional attributes which we need to add in the script tag.
     */
    attributes?: {
        name: string;
        value: string;
    }[];
}
/**
 * Hook to load custom script dynamically
 * @param props - of type UseScriptProps()
 * @returns - whether script is loaded successfully or failed
 * @example - useScript(props);
 */
export declare const useScript: (props: UseScriptProps) => {
    ready: boolean;
    failed: boolean;
};
