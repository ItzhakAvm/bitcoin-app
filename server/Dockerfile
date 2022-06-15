FROM node:16-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./
RUN mkdir -p dist
RUN chown node:node dist
RUN npm run build
CMD ["npm","run","start:prod"]
