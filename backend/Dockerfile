# Use a lighter version of Node as a parent image
FROM node:12.18.4-alpine3.11 AS builder
# Set the working directory to /api
WORKDIR /api
COPY . /api/
# Install dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install && npm run build:webpack:prod && npm run build:pkg:prod
# PROD Image Build
FROM alpine:3.11
RUN apk update && \
  apk add --no-cache libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*
# Set the working directory to /api
WORKDIR /api
# Copy Files from parent build
COPY --from=builder /api/wait-for  ./wait-for
COPY --from=builder /api/bin ./bin
COPY --from=builder /api/config ./config

# Expose port
EXPOSE 3000
# Set ENV_VARS
ENV NODE_ENV="production"
# Permission Exec
RUN mkdir -p /api/logs && chmod -R 777 /api/logs && chmod +x ./wait-for
# Run the app when the container launches
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["./wait-for mongodb:27017 -t 300 -- ./bin/api-backend-alpine" ]