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
ARG npm_email
ARG npm_token
RUN test ${npm_email}
RUN test ${npm_token}
RUN npm run build
RUN echo "email = ${npm_email}" > .npmrc
RUN echo "_auth = ${npm_token}" >> .npmrc
CMD npm publish
