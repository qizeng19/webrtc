FROM hub.c.163.com/public/nginx:latest
WORKDIR /app
COPY . /app
RUN ls
EXPOSE 9527
CMD [ "node", "app.js"]