# Tote Logger - Project Overview

## What the Code Does
Tote Logger is a web application designed to help organize and track the contents of storage totes (bins). 

### Key Features:
- **Tote Creation**: Users can create new totes by simply providing a name. Each tote is assigned a unique identifier.
- **QR Code Generation**: The app automatically generates a unique QR code for each tote (using the `api.qrserver.com` API). This QR code encodes the tote's unique ID, which can be printed and attached to the physical tote for easy identification later.
- **Content Logging**: Users can select any created tote to view, add, or remove items from its inventory list.
- **Responsive Split UI**: The interface provides a clear, two-pane view with the list of totes on the left and the detailed contents of the selected tote on the right.

*Note: Currently, the application state is stored locally in the browser's memory. Refreshing the page will reset the data. Future iterations could involve connecting this frontend to a database for persistent storage.*

## Tech Stack
The application is built using a modern, lightweight web stack and is containerized for easy deployment on home servers like Unraid.

### Frontend
- **React (v19)**: The core user interface library.
- **React Hooks**: Uses `useState` for local state management (handling the list of totes and their contents).
- **CSS3**: Custom styling for layout and responsive design without heavy CSS frameworks.
- **Create React App**: Used as the initial build toolchain.

### Containerization & Deployment
- **Docker**: The application is containerized using a multi-stage Docker build.
  - **Stage 1 (Node.js)**: Uses `node:18-alpine` to install dependencies and compile the production build of the React app.
  - **Stage 2 (Nginx)**: Uses `nginx:alpine` as a lightweight, high-performance web server to host the static files generated in Stage 1.
- **Unraid**: Provides a custom `unraid-template.xml` template for seamless 1-click installation on an Unraid server's Docker engine. The template pre-configures network bridging, port mappings, and WebUI access.