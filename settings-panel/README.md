# Settings Panel

A comprehensive, accessible, and responsive settings panel built with React, TypeScript, and Tailwind CSS.

## 📥 Installation & Running

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd settings-panel
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🤖 AI Prompts Used

This application was developed using AI assistance. The following prompts were used:

### Component Creation
1. **Initial Component Request**: "cd into /Users/nkatanaeva/titled_folder/settings-panel and create there a settings panel component with tabs for Profile, Notifications, Privacy, and Appearance. Include form inputs, toggle switches, dropdowns, and save buttons. Use Tailwind CSS with dark mode support. Make it responsive and accessible. Components to build: SettingsPanel.tsx, SettingsTabs.tsx, ToggleSwitch.tsx, Form input component."
   - Created SettingsPanel.tsx with 4 tabs and full state management
   - Built SettingsTabs.tsx with responsive desktop/mobile navigation
   - Implemented ToggleSwitch.tsx with accessibility features
   - Created FormInput.tsx and FormSelect.tsx components
   - Added comprehensive TypeScript types and documentation

2. **Requirements Validation**: "Can you please validate the project against the following list of features to implement and make the necessary adjustments to meet the requirements? 1. Tab navigation 2. Form validation placeholders 3. Dark mode support 4. Responsive layout 5. Save/Cancel actions"
   - Enhanced form validation with real-time error clearing
   - Added comprehensive validation rules (email format, required fields, min lengths)
   - Improved Cancel button to properly reset form state
   - Added meaningful placeholders to all form inputs
   - Created validation documentation and feature checklists

### Project Setup
3. **Browser App Setup**: "cd into /Users/nkatanaeva/titled_folder/settings-panel and make it an app that could be run in a browser. Make all necessary adjustments, including readme install-run section"
   - Created Vite + React + TypeScript project structure
   - Configured Tailwind CSS with dark mode support
   - Set up build tooling (package.json, vite.config.ts, tsconfig.json)
   - Created entry points (index.html, src/main.tsx, src/App.tsx)
   - Added dark mode detection based on system preferences

4. **Documentation**: "Make sure there is install-run information in README.md and include a brief explanation of AI prompts used. Remove all other documentation."
   - Streamlined README to focus on essential information
   - Documented the AI-assisted development process
