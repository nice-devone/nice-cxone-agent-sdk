import { useSelector } from 'react-redux';
import { selectLvVersion } from '../../lv-app-space.slice';
/**
 * Hook that returns the URL for the LV remote entry file
 * @example
 * ```
 * const { isDev, isStaging, lvVersion, remoteName, url } = useGetLvRemoteUrl();
 * ```
 */
export default function useGetLvRemoteUrl() {
    const hostname = window.location.hostname;
    const IS_LOCALHOST = /localhost/gi.test(hostname);
    const IS_DEV = /tst2|dev/gi.test(hostname) || IS_LOCALHOST;
    const IS_TESTING = /tst3|test/gi.test(hostname);
    const IS_STAGE = /stg4|staging|stage/gi.test(hostname);
    const POINT_TO_LOCALHOST = false;
    const FILE_NAME = 'remoteEntry.js';
    const REMOTE_NAME = 'designer';
    const lvVersion = useSelector(selectLvVersion);
    let remoteUrl, env, tld, cdn, lvVersionPath;
    if (IS_LOCALHOST || IS_DEV) {
        env = 'tst2';
        tld = 'net';
        cdn = 'cdn-dev';
        lvVersionPath = lvVersion;
    }
    else if (IS_TESTING) {
        env = 'tst3';
        tld = 'com';
        cdn = 'cdn-dev';
        lvVersionPath = (lvVersion === null || lvVersion === void 0 ? void 0 : lvVersion.split('.').length) === 2 ? `${lvVersion}-test` : lvVersion;
    }
    else if (IS_STAGE) {
        env = 'stg4';
        tld = 'com';
        cdn = 'cdn';
        lvVersionPath = (lvVersion === null || lvVersion === void 0 ? void 0 : lvVersion.split('.').length) === 2 ? `${lvVersion}-stage` : lvVersion;
    }
    else {
        env = 'na4';
        tld = 'com';
        cdn = 'cdn';
        lvVersionPath = lvVersion;
    }
    // this should only be enabled if you have installed in your local machine LV Designer
    if (POINT_TO_LOCALHOST && IS_LOCALHOST) {
        remoteUrl = `http://localhost:3000/${FILE_NAME}`;
    }
    else {
        const lvCdnUrl = `https://${cdn}.livevox.com`;
        const designerPath = `/${REMOTE_NAME}/${lvVersionPath}`;
        remoteUrl = `${lvCdnUrl}${designerPath}/${FILE_NAME}`;
    }
    return {
        env: env,
        fileName: FILE_NAME,
        lvVersion,
        remoteName: REMOTE_NAME,
        tld: tld,
        url: remoteUrl,
    };
}
//# sourceMappingURL=useGetLvRemoteUrl.js.map