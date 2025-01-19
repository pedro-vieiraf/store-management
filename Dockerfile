FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["node", "ace", "serve", "--hmr"]