FROM node:latest as build
WORKDIR /app/frontend
COPY . .
RUN npm i && npm run build

FROM nginx:1.23.3
COPY --from=build /app/frontend/build /usr/share/nginx/html
COPY default_nginx.conf /etc/nginx/conf.d/default.conf