FROM node:12.16.1-alpine3.10

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . .
RUN npm ci
EXPOSE 8080
CMD ["npm", "start"]