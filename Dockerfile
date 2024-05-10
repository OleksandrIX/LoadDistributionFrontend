FROM node:20.12-alpine as build_stage
WORKDIR /app
ADD package*.json .
RUN npm ci

ADD . .
RUN npm run build

FROM nginx:1.23.3
COPY --from=build_stage /app/build /usr/share/nginx/html
COPY ./ssl /etc/nginx/ssl
COPY prod_nginx.conf /etc/nginx/conf.d/default.conf
