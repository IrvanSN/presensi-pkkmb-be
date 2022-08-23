FROM node:16.16-alpine

WORKDIR /server

COPY package.json /server
COPY package-lock.json /server

RUN npm i
RUN npm install pm2 -g

COPY . /server

CMD ["node", "./bin/www"]
