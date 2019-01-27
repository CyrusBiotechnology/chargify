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


# Build
FROM base as builder
RUN npm run build


# Publish
FROM builder as publisher
ARG npm_token
RUN test ${npm_token}
RUN echo "//registry.npmjs.org/:_authToken=${npm_token}" > .npmrc
USER node
CMD npm publish --access public
