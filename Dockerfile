FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server, binding to all interfaces so it's reachable from host
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "5173"]

