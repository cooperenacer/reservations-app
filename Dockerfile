FROM node:current-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine AS run-stage

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]