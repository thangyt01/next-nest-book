# Build BASE
FROM node:18-alpine as BASE
LABEL author="thangdx"

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:18-alpine AS BUILD
LABEL author="thangdx"

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .

# install node-prune with yarn
RUN yarn global add node-prune
RUN apk add --no-cache git curl bash

RUN yarn build \
    && cd .next/standalone \
    && node-prune

CMD ["yarn", "start"]
