# NICE CXone UI Controls

* [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
* [NPM package](https://www.npmjs.com/package/@nice-devone/ui-controls)

### Requirements

* TypeScript **4.7**
* Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
* React **17.0.2**
* Custom application bundler (webpack, create-react-app, etc.)

This README file provides an overview of the `@nice-devone/ui-controls` library. It is a TypeScript/React library that provides foundational UI control components and utilities used by `@nice-devone/ui-components` and for building agent applications on the NICE CXone platform.

### Features

The library provides foundational UI controls and utilities including:

* **Common UI Controls:** Reusable form controls, buttons, inputs, and interactive elements
* **Layout Components:** Grid systems, containers, and responsive layout utilities
* **Data Display Controls:** Tables, lists, and data visualization components
* **Theme Configuration:** CXone theme configuration and styling utilities
* **Utility Functions:** Helper functions for common UI operations

### Installation

```bash
npm install @nice-devone/ui-controls
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "17.0.2",
  "@mui/material": "5.10.16",
  "@mui/icons-material": "5.16.7",
  "@nice-devone/shared-apps-lib": "26.1.1",
  "@nice-devone/common-sdk": "26.1.1",
  "@nice-devone/i18n": "26.1.1",
  "@reduxjs/toolkit": "1.9.1",
  "react-toastify": "9.1.1",
  "@testrtc/watchrtc-sdk": "1.38.3"
}
```

### Usage

#### 1. Import UI Controls

```tsx
import { /* control components */ } from '@nice-devone/ui-controls';
```

#### 2. Theme Configuration

```tsx
import { createTheme, ThemeProvider } from '@mui/material';
import { CcfStorybookThemeConfig } from '@nice-devone/ui-controls/src/ccf-storybook.theme.config';

const theme = createTheme(CcfStorybookThemeConfig);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components */}
    </ThemeProvider>
  );
};
```

#### 3. Using Control Components

```tsx
import { ExampleControl } from '@nice-devone/ui-controls';

const MyComponent = () => {
  return (
    <ExampleControl
      onChange={(value) => console.log(value)}
      placeholder="Enter value"
    />
  );
};
```

### Component Library

The ui-controls library includes:

* **Form Controls:** Input fields, dropdowns, checkboxes, radio buttons
* **Action Controls:** Buttons, toggle switches, action menus
* **Navigation Controls:** Tabs, breadcrumbs, navigation menus
* **Feedback Controls:** Progress indicators, loading spinners, notifications
* **Data Controls:** Data grids, pagination, filtering components
* **Layout Utilities:** Spacing, alignment, responsive helpers

### Styling and Theming

All components follow Material-UI theming standards and can be customized using:

* Theme configuration objects
* Custom CSS-in-JS styling
* Material-UI sx prop
* Emotion styled components

### Documentation

For detailed documentation and developer-related queries, please visit:
* [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)

### Compatibility

This library is compatible with:
* NICE CXone SDKs version 26.1.1
* React 17.0.2
* Material-UI 5.x
* TypeScript 4.7+

### License

Check the LICENSE.txt file for specific terms regarding the use of this library.

### Additional Notes

* All controls are built with Material-UI (MUI) components
* Components follow NICE CXone design system guidelines
* Full TypeScript support with comprehensive type definitions
* Optimized for performance and bundle size
* Compatible with modern build tools (Webpack, Vite, etc.)
* Supports tree-shaking for minimal bundle size

### Relationship with ui-components

The `@nice-devone/ui-controls` library provides foundational controls and utilities that are used internally by the `@nice-devone/ui-components` library. While ui-controls focuses on basic building blocks, ui-components provides higher-level, feature-rich components like Voice Preference, Contact History, Outbound Options, and Voice Transcription.

### Support

For issues, feature requests, or questions:
* Refer to the official NICE CXone documentation
* Contact NICE support team
* Check the CHANGELOG.md for recent updates and changes
