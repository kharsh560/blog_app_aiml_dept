# Use official Node.js image
FROM node:18-bookworm-slim

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci 
# --omit=dev

# Copy the rest of the source code
COPY . .

# Expose the port your backend listens on (example 4800)
EXPOSE 4800

# Set environment variables (if needed)
# ENV NODE_ENV=production

# Start the server
# CMD ["npm", "run", "dev"] 
CMD ["node", "-r", "dotenv/config", "--experimental-json-modules", "src/index.js"]
# No need of nodemon in production!!
