FROM node:lts-alpine as andreadelligatti-base

WORKDIR /app

COPY lerna.json .
COPY nx.json .
COPY package.json package-lock.json ./

RUN npm install

FROM andreadelligatti-base

WORKDIR /app/packages/microservice-a
COPY ./packages/microservice-a/build ./build
COPY ./packages/microservice-a/package.json ./package.json
COPY ./packages/microservice-a/package-lock.json ./package-lock.json

WORKDIR /app

RUN npm run bootstrap

ENV NODE_ENV=production

CMD ["npm", "start"]