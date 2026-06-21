# FROM node:20-alpine AS base
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY . .
# EXPOSE 5000
# ENV NODE_ENV=production
# HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -qO- http://localhost:5000/api/health || exit 1
# CMD ["node", "src/server.js"]



FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "src/server.js"]