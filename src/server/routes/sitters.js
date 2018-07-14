const Router = require('koa-router');
const queries = require('../db/queries/sitters');

const router = new Router();
const BASE_URL = `/api/v1/sitters`;

router.get(BASE_URL, async (ctx) => {
  try {
    const ratingScore = ctx.query.ratingScore;
		const orderBy = ctx.query.orderBy;
    const sitters = await queries.getAllSitters(ratingScore, orderBy);
    ctx.body = {
      status: 'success',
      data: sitters
    };
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
