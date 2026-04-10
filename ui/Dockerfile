FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY ui/package.json ./ui/package.json

RUN npm ci --workspace ui

COPY ui ./ui

WORKDIR /app/ui

RUN npm run build

FROM nginx:1.27-alpine

COPY ui/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/ui/dist /usr/share/nginx/html

EXPOSE 80
