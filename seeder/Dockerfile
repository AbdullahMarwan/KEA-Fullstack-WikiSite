# Use Node 16 with Alpine (lightweight)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install -g typescript ts-node

# Copy your TypeScript file, env file, and tsconfig
COPY seeder.ts ./
COPY .env* ./
COPY tsconfig.json ./

# Run the seeder with transpile-only to ignore type errors
CMD ["npx", "ts-node", "--transpile-only", "seeder.ts"]
