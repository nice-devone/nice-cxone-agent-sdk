/**
 * Hook that returns the URL for the LV remote entry file
 * @example
 * ```
 * const { isDev, isStaging, lvVersion, remoteName, url } = useGetLvRemoteUrl();
 * ```
 */
export default function useGetLvRemoteUrl(): {
    env: string;
    fileName: string;
    lvVersion: string | undefined;
    remoteName: string;
    tld: string;
    url: string;
};
