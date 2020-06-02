FROM node:12.16.1-alpine3.10

WORKDIR /workdir/app/client

COPY /client/package*.json ./
COPY /client/tsconfig*.json ./
COPY /client/.eslint* ./
COPY /client/wait-for ./
COPY /client/src ./
COPY /client/public ./
COPY /api-dist ../api-dist

RUN npm ci

EXPOSE 8080
CMD ["npm", "start"]