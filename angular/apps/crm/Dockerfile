# build stage
FROM node:lts as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY nx.json nx.json
COPY tsconfig.base.json tsconfig.base.json
COPY libs/shared/ libs/shared/
COPY apps/crm/ apps/crm/
COPY libs/crm/ libs/crm/

RUN yarn nx build crm

# production stage
FROM nginx:stable as production-stage

COPY --from=build-stage /app/dist/apps/crm /app

COPY --from=build-stage /app/apps/crm/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
