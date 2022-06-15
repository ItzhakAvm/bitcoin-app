FROM node:16-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./
RUN chown node:node ./node_modules
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=0 /app/build /app
