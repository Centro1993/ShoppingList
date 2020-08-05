FROM node:12.16.1-alpine3.10 AS builder

WORKDIR /app/api

COPY /api/package*.json ./
COPY /api/tsconfig*.json ./
COPY /api .

RUN npm ci
RUN npm run build

FROM node:12.16.1-alpine3.10 AS production

COPY --from=builder /app/api-dist /app/api-dist

CMD ["node", "/app/api-dist/dist/main"]
EXPOSE 3000
STOPSIGNAL SIGTERM