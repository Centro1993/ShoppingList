### Stage Build ###
FROM node:10-alpine AS builder
RUN apk --update add git
WORKDIR /home/node/app/client

COPY /client/package*.json ./
COPY /client/tsconfig*.json ./
COPY /client/.eslint* ./
COPY /client/nginx.conf ./
COPY /client/src ./src
COPY /client/public ./public
COPY /api-dist ../api-dist

RUN npm install
RUN npm ci
ENV NODE_ENV=production

RUN npm run build

### Stage Serve Prod ###
FROM nginx AS production
COPY --from=builder --chown=nginx:nginx /home/node/app/client/dist /usr/share/nginx/html
COPY --from=builder --chown=nginx:nginx /home/node/app/client/nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
STOPSIGNAL SIGTERM
