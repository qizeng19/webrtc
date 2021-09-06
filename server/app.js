const Koa = require("koa");
const staticServe = require("koa-static");
const app = new Koa();

app.use(staticServe(__dirname));
app.listen(9527,() => {
  console.log("Server started at 9527###.");
});