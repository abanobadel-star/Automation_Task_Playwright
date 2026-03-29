# Use the official Playwright image with Node.js and browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set the working directory
WORKDIR /app

# Set CI environment to enable headless mode
ENV CI=1

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Playwright browsers (if not already included in the image)
RUN npx playwright install

# Run the tests with IPC host flag for better Chromium performance
CMD ["sh", "-c", "npx playwright test"]