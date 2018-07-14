const Router = require('koa-router');
const fs = require('fs');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/server/views/index.html');
});

module.exports = router;