FROM node:21.7.3-alpine3.20

WORKDIR /usr/src/app

COPY ./app/package.json ./package.json
COPY ./app/package-lock.json ./package-lock.json

RUN npm install

COPY ./backend/ .

RUN npx prisma generate

EXPOSE 3000

CMD npm run start
