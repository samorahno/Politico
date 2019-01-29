import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';

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

describe('GET /parties/:partyid/ for a record not existing', () => {
  it('should return an error that record not found', (done) => {
    chai.request(app)
      .get('/api/v1/parties/34gtf')
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
      .get('/api/v1/parties/2')
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
        name: 'People Democratic Party',
        alias: 'PDP',
        hqAddress: 'Wuse Zone 5, Abuja',
        logoUrl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg',
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
        name: 'People Democratic Party',
        alias: 'PDPHYYHJHGFGH',
        hqAddress: 'Wuse Zone 5, Abuja',
        logoUrl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg',
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
        alias: 'PDP',
        hqAddress: 'Wuse Zone 5, Abuja',
        logoUrl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg',
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
        name: 'All People Dominon Party',
        alias: 'PDP',
        logoUrl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371249/parties/pdplogo.jpg',
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

describe('patch /v1/api/partyid/name', () => {
  it('should return 200 if the post values is correct', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/2/name')
      .send({
        name: 'People Democratic Party',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.have.property('message').eql('Party Edit Successful');
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('patch /v1/api/partyid/name', () => {
  it('should return 404 page not found if the request parameter is not name', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/2/something')
      .send({
        name: 'People Democratic Party',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.have.property('message').eql('Page not found');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('patch /v1/api/partyid/name', () => {
  it('should return 404 page not found if the party id is not valid', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/675/name')
      .send({
        name: 'People Democratic Party',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.have.property('message').eql('The record with the given id was not found');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('patch /v1/parties/partyid/name', () => {
  it('should return 400 error if the name field is not specified', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/2/name')
      .send({
        antherd: 'People Democratic Party',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Enter new name of the party');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/offices', () => {
  it('should return 201 created if the value of the fields are correct', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        name: 'People Democratic Party',
        type: 'Federal',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(201);
        expect(res.body).to.have.property('message').eql('Office Successfully Created');
        expect(res).to.have.status(201);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices', () => {
  it('should return 400 error if the name field is absent', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        name: '',
        type: 'Federal',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Enter office name');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices', () => {
  it('should return 400 error if the type field is absent', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        name: 'Member of House',
        type: '',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Enter office type');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch all offices', () => {
  it('should return the list of all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
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

describe('Fetch specific office', () => {
  it('should return a specific office information', (done) => {
    chai.request(app)
      .get('/api/v1/offices/2')
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

describe('Fetch specific office', () => {
  it('should return a 404 if the office does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/offices/hgjhg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.have.property('error').eql('Office not found');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
