FROM node:21.7.3-alpine3.20

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/backend


RUN npm install

EXPOSE 3000

CMD npm run start
