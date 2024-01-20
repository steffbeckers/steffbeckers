# build stage
FROM steffbeckers/angular-workspace as build-stage

WORKDIR /app

COPY apps/crm/ apps/crm/
COPY libs/crm/ libs/crm/

RUN yarn nx build crm

# production stage
FROM nginx:stable as production-stage

COPY --from=build-stage /app/dist/apps/crm /app

COPY --from=build-stage /app/apps/crm/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
