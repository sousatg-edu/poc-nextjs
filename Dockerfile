FROM node:latest

#RUN npm install -g next

WORKDIR /usr/src/app


ADD package.json .
RUN yarn install



ADD . .
RUN yarn install

CMD ["yarn", "dev"]