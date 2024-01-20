FROM node:lts

WORKDIR /app

COPY package*.json .

RUN npm install

COPY nx.json nx.json
COPY tsconfig.base.json tsconfig.base.json
COPY libs/shared/ libs/shared/
