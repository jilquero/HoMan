FROM node:18-alpine AS builder

RUN mkdir /app && mkdir /app/data
COPY . /app
RUN cd /app && npm i && \
    npm run build

FROM node:18-alpine

RUN mkdir /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/
RUN cd /app && \
    npm i && \
    npm cache clean --force

WORKDIR /app
EXPOSE 5173 
CMD ["node", "build/index.js"]