FROM node:10-alpine as build

COPY . /app
WORKDIR  /app

RUN npm install

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
