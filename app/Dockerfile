FROM node:21.7.3-alpine3.20 as build

WORKDIR /usr/src/app

COPY ./app/package.json ./package.json
COPY ./app/package-lock.json ./package-lock.json

RUN npm install

COPY ./app/ .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./app/nginx/frontend.conf /etc/nginx/conf.d/frontend.conf
COPY ./static /var/www/static
COPY --from=build  /usr/src/app/dist /var/www

CMD ["nginx", "-g", "daemon off;"]
