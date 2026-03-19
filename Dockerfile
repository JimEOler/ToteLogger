# Step 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Add metadata for Unraid/Docker
LABEL org.opencontainers.image.title="Tote-Logger"
LABEL org.opencontainers.image.description="A web app that logs the contents of a tote with QR code generation."
LABEL org.opencontainers.image.url="https://github.com/yourgithubusername/unraidtestserver"
LABEL org.opencontainers.image.source="https://github.com/yourgithubusername/unraidtestserver"
LABEL org.opencontainers.image.documentation="https://github.com/yourgithubusername/unraidtestserver/wiki"

# Copy the built React app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]