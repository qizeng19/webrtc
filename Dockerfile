FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 9527
CMD [ "node", "app.js"]