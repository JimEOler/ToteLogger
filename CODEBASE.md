# Tote Logger - Codebase Documentation

## Project Overview

**Tote Logger** is a React-based web application for logging and managing the contents of storage totes (containers) with integrated QR code generation. Users can create totes, add/remove items, and generate QR codes for physical tracking. The app is packaged as a Docker container designed for deployment on Unraid NAS systems.

**Status:** Beta (v0.1.0)

---

## Tech Stack

| Technology     | Version  | Purpose                          |
| -------------- | -------- | -------------------------------- |
| React          | 19.2.4   | UI framework and state management |
| React DOM      | 19.2.4   | DOM rendering                    |
| React Scripts  | 5.0.1    | Build tooling (Webpack, Babel)   |
| Nginx          | Alpine   | Production web server (Docker)   |
| Node.js        | 18-alpine| Build environment (Docker)       |
| Docker         | -        | Containerization                 |
| QR Server API  | External | QR code generation (qrserver.com)|

---

## Project Structure

```
tote-logger/
├── public/                    # Static assets
│   ├── favicon.ico            # Browser tab icon
│   ├── index.html             # HTML entry point
│   ├── logo192.png            # App icon (192x192)
│   ├── logo512.png            # App icon (512x512)
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # Search engine crawl rules
├── src/                       # React source code
│   ├── App.js                 # Main application component
│   ├── App.css                # App-level styles
│   ├── App.test.js            # Unit tests
│   ├── index.js               # React DOM entry point
│   ├── index.css              # Global styles
│   ├── reportWebVitals.js     # Performance monitoring
│   ├── setupTests.js          # Jest test configuration
│   └── logo.svg               # Default CRA logo (unused)
├── Dockerfile                 # Multi-stage Docker build
├── unraid-template.xml        # Unraid Docker template
├── package.json               # Dependencies and scripts
├── .gitignore                 # Git ignore rules
└── .dockerignore              # Docker build ignore rules
```

---

## File Descriptions

### Source Code (`src/`)

#### `src/App.js`
The main and only React component containing all application logic. Manages the full UI and state using React hooks (`useState`).

**State variables:**
- `totes` - Array of tote objects, each with `id`, `name`, and `contents`
- `newToteName` - Input value for creating a new tote
- `selectedToteId` - ID of the currently selected tote
- `newItemName` - Input value for adding items to a tote

**Core functions:**
- `createTote()` - Validates the name input and creates a new tote with a unique timestamp-based ID
- `addItemToTote()` - Adds an item string to the selected tote's `contents` array
- `removeItemFromTote(toteId, itemIndex)` - Removes an item from a tote by its array index

**UI layout:**
- Two-column flexbox layout
- **Left panel:** Lists all totes with small QR codes (80x80px) and a "Create Tote" form
- **Right panel:** Shows details of the selected tote with a larger QR code (150x150px), item list, and "Add Item" form

**QR codes** are generated via the external API at `api.qrserver.com`, passing the tote ID as data.

#### `src/App.css`
Styles for the application including input focus states (blue outline/shadow), button hover effects, and list item hover transitions (vertical shift with shadow).

#### `src/index.js`
Standard React entry point. Imports the `App` component and renders it into the `#root` DOM element using `ReactDOM.createRoot`.

#### `src/index.css`
Global styles: body margin reset and system font stack for cross-platform consistency.

#### `src/App.test.js`
Placeholder test from Create React App. Currently expects a "learn react" link which no longer exists in the app.

#### `src/reportWebVitals.js`
Utility for measuring Core Web Vitals (CLS, FID, FCP, LCP, TTFB). Imported but not actively used.

#### `src/setupTests.js`
Imports `@testing-library/jest-dom` to add custom DOM matchers to Jest.

---

### Public Assets (`public/`)

#### `public/index.html`
The HTML shell for the React app. Contains meta tags for viewport, theme color, and PWA support. React mounts into the `<div id="root">` element. Shows a fallback message if JavaScript is disabled.

#### `public/manifest.json`
PWA manifest defining app name, icons, start URL, display mode (`standalone`), and theme colors. Note: still references the default "Create React App Sample" name rather than "Tote Logger."

#### `public/robots.txt`
Standard file allowing all search engine crawlers.

---

### Docker & Deployment

#### `Dockerfile`
Multi-stage build:
1. **Build stage** (`node:18-alpine`) - Installs npm dependencies and runs `npm run build` to produce optimized static files
2. **Runtime stage** (`nginx:alpine`) - Copies the built files into Nginx's serve directory, exposes port 80, and starts Nginx

Includes OCI labels for container metadata (title, description, documentation URL).

#### `unraid-template.xml`
Unraid Community Applications template defining:
- Container name: `Tote-Logger`
- Docker image: `jimeoler/tote-logger:latest`
- Network: Bridge mode
- Port mapping: Host 8080 -> Container 80
- Category: Tools
- Support link: GitHub issues page

---

### Configuration Files

#### `package.json`
Defines project metadata (name: `unraidtestserver`, version: `0.1.0`), dependencies, npm scripts (`start`, `build`, `test`, `eject`), ESLint config (extends `react-app`), and browserslist targets.

#### `.gitignore`
Standard CRA gitignore: excludes `node_modules`, `/build`, `/coverage`, `.env` files, and OS artifacts.

#### `.dockerignore`
Excludes `node_modules`, `build`, `.git`, `.idea`, the Dockerfile itself, and markdown files from the Docker build context.

---

## Application Flow

1. User opens the app in a browser
2. The `App` component renders with empty state
3. User types a tote name and clicks "Create Tote" to add a new tote
4. Clicking a tote in the left panel selects it, showing its details in the right panel
5. User can add items to the selected tote or remove existing items
6. QR codes are automatically generated for each tote using its unique ID

---

## Current Limitations

- **No data persistence** - All data lives in React state and is lost on page refresh
- **No backend** - Entirely client-side; no database or API server
- **External QR dependency** - Relies on third-party `qrserver.com` API
- **Outdated test** - `App.test.js` references removed CRA default content
- **PWA manifest** - Still uses default CRA app name
- **No mobile optimization** - Uses flexbox but not responsive for small screens
