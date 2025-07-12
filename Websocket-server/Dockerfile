# Use a lightweight Node base image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm install -g typescript

# Build the app (optional, depends on your build step)
RUN npm run build

# Start the server
CMD ["node", "dist/index.js"]