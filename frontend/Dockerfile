FROM node:20-alpine

# Set Working Directory
WORKDIR /app

# Install Dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy Application
COPY . .

# Expose the server port
EXPOSE 5173

# Run Server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
