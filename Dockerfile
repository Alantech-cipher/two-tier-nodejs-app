# Use Node base image
FROM node:18

# Set working directory 
WORKDIR /app

# Copy package. files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of files
COPY . .

# Expose port 
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
