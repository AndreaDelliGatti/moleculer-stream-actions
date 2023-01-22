FROM node:lts-alpine as andreadelligatti-base

WORKDIR /app

COPY lerna.json .
COPY nx.json .
COPY package.json package-lock.json ./

RUN npm install

FROM andreadelligatti-base

WORKDIR /app/packages/api
COPY ./packages/api/build ./build
COPY ./packages/api/package.json ./package.json
COPY ./packages/api/package-lock.json ./package-lock.json

WORKDIR /app

RUN npm run bootstrap

ENV NODE_ENV=production

CMD ["npm", "start"]