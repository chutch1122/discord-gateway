FROM node:alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD node app.js

ENV DISCORD_GATEWAY_PORT 8080
EXPOSE 8080
