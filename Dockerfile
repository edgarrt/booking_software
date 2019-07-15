FROM node:8-slim

WORKDIR /booking
ENV NODE_ENV development

COPY package.json /booking/package.json

RUN npm install

COPY .env /booking/.env
COPY . /booking

CMD ["npm","start"]

EXPOSE 80
