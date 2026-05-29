FROM node:22-alpine

RUN apk add --no-cache python3 make g++ \
  && ln -sf python3 /usr/bin/python

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev && npm cache clean --force

COPY src ./src

ENV NODE_ENV=production \
    PORT=3001 \
    DB_PATH=/data/ra.sqlite

EXPOSE 3001
VOLUME ["/data"]

CMD ["node", "src/index.js"]
