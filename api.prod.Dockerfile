### Stage Build
FROM node:12.16.1-alpine3.10 AS builder

WORKDIR /app/api

COPY /api/package*.json ./
COPY /api/tsconfig*.json ./
COPY /api .

RUN npm ci
RUN npm run build

### Stage Serve
FROM node:12.16.1-alpine3.10 AS production

# set correct timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=builder /app/api-dist /app/api-dist

EXPOSE 3000
CMD ["node", "/app/api-dist/dist/main"]