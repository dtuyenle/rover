const knex = require('../src/server/db/connection');

const getAllSitters = () => knex('sitters').select('*');
const getScores = sitter => knex.select('*').from('owners_sitters').leftJoin('sitters', 'owners_sitters.sitter', 'sitters.email').where({ sitter: sitter.email });

const getSitterScore = name => {
  const total = name.length;
  const obj = {};
  name.split('').forEach(char => {
    obj[char] = obj[char] ? obj[char] + 1 : 1;
  });
  return 5 * (Object.keys(obj).length/total);
};

const updateScores = ratings => {
  const email = ratings[0].sitter;
  const name = ratings[0].name;
  let sitter_score = 0;
  let rating_score = 0;
  let overall_score = 0;

  if (ratings && ratings.length > 0) {
    ratings.forEach(item => {
      rating_score = rating_score + item.rating;
    });
    rating_score = rating_score/ratings.length;
    sitter_score = getSitterScore(name);
    overall_score = (rating_score + sitter_score)/2;
  }
  console.log(name, 'sitter_score', sitter_score, 'rating_score', rating_score, 'overall_score', overall_score);

  return knex('sitters')
  .where({ email: email })
  .update({ 
    rating_score: rating_score,
    sitter_score: sitter_score,
    overall_score: overall_score
  });
};

async function update() {
  try {
    const sitters = await getAllSitters();
    const sittersRatings = await Promise.all(sitters.map(async (sitter) => await getScores(sitter)));
    const results = await Promise.all(sittersRatings.map(async (ratings) => await updateScores(ratings)));
    console.log('updated scores for ' + results.length);
  } catch(err) {
    console.log(err);
  }
}

exports.update = update;


