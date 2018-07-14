const knex = require('../connection');

function getAllSitters(ratingScore, orderBy) {
  return knex('sitters')
  .select(['id', 'name', 'rating_score', 'images'])
  .where('rating_score', '<', ratingScore ? parseFloat(ratingScore) : 999999)
  .orderBy('overall_score', orderBy ? orderBy : 'ASC');
}

module.exports = {
  getAllSitters
};
