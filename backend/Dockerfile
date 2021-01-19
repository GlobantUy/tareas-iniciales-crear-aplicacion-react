# Use a lighter version of Node as a parent image
FROM node:12.18.4
# Set the working directory to /api
WORKDIR /api
# Install dependencies
ENV NPM_CONFIG_LOGLEVEL warn

RUN apt update -y && apt upgrade -y && apt install python -y -f
RUN npm -g config set user root && npm install -g serverless 
COPY . /api/     
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]