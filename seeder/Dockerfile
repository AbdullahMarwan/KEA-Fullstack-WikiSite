# Use Node 16
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install -g ts-node typescript && \
    npm install --save-dev @types/bcrypt @types/node

# Copy your TypeScript file, env file, and tsconfig
COPY . .

# Run the seeder with a delay
CMD ["sh", "-c", "sleep 15 && ts-node seeder.ts"]
