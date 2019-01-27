# Base image
FROM node:10.15 as base
WORKDIR /app
# Install dependencies only when package.json changes
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install
COPY . .


# Test
FROM base as tester
CMD npm test


# Build and publish
FROM base as publisher
RUN npm run build
CMD npm publish
