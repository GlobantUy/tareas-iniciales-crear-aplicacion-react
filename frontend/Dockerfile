FROM node:6-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY src src
COPY .babelrc .env karma.conf.js tests.webpack.js webpack.config.js ./

VOLUME /app/src

CMD ["npm", "run", "start"]