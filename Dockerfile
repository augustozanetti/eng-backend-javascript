FROM node:15.2-alpine AS base
WORKDIR /usr/src/

# FROM base as builder multistage

COPY ./package.json .
RUN npm install --production

COPY ./build ./build

CMD ["npm", "start"]