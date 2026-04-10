FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY api/package.json ./api/package.json

RUN npm ci --workspace api

COPY api ./api

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "api"]
