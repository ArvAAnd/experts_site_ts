# AskExpert Frontend

The client-side application for the AskExpert platform, a web service designed to connect users with topics-specific experts based on user interests and matching algorithms.

## Tech Stack
* React
* TypeScript
* Zustand (State Management)
* React Hook Form (useForm)
* Ant Design (Antd)
* Axios
* JS-Cookie

## Features Implementation
* State Management: Global application state, authentication tokens, available themes, and filtered user lists are managed via Zustand stores.
* Authentication & Sessions: Implemented automatic login and session persistence using persistent HTTP cookies (`js-cookie`) linked with unique authorization tokens.
* Interactive Forms: Client-side validation, email pattern constraints (`gmailPattern`), and dynamic data registration handled using `react-hook-form`.
* UI Components: Built dynamic structures, search inputs, and responsive dropdown selections using the Ant Design library.
* Custom React Hooks: Abstracted business and structural logic into isolated hooks:
  - `useAuth`: Manages initialization and token lookup.
  - `useThemesShow`: Handles expert/interested theme configuration, dynamic lists mapping, and data resetting.

## Installation & Setup
1. Clone the repository.
2. Install the necessary packages: `npm install`
3. Run the application in development mode: `npm start`
