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

describe('Fetch wrong url', () => {
    it('should return 404 because the url is not valid', (done) => {
      chai.request(app)
        .get('/api/v1/thebase')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('message').eql('Page not found. Please visit /api/v1');
          expect(res).to.have.status(404);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Fetch all parties', () => {
    it('should return the list of all parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('status').eql(200);
          expect(res).to.have.status(200);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /party/:partyid/ for a record not existing', () => {
    it('should return an error that record not found', (done) => {
      chai.request(app)
        .get('/api/v1/party/34gtf')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.have.property('error').eql('The record with the given id was not found');
          expect(res.body).to.not.be.empty;
          done();
        });
    });
  });
  
  describe('GET /party/:partyid/ for an existing record', () => {
    it('it should return the a page that has the record information', (done) => {
      chai.request(app)
        .get('/api/v1/party/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').eql(200);
          expect(res.body).to.not.be.empty;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  
  describe('post /v1/api/parties', () => {
    it('should return 201 if all post values are correct', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
              name: "People Democratic Party",
              alias: "PDP",
              hqAddress: "Wuse Zone 5, Abuja",
              logoUrl: "https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('status').eql(201);
          expect(res.body).to.have.property('message').eql('Party Successfully Created');
          expect(res).to.have.status(201);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('post /v1/api/parties', () => {
    it('should return 400 if alias is greater than 5 characters', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
              name: "People Democratic Party",
              alias: "PDPHYYHJHGFGH",
              hqAddress: "Wuse Zone 5, Abuja",
              logoUrl: "https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').eql('enter a valid alias');
          expect(res).to.have.status(400);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });


  describe('post /v1/api/parties', () => {
    it('should return 400 error since the party name is empty', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
              alias: "PDP",
              hqAddress: "Wuse Zone 5, Abuja",
              logoUrl: "https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').eql('enter name of the party');
          expect(res).to.have.status(400);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('post /v1/api/parties', () => {
    it('should return 400 error since the hqAddress is empty', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
              name: "All People Dominon Party",
              alias: "PDP",
              logoUrl: "https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res.body).to.have.property('status').eql(400);
          expect(res.body).to.have.property('error').eql('enter a valid address');
          expect(res).to.have.status(400);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /parties/:partyid/ for a non-existing record', () => {
    it('it should return a 404 status of record not found', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/dj56jj4')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status').eql(404);
          expect(res.body).to.not.be.empty;      
          expect(res.body).to.have.property('message').eql('Party not found');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

