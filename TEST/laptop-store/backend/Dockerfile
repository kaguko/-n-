FROM node:18

WORKDIR /app

# Copy only package.json
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application code + database folder
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server-fixed.js"]
