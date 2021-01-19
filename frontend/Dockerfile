FROM node:12.18.4-alpine3.11 

WORKDIR /app

COPY . /app/

RUN npm install && npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
