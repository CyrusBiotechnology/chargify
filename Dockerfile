# Base image
FROM node:10.15 as base
WORKDIR /app


# Dependencies
FROM base as dependencies
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
# Install dependencies only when package.json changes
RUN npm install
COPY . .


# Test
FROM dependencies as tester
COPY tsconfig.test.json ./tsconfig.test.json
CMD npm test


# Build
FROM dependencies as builder
RUN npm run build


# Publish
FROM base as publisher
COPY --from=builder /app/lib ./lib
CMD npm publish
