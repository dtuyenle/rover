process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/index');
const knex = require('../../src/server/db/connection');
const script = require('../../scripts/updateScore');

describe('routes : sitters', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); })
    .then(() => { return script.update(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/sitters', () => {
    it('should return all sitters', (done) => {
      chai.request(server)
      .get('/api/v1/sitters')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": [sitter objects]}
        res.body.data.length.should.above(0);
        // the first object in the data array should
        // have the right keys
        console.log(res.body.data);
        res.body.data[0].should.include.keys(
          'id', 'images', 'name', 'rating_score'
        );
        done();
      });
    });
  });

});
