# NICE CXone i18n SDK

*  [NPM package](https://www.npmjs.com/package/@nice-devone/i18n)
*  [Sample Web App](https://github.com/nice-cxone/webapp-acd-cxagent-sdk-consumer)

### Requirements

*  TypeScript **4.7**
*  Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
*  Custom application bundler (webpack, create-react-app, etc.)


This README file provides an overview of the `@nice-devone/i18n` library. It is a typescript library that empowers developers to interact with i18n SDK functionalities and helps the application to turn into desired languages like Chinese, Japanese, Korean, dutch, Russian, protuguese, Spanish, Italian, French, German etc.,

### Installation
```
npm install @nice-devone/i18n
```

### Usage

1. Import necessary modules:
```
import { translations } from '@nice-devone/i18n';

import { CcfTranslationKey } from '@nice-devone/i18n';
```
2. Usage:

Translated key, value pairs should be stored in json files for each language.

Set up i18n configuration and language code setup(japanese-'ja', english- 'en') in locale config file.

With the usage of i18n sdk on change of language it turns the application into desired language.

### Documentation

For detailed documentation and developer related queries, Please visit  [Link to developer documentation](https://developer.niceincontact.com/)

### Compatibility

This SDK is likely compatible with specific CXone ACD versions. Refer to the documentation for supported versions.

### License

Check the license file for specific terms regarding the use of this SDK.

### Support

For any issues or questions, please refer to the (mention support channel/link here).

### Additional Notes

Consider exploring the codebase (src/lib/) for a more comprehensive understanding of the functionalities offered.
