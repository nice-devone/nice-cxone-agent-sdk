# NICE CXone UI Components

* [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)
* [NPM package](https://www.npmjs.com/package/@nice-devone/ui-components)

### Requirements

* TypeScript **4.7**
* Runtime: **ES2022** (`WebSocket`, `Intl`, `Promise`, `EventTarget`, `CustomEvent`, `JSON`, `Date`, etc.)
* React **17.0.2**
* Custom application bundler (webpack, create-react-app, etc.)

This README file provides an overview of the `@nice-devone/ui-components` library. It is a TypeScript/React library that provides reusable UI components for building agent applications on the NICE CXone platform.

### Features

The library exposes the following key UI components:

* **Voice Preference (ACD Session):** UI component for managing agent voice preferences including softphone, station, and other voice connection options.
* **Contact History:** UI component for displaying and managing agent contact history with filtering and search capabilities.
* **Outbound Options (Agent Multi-Skill Hover Dropdown):** UI component for selecting skills and channels for outbound interactions including voice, SMS, email, and WhatsApp options.
* **Voice Transcription:** Real-time voice transcription UI component with support for multiple vendors (Azure, Google) showing live call transcriptions.

### Installation

```bash
npm install @nice-devone/ui-components
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "17.0.2",
  "@nice-devone/agent-sdk": "26.1.1",
  "@nice-devone/core-sdk": "26.1.1",
  "@nice-devone/common-sdk": "26.1.1",
  "@nice-devone/shared-apps-lib": "26.1.1",
  "@reduxjs/toolkit": "1.9.1",
  "broadcast-channel": "7.1.0",
  "rxjs": "7.8.1",
  "uuid": "8.3.2"
}
```

### Usage

#### 1. Voice Preference Component

```tsx
import { CcfVoicePreference } from '@nice-devone/ui-components/src/lib/ccf-acd-session/ccf-voice-preference';

const MyApp = () => {
  return (
    <CcfVoicePreference
      selectedVoiceOption="softphone"
      onVoiceOptionChange={(option) => console.log(option)}
      rememberVoiceSetting={false}
      showSpinner={false}
    />
  );
};
```

#### 2. Contact History Component

```tsx
import { CcfAgentContactHistory } from '@nice-devone/ui-components/src/lib/ccf-agent-contact-history/ccf-agent-contact-history';

const MyApp = () => {
  return (
    <CcfAgentContactHistory
      agentId="12345"
      onContactSelect={(contact) => console.log(contact)}
    />
  );
};
```

#### 3. Outbound Options Component

```tsx
import { AgentMultiSkillHoverDropDownView } from '@nice-devone/ui-components/src/lib/ccf-outbound-options/ccf-outbound-options';

const MyApp = () => {
  const skills = [
    { skillId: 1, skillName: 'Customer Support' },
    { skillId: 2, skillName: 'Technical Support' }
  ];

  const channels = [
    // Your CXoneDigitalChannel objects
  ];

  const handleTrigger = (event, triggerValue, triggerType, channelID, digitalSkillId, contact) => {
    console.log('Trigger action:', { triggerType, channelID, digitalSkillId });
  };

  const handleCancel = (e, state) => {
    console.log('Cancelled:', state);
  };

  return (
    <AgentMultiSkillHoverDropDownView
      data={skills}
      OBChannels={channels}
      triggerType="voice"
      handleTrigger={handleTrigger}
      customerName="John Doe"
      IBcall={false}
      cancelHandler={handleCancel}
      DigitalOBSkills={[]}
    />
  );
};
```

#### 4. Voice Transcription Component

```tsx
import { CcfVoiceTranscriptionView } from '@nice-devone/ui-components/src/lib/ccf-voice-transcription/ccf-voice-transcription-view';

const MyApp = () => {
  const voiceContact = {
    contactID: 'contact-123',
    ani: 'Agent Name',
    dnis: '0987654321',
    skillName: 'Customer Support',
    callType: 'Inbound'
  };

  const transcriptionData = [
    {
      contactId: 'contact-123',
      messageBody: 'Hello, how can I help you today?',
      participantId: 'participant-789'
    }
  ];

  return (
    <CcfVoiceTranscriptionView
      voiceContact={voiceContact}
      voiceContactTranscription={transcriptionData}
    />
  );
};
```

### Theme Configuration

The library includes CXone theme configuration that can be applied to Material-UI:

```tsx
import { createTheme, ThemeProvider } from '@mui/material';
import { CXoneBreezeThemeOptions } from '@nice-devone/ui-components/src/lib/cxone-agent.theme.config';

const theme = createTheme(CXoneBreezeThemeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components */}
    </ThemeProvider>
  );
};
```

### Documentation

For detailed documentation and developer-related queries, please visit:
* [Official SDK Documentation](https://help.nice-incontact.com/content/agent/agentapplicationadministration/cxoneagent/cxasdk.htm?tocpath=Agent%20Application%20Administration%7CAgent%20Application%20Administration%7CCXone%20Agent%7C_____8)

### Compatibility

This library is compatible with:
* NICE CXone Agent SDK 26.1.1
* React 17.0.2
* Material-UI 5.x

### License

Check the LICENSE.txt file for specific terms regarding the use of this library.

### Additional Notes

* Built on top of @nice-devone/ui-controls foundational library
* All components are built with Material-UI (MUI) and follow NICE CXone design guidelines
* Components integrate with Redux Toolkit for state management
* The library includes TypeScript definitions for enhanced developer experience
* Components are designed to work seamlessly with other NICE CXone SDKs

### Support

For issues, feature requests, or questions:
* Refer to the official NICE CXone documentation
* Contact NICE support team
* Check the CHANGELOG.md for recent updates and changes
