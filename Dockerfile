# Official Playwright image (latest stable recommended)
FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

ENV CI=1

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Browsers already included, but safe fallback
RUN npx playwright install --with-deps

# Default command
CMD ["npx", "playwright", "test"]