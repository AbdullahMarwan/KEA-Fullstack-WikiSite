# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install TypeScript globally if you need the tsc command
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]