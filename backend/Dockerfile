FROM node:16.16.0 As builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16.16.0 as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env.production ./dist/.env

EXPOSE 4040

CMD ["node", "dist/index"]