import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import faker from 'faker';
import app from '../index';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
let adminToken;
const fake_email = faker.internet.email();

describe('post /v1/api/auth/signup', () => {
  it('should register a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Tolu',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: fake_email,
        password: 'tolulope',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(201);
        expect(res.body).to.have.property('message').eql('User Successfully Created');
        expect(res).to.have.status(201);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/signup', () => {
  it('should return 400 user already', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Tolu',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: 'damilolaesther786@gmail.com',
        password: 'tolulope',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/login', () => {
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'damilolaesther786@gmail.com',
        password: 'damilola',
      })
      .end((err, res) => {
        adminToken = res.body.data[0].token;
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
      .get('/api/v1/offices/54407074-a908-4a0e-831e-0d6c47db6328')
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
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Party Successfully Created');
        expect(res).to.have.status(201);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
        userToken = res.body.data[0].id;
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
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
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
      .get('/api/v1/parties/d43393e0-583f-468e-a661-57de45f6d676')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('patch /v1/api/partyid/name', () => {
  it('should return 200 if the post values is correct', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/d43393e0-583f-468e-a661-57de45f6d676/name')
      .send({
        name: 'People Democratic Party',
      })
      .set('x-access-token', adminToken)
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
      .patch('/api/v1/parties/d43393e0-583f-468e-a661-57de45f6d676/something')
      .send({
        name: 'People Democratic Party',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(404);
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
      .set('x-access-token', adminToken)
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

// party
describe('patch /v1/parties/partyid/name', () => {
  it('should return 400 error if the name field is not specified', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/d43393e0-583f-468e-a661-57de45f6d676/name')
      .send({
        antherd: 'People Democratic Party',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
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
        name: 'House of Assembly',
        type: 'Federal',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Office Successfully Created');
        expect(res).to.have.status(201);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices', () => {
  it('should return 400 error if the type is not equal to the options listed', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        name: '',
        type: 'Feder',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
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
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('error').eql('Enter office type');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch specific office', () => {
  it('should return a specific office information', (done) => {
    chai.request(app)
      .get('/api/v1/offices/54407074-a908-4a0e-831e-0d6c47db6328')
      .set('x-access-token', adminToken)
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

describe('post /v1/offices', () => {
  it('should return 400 if candidate is registered already', (done) => {
    chai.request(app)
      .post('/api/v1/office/840423cf-2229-4c3f-a1ad-d4117f84da07/register')
      .send({
        partyid: 'd43393e0-583f-468e-a661-57de45f6d676',
        officeid: '54407074-a908-4a0e-831e-0d6c47db6328',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices', () => {
  it('should return 404 if party, user or officeid does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/office/b5dbb872-bb1c-49aa-91bc-395c3f88ab50/register')
      .send({
        partyid: 'd43393e0-583f-468e-a661-57d',
        officeid: '54407074-a908-4a0e-831e-0d6c47db6328',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('del /v1/parties', () => {
  it('should return 404 if the id is not correct', (done) => {
    chai.request(app)
      .post('/api/v1/parties/b5dbb872-bb1c-49aa-91bc-395c3f88ab50')
      .send({
        partyid: 'd43393e0-583f-468e-a661-5',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('del /v1/parties', () => {
  it('should return 404 if the token is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/parties/b5dbb872-bb1c-49aa-91bc-395c3f88ab50')
      .send({
	      partyid: 'd43393e0-583f-468e-a661-5',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/signup', () => {
  it('should return 400 if email exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Tolu',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: 'damilolaesther786@gmail.com',
        password: 'damilola',
        confirmPassword: 'damilola',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/signup', () => {
  it('should return 400 if email exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Tolu',
        othername: 'Samuel',
        lastname: 'Ajiye',
        password: 'tolulope',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/login', () => {
  it('should return 401 if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tolu@gmail.cv',
        password: 'tolulope',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/login', () => {
  it('should return 401 if password is not correct', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tolu@gmail.com',
        password: 'tolul',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/login', () => {
  it('should return 401 if form is not okay', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'to',
        password: 'to',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/login', () => {
  it('should return 401 email is not valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'to@',
        password: 'tohjghjgjhgj',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/login', () => {
  it('should return 401 if password is less than 5 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tolu@gmail.com',
        password: 'toh',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/signup', () => {
  it('should return 400 if firstname is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: 'tolu@gmail.com',
        password: 'tolulope',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/auth/signup', () => {
  it('should return 400 if there is white space', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'gfgfgg      ',
        othername: 'Samuel      ',
        lastname: 'Ajiye',
        email: 'tolu@gmail.com',
        password: 'tolulope',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/signup', () => {
  it('should return 400 if password is not up to 5 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'gfgfgg',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: 'tolu@gmail.com',
        password: 'to',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/auth/signup', () => {
  it('should return 400 if passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'gfgfgg',
        othername: 'Samuel',
        lastname: 'Ajiye',
        email: 'tolu@gmail.com',
        password: 'to',
        confirmPassword: 'tolulope',
        phone: '0704344455',
        passporturl: 'https://res.cloudinary.com/dsfgp1nzh/image/upload/v1548371170/parties/adlogo.png',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('get /v1/api/officeid/result', () => {
  it('should return 401 if url is not valid', (done) => {
    chai.request(app)
      .get('/api/v1/office/54407074-a908-4a0e-831e-0d6c47db6328/resu')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('get /v1/api/officeid/result', () => {
  it('should return 401 no result found for the office', (done) => {
    chai.request(app)
      .get('/api/v1/office/840423cf-2229-4c3f-a1ad-d4117f84da07/result')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices/vote', () => {
  it('should return 400 if candidate is registered already', (done) => {
    chai.request(app)
      .post('/api/v1/vote')
      .send({
        candidate: '8ebc2150-0092-46a9-bbb6-6036e0d63d04',
        office: '54407074-a908-4a0e-831e-0d6c47db6328',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/offices/vote', () => {
  it('should return 404 if an error occured', (done) => {
    chai.request(app)
      .post('/api/v1/vote')
      .send({
        partyid: 'd43393e0-583f-468e-a661-57de45f6d676',
        officeid: '54407074-a908-4a0e-831e-0d6c47db6328',
      })
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

