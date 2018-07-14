const Router = require('koa-router');
const router = new Router();

router.get('/status', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

module.exports = router;

