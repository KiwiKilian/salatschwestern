FROM node:24.17.0-alpine AS base

FROM base AS builder
ARG GLOBAL_NPM_REGISTRY
ARG GLOBAL_NPM_TOKEN

WORKDIR /app/

COPY package*.json ./
RUN wget -qO- https://get.pnpm.io | env ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN pnpm ci

COPY . .
RUN pnpm run build

FROM base as runner

RUN apk update && apk add tzdata
ENV TZ=Europe/Vienna

WORKDIR /app/

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/dist ./dist/

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]
