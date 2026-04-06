# Simple node development environment for demonstration purposes
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and lock file to the container for dependency installation
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all application source code into the container
COPY . .

# Expose the standard Vite development port
EXPOSE 5173

# Start the Vite development server with external host binding
# This allows access from the host machine to the container's running app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
