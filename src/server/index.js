const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const healthRoutes = require('./routes/health');
const sitterRoutes = require('./routes/sitters');

const app = new Koa();
const PORT = process.env.PORT || 1337;

// body parser
app.use(bodyParser());

// static
app.use(serve(__dirname + '/views'));

// routes
app.use(indexRoutes.routes());
app.use(healthRoutes.routes());
app.use(sitterRoutes.routes());

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
