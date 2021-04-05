FROM node:alpine

RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
