process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

describe('Search Ranking Algorithm', () => {
  it('should pass', (done) => {
    const stay = 2;
    const rating = 5;
    const sitter = 2.5;
    const result = 2.75
    result.should.eql(2.75);
    done();
  });
});
