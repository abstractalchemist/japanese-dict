# Builds abstractalchemist/japanese-dict:<tag>

FROM arm32v6/alpine
RUN apk update --no-cache && \
    apk add --no-cache nginx && \
    adduser -D -u '1000' -g 'www' www && \
    mkdir /www /run/nginx && \
    chmod 755 /www && \
    chown www:www /www && \
    ln -sf /dev/stderr /var/log/nginx/error.log && \
    ln -sf /dev/stdout /var/log/nginx/access.log

WORKDIR /www
EXPOSE 80
COPY default.conf /etc/nginx/conf.d
ADD build /www
CMD ["nginx","-g","daemon off;"]