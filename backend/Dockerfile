# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package files first for layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the backend source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose the port your app listens on (update if different)
EXPOSE 8000

# Start the app
CMD ["node", "app.js"]
