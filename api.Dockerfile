FROM node:12.16.1-alpine3.10

# set correct timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app/api

COPY /api/package*.json ./
COPY /api/tsconfig*.json ./
COPY /api .

RUN npm ci

EXPOSE 3000
CMD ["npm", "start"]