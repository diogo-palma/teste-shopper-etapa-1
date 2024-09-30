FROM node:20-slim

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 9000


CMD ["npm", "run", "start"]