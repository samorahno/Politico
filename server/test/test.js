import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index.js';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;

describe('GET \'', () => {
    it('It should return  welcome message', (done) => {
        chai.request(app)
            .get('/api/v1')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.headers;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Welcome to Politico');
                done();
            });
    });
});