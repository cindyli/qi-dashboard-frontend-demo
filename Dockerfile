FROM node:8-alpine

RUN apk add --no-cache nginx

WORKDIR /app
COPY . /app

RUN apk add --no-cache --virtual build-dependencies make git && \
    yarn global add grunt-cli --no-progress && \
    yarn install --no-progress --ignore-scripts --production=false && \
    grunt installFrontEnd && \
    grunt dist && \
    apk del build-dependencies

RUN echo $'server {\n\
        listen                  80;\n\
        root                    /app/dist;\n\
        index                   index.html index.htm;\n\
        server_name             localhost;\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]
