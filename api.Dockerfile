FROM node:12.16.1-alpine3.10

WORKDIR /app/api

COPY /api/package*.json ./
COPY /api/tsconfig*.json ./
COPY /api .

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]