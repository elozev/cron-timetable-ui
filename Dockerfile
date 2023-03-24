FROM node:16-alpine AS base
WORKDIR /app
COPY package.json yarn.lock /app/

FROM base AS build
RUN yarn --pure-lockfile --prod
COPY . /app/
RUN yarn build

FROM base
COPY --from=build /app/node_modules ./node_modules
COPY . /app/
EXPOSE 3000
CMD ["node", "server.js"]
