# Use Node 16 with Alpine (lightweight)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install -g ts-node

# Copy your TypeScript file, env file, and tsconfig
COPY . .

# Run the seeder with a delay
CMD ["sh", "-c", "sleep 15 && ts-node seeder.ts"]
