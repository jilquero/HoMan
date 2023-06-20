FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18
WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder ./app/dist ./dist
EXPOSE 3000
CMD [ "npm", "start" ]
# COPY prisma /usr/src/app/prisma
# COPY api /usr/src/api
# COPY . .
# EXPOSE 3000
# CMD ["sh", "-c", "npx prisma generate && nodemon src/index.ts"]