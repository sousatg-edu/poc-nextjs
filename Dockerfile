FROM node:alpine AS builder

WORKDIR /usr/src/app

ADD package.json .
RUN yarn install

ADD . .
RUN yarn install
