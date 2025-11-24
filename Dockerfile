FROM node:24

WORKDIR /usr/estagio_legal_back

COPY .env .env
COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && npx prisma generate && npm run start:prod
