FROM node:20-slim

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 3000


CMD ["npm", "run", "start"]