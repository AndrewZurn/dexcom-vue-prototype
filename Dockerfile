FROM node:8-alpine AS builder

# setup working directory
RUN mkdir /app
WORKDIR /app
COPY . .

# build application
RUN npm install 
RUN npm run build

FROM node:8-alpine
ENV NODE_ENV=production

RUN mkdir /app /app/logs
WORKDIR /app
COPY --from=builder /app/package* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/i18n ./i18n
RUN npm install --only=production

EXPOSE 8080
CMD PORT=8080 npm start
