FROM node:12.18.4-alpine3.11 

WORKDIR /app

COPY . /app/
#ENV NODE_ENV ${NODE_ENV}
RUN npm install && npx browserslist@latest --update-db && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
