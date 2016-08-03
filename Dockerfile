FROM node:latest

RUN npm install -g typescript webpack

RUN mkdir -p /usr/app
COPY . /usr/app

WORKDIR /usr/app/src

RUN npm install
RUN npm link typescript
RUN ./build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
