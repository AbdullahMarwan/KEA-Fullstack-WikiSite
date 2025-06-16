# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app for production
RUN npm run build

# Expose port used by `vite preview`
EXPOSE 4173

# Use Vite's production preview server
CMD ["npm", "run", "preview"]
